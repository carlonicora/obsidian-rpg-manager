import {App, parseYaml, TFile} from "obsidian";
import {RpgErrorInterface} from "../errors/interfaces/RpgErrorInterface";
import {FactoriesInterface} from "../factories/interfaces/FactoriesInterface";
import {TagHelper} from "./TagHelper";
import {DatabaseErrorModal} from "../modals/DatabaseErrorModal";
import {IdInterface} from "./interfaces/IdInterface";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {ComponentInterface} from "./interfaces/ComponentInterface";
import {DatabaseInterface} from "./interfaces/DatabaseInterface";
import {RelationshipInterface} from "../relationships/interfaces/RelationshipInterface";
import {ComponentStage} from "./components/enums/ComponentStage";
import {ComponentDuplicatedError} from "../errors/ComponentDuplicatedError";
import {LogMessageType} from "../loggers/enums/LogMessageType";

export class DatabaseInitialiser {
	private static misconfiguredTags: Map<TFile, RpgErrorInterface> = new Map();
	private static app: App;

	private static factories: FactoriesInterface;
	private static tagHelper: TagHelper;

	public static async initialise(
		app: App,
	): Promise<DatabaseInterface> {
		this.app = app;
		this.misconfiguredTags = await new Map();

		this.factories = this.app.plugins.getPlugin('rpg-manager').factories;
		this.tagHelper = this.app.plugins.getPlugin('rpg-manager').tagHelper;

		const group = this.factories.logger.createGroup();

		const response: DatabaseInterface = await this.factories.database.create();
		group.add(this.factories.logger.createInfo(LogMessageType.DatabaseInitialisation, 'Database Initialised'));

		const components: Array<ComponentInterface> = [];
		const markdownFiles: TFile[] = app.vault.getMarkdownFiles();

		let componentCounter = 0;
		for (let index=0; index<markdownFiles.length; index++){
			try {
				await this.createComponent(markdownFiles[index])
					.then((component: ComponentInterface | undefined) => {
						if (component === undefined) return undefined;

						if (component.stage == ComponentStage.Plot || component.stage === ComponentStage.Run) {
							let error: Error | undefined = undefined;
							try {
								const duplicate = response.readSingle(component.id.type, component.id);
								error = new ComponentDuplicatedError(this.app, component.id, [duplicate], component);
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
				this.misconfiguredTags.set(markdownFiles[index], e);
			}
		}

		group.add(this.factories.logger.createInfo(LogMessageType.DatabaseInitialisation, componentCounter + ' Components created'));

		await Promise.all(components);

		const metadata: Array<Promise<void>> = [];
		await components.forEach((component: ComponentInterface) => {
			try {
				metadata.push(component.readMetadata());
			} catch (e) {
				this.misconfiguredTags.set(component.file, e);
			}
		})

		Promise.all(metadata)
			.then(() => {
				group.add(this.factories.logger.createInfo(LogMessageType.DatabaseInitialisation, 'Data read for ' + metadata.length + ' Components'));
				this._initialiseRelationships(response)
					.then(() => {
						group.add(this.factories.logger.createInfo(LogMessageType.DatabaseInitialisation, 'Relationships created'));
						this._validateComponents(response)
							.then(() => {
								group.add(this.factories.logger.createInfo(LogMessageType.DatabaseInitialisation, 'Components Validated'));
								response.ready();
								if (this.misconfiguredTags.size > 0){
									new DatabaseErrorModal(this.app, this.misconfiguredTags).open();
								}

								this.factories.logger.group(group);
							});
					});
			});

		return response;
	}

	private static async _validateComponents(
		database: DatabaseInterface,
	) {
		database.recordset.forEach((component: ComponentInterface) => {
			try {
				component.validateHierarchy();
			} catch (e) {
				database.delete(component);
				this.misconfiguredTags.set(component.file, e);
			}
		})
	}

	public static async readID(
		file: TFile
	): Promise<IdInterface|undefined> {
		const metadata = this.app.metadataCache.getFileCache(file);
		if (metadata == undefined) return undefined;
		if (metadata.sections == undefined || metadata.sections.length === 0) return undefined;

		const content: string = await this.app.vault.read(file);
		const contentArray: Array<string> = content.split('\n');
		for (let sectionIndex=0; sectionIndex<metadata.sections.length; sectionIndex++){
			const section = metadata.sections[sectionIndex];
			if (section.type === 'code' && contentArray[section.position.start.line] === '```RpgManagerID'){
				const RpgManagerIdContent: Array<string> = contentArray.slice(section.position.start.line + 1, section.position.end.line);
				const RpgManagerID: {id: string, checksum: string} = parseYaml(RpgManagerIdContent.join('\n'));
				return this.factories.id.createFromID(RpgManagerID.id);
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
	): Promise<ComponentInterface|undefined> {
		const id: IdInterface|undefined = await this.readID(file);
		if (id === undefined) return undefined;

		if (!id.isValid) throw new TagMisconfiguredError(this.app, id);

		return await this.factories.component.create(
			id.campaignSettings,
			file,
			id,
		);
	}

	private static async _initialiseRelationships(
		database: DatabaseInterface,
	): Promise<void> {
		let relationshipsInitialisation: Array<Promise<void>> = [];

		database.recordset.forEach((component: ComponentInterface) => {
			relationshipsInitialisation.push(component.initialiseRelationships());
		});

		return Promise.all(relationshipsInitialisation)
			.then(() => {
				for (let index=0; index<database.recordset.length; index++){
					const relationships = database.recordset[index].getRelationships(database).relationships;
					for (let relationshipIndex=0; relationshipIndex<relationships.length; relationshipIndex++){
						if (relationships[relationshipIndex].component !== undefined){
							this.factories.relationship.createFromReverse(database.recordset[index], relationships[relationshipIndex]);
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
		component: ComponentInterface,
		database: DatabaseInterface,
	): Promise<void> {
		return component.initialiseRelationships()
			.then(() => {
				const relationships = component.getRelationships();
				if (component.touch()) {
					relationships.forEach((relationship: RelationshipInterface) => {
						if (relationship.component === undefined) this.factories.relationship.createFromReverse(component, relationship);
					})
				}

				return;
			})
	}
}
