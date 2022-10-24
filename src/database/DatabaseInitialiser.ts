import {App, parseYaml, TFile} from "obsidian";
import {RpgErrorInterface} from "../core/errors/interfaces/RpgErrorInterface";
import {FactoriesInterface} from "../core/interfaces/FactoriesInterface";
import {TagHelper} from "./TagHelper";
import {DatabaseErrorModal} from "../core/modals/DatabaseErrorModal";
import {IdInterface} from "../services/id/interfaces/IdInterface";
import {TagMisconfiguredError} from "../core/errors/TagMisconfiguredError";
import {ComponentModelInterface} from "../api/componentManager/interfaces/ComponentModelInterface";
import {DatabaseInterface} from "./interfaces/DatabaseInterface";
import {RelationshipInterface} from "../services/relationships/interfaces/RelationshipInterface";
import {ComponentStage} from "../core/enums/ComponentStage";
import {ComponentDuplicatedError} from "../core/errors/ComponentDuplicatedError";
import {LogMessageType} from "../services/loggers/enums/LogMessageType";
import {Md5} from "ts-md5";
import {InvalidIdChecksumError} from "../core/errors/InvalidIdChecksumError";

export class DatabaseInitialiser {
	private static _misconfiguredTags: Map<TFile, RpgErrorInterface> = new Map();
	private static _app: App;

	private static _factories: FactoriesInterface;
	private static _tagHelper: TagHelper;

	public static async initialise(
		app: App,
	): Promise<DatabaseInterface> {
		this._app = app;
		this._misconfiguredTags = await new Map();

		this._factories = this._app.plugins.getPlugin('rpg-manager').factories;
		this._tagHelper = this._app.plugins.getPlugin('rpg-manager').tagHelper;

		const group = this._factories.logger.createGroup();

		const response: DatabaseInterface = await this._factories.database.create();
		group.add(this._factories.logger.createInfo(LogMessageType.DatabaseInitialisation, 'Database Initialised'));

		const components: ComponentModelInterface[] = [];
		const markdownFiles: TFile[] = app.vault.getMarkdownFiles();

		let componentCounter = 0;
		for (let index=0; index<markdownFiles.length; index++){
			try {
				await this.createComponent(markdownFiles[index])
					.then((component: ComponentModelInterface | undefined) => {
						if (component === undefined) return undefined;

						if (component.stage == ComponentStage.Plot || component.stage === ComponentStage.Run) {
							let error: Error | undefined = undefined;
							try {
								const duplicate = response.readSingle(component.id.type, component.id);
								error = new ComponentDuplicatedError(this._app, component.id, [duplicate], component);
							} catch (e) {
								//no need to trap anything here
							}

							if (error !== undefined) throw error;
						}

						response.create(component);
						components.push(component);
						componentCounter++;
					});
			} catch (e) {
				this._misconfiguredTags.set(markdownFiles[index], e);
			}
		}

		group.add(this._factories.logger.createInfo(LogMessageType.DatabaseInitialisation, componentCounter + ' Components created'));

		await Promise.all(components);

		const metadata: Promise<void>[] = [];
		await components.forEach((component: ComponentModelInterface) => {
			try {
				metadata.push(component.readMetadata());
			} catch (e) {
				this._misconfiguredTags.set(component.file, e);
			}
		})

		Promise.all(metadata)
			.then(() => {
				group.add(this._factories.logger.createInfo(LogMessageType.DatabaseInitialisation, 'Data read for ' + metadata.length + ' Components'));
				this._initialiseRelationships(response)
					.then(() => {
						group.add(this._factories.logger.createInfo(LogMessageType.DatabaseInitialisation, 'Relationships created'));
						this._validateComponents(response)
							.then(() => {
								group.add(this._factories.logger.createInfo(LogMessageType.DatabaseInitialisation, 'Components Validated'));
								response.ready();
								if (this._misconfiguredTags.size > 0){
									new DatabaseErrorModal(this._app, this._misconfiguredTags).open();
								}

								this._factories.logger.group(group);
							});
					});
			});

		return response;
	}

	private static async _validateComponents(
		database: DatabaseInterface,
	) {
		database.recordset.forEach((component: ComponentModelInterface) => {
			try {
				component.validateHierarchy();
			} catch (e) {
				database.delete(component);
				this._misconfiguredTags.set(component.file, e);
			}
		})
	}

	public static async readID(
		file: TFile
	): Promise<IdInterface|undefined> {
		const metadata = this._app.metadataCache.getFileCache(file);
		if (metadata == undefined) return undefined;
		if (metadata.sections == undefined || metadata.sections.length === 0) return undefined;

		const content: string = await this._app.vault.read(file);
		const contentArray: string[] = content.split('\n');
		for (let sectionIndex=0; sectionIndex<metadata.sections.length; sectionIndex++){
			const section = metadata.sections[sectionIndex];
			if (section.type === 'code' && contentArray[section.position.start.line] === '```RpgManagerID'){
				const rpgManagerIdContent: string[] = contentArray.slice(section.position.start.line + 1, section.position.end.line);
				const rpgManagerID: {id: string, checksum: string} = parseYaml(rpgManagerIdContent.join('\n'));

				const response = this._factories.id.createFromID(rpgManagerID.id);

				if (Md5.hashStr(rpgManagerID.id) !== rpgManagerID.checksum) throw new InvalidIdChecksumError(this._app, response)

				return response;
			}
		}

		return undefined;
	}

	/**
	 * Creates a Component from an Obsidian TFile
	 *
	 * @param file
	 * @private
	 */
	public static async createComponent(
		file: TFile,
	): Promise<ComponentModelInterface|undefined> {
		const id: IdInterface|undefined = await this.readID(file);
		if (id === undefined) return undefined;

		if (!id.isValid) throw new TagMisconfiguredError(this._app, id);

		const response = await window.RpgManagerAPI?.models.create(id, id.campaignSettings, file);

		return response;
	}

	private static async _initialiseRelationships(
		database: DatabaseInterface,
	): Promise<void> {
		const relationshipsInitialisation: Promise<void>[] = [];

		database.recordset.forEach((component: ComponentModelInterface) => {
			relationshipsInitialisation.push(component.initialiseRelationships());
		});

		return Promise.all(relationshipsInitialisation)
			.then(() => {
				for (let index=0; index<database.recordset.length; index++){
					const relationships = database.recordset[index].getRelationships(database).relationships;
					for (let relationshipIndex=0; relationshipIndex<relationships.length; relationshipIndex++){
						if (relationships[relationshipIndex].component !== undefined){
							this._factories.relationship.createFromReverse(database.recordset[index], relationships[relationshipIndex]);
						}
					}
				}

				for (let index=0; index<database.recordset.length; index++){
					database.recordset[index].touch();
				}

				return
			});
	}

	public static async reinitialiseRelationships(
		component: ComponentModelInterface,
		database: DatabaseInterface,
	): Promise<void> {
		return component.initialiseRelationships()
			.then(() => {
				const relationships = component.getRelationships();
				if (component.touch()) {
					relationships.forEach((relationship: RelationshipInterface) => {
						if (relationship.component === undefined) this._factories.relationship.createFromReverse(component, relationship);
					});

					database.recordset.forEach((component: ComponentModelInterface) => {
						component.getRelationships(database);
						component.touch();
					});
				}

				return;
			})
	}
}
