import {parseYaml, TFile} from "obsidian";
import {RpgErrorInterface} from "../errors/interfaces/RpgErrorInterface";
import {DatabaseErrorModal} from "./modals/DatabaseErrorModal";
import {IdInterface} from "../services/idService/interfaces/IdInterface";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {ModelInterface} from "../managers/modelsManager/interfaces/ModelInterface";
import {DatabaseInterface} from "./interfaces/DatabaseInterface";
import {RelationshipInterface} from "../services/relationshipsService/interfaces/RelationshipInterface";
import {ComponentStage} from "../core/enums/ComponentStage";
import {ComponentDuplicatedError} from "../errors/ComponentDuplicatedError";
import {Md5} from "ts-md5";
import {InvalidIdChecksumError} from "../errors/InvalidIdChecksumError";
import {RpgManagerApiInterface} from "../api/interfaces/RpgManagerApiInterface";
import {IdService} from "../services/idService/IdService";
import {RelationshipService} from "../services/relationshipsService/RelationshipService";
import {DatabaseFactory} from "./factories/DatabaseFactory";
import {LoggerService} from "../services/loggerService/LoggerService";
import {LogMessageType} from "../services/loggerService/enums/LogMessageType";

export class DatabaseInitialiser {
	private static _misconfiguredTags: Map<TFile, RpgErrorInterface> = new Map();
	private static _api: RpgManagerApiInterface;

	public static async initialise(
		api: RpgManagerApiInterface,
	): Promise<DatabaseInterface> {
		this._api = api;
		this._misconfiguredTags = await new Map();

		const group = this._api.service(LoggerService).createGroup();

		const databaseFactory = new DatabaseFactory(this._api);
		const response: DatabaseInterface = await databaseFactory.create();
		group.add(this._api.service(LoggerService).createInfo(LogMessageType.DatabaseInitialisation, 'Database Initialised'));

		const components: ModelInterface[] = [];
		const markdownFiles: TFile[] = app.vault.getMarkdownFiles();

		let componentCounter = 0;
		for (let index=0; index<markdownFiles.length; index++){
			try {
				await this.createComponent(api, markdownFiles[index])
					.then((component: ModelInterface | undefined) => {
						if (component === undefined) return undefined;

						if (component.stage == ComponentStage.Plot || component.stage === ComponentStage.Run) {
							let error: Error | undefined = undefined;
							try {
								const duplicate = response.readSingle(component.id.type, component.id);
								error = new ComponentDuplicatedError(this._api, component.id, [duplicate], component);
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

		group.add(this._api.service(LoggerService).createInfo(LogMessageType.DatabaseInitialisation, componentCounter + ' Components created'));

		await Promise.all(components);

		const metadata: Promise<void>[] = [];
		await components.forEach((component: ModelInterface) => {
			try {
				metadata.push(component.readMetadata());
			} catch (e) {
				this._misconfiguredTags.set(component.file, e);
			}
		});

		Promise.all(metadata)
			.then(() => {
				group.add(this._api.service(LoggerService).createInfo(LogMessageType.DatabaseInitialisation, 'Data read for ' + metadata.length + ' Components'));
				this._initialiseRelationships(response)
					.then(() => {
						group.add(this._api.service(LoggerService).createInfo(LogMessageType.DatabaseInitialisation, 'Relationships created'));
						this._validateComponents(response)
							.then(() => {
								group.add(this._api.service(LoggerService).createInfo(LogMessageType.DatabaseInitialisation, 'Components Validated'));
								response.ready();
								if (this._misconfiguredTags.size > 0){
									new DatabaseErrorModal(this._api, this._misconfiguredTags).open();
								}

								this._api.service(LoggerService).group(group);
							});
					});
			});

		return response;
	}

	private static async _validateComponents(
		database: DatabaseInterface,
	) {
		database.recordset.forEach((component: ModelInterface) => {
			try {
				component.validateHierarchy();
			} catch (e) {
				database.delete(component);
				this._misconfiguredTags.set(component.file, e);
			}
		});
	}

	public static async readID(
		file: TFile
	): Promise<IdInterface|undefined> {
		const metadata = this._api.app.metadataCache.getFileCache(file);
		if (metadata == undefined) return undefined;
		if (metadata.sections == undefined || metadata.sections.length === 0) return undefined;

		const content: string = await this._api.app.vault.read(file);
		const contentArray: string[] = content.split('\n');
		for (let sectionIndex=0; sectionIndex<metadata.sections.length; sectionIndex++){
			const section = metadata.sections[sectionIndex];
			if (section.type === 'code' && contentArray[section.position.start.line] === '```RpgManagerID'){
				const rpgManagerIdContent: string[] = contentArray.slice(section.position.start.line + 1, section.position.end.line);
				const rpgManagerID: {id: string, checksum: string} = parseYaml(rpgManagerIdContent.join('\n'));

				const response = this._api.service(IdService).createFromID(rpgManagerID.id);

				if (Md5.hashStr(rpgManagerID.id) !== rpgManagerID.checksum)
					throw new InvalidIdChecksumError(this._api, response);

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
		api: RpgManagerApiInterface,
		file: TFile,
	): Promise<ModelInterface|undefined> {
		const id: IdInterface|undefined = await this.readID(file);
		if (id === undefined) return undefined;

		if (!id.isValid)
			throw new TagMisconfiguredError(this._api, id);

		const response = await api.models.get(id, id.campaignSettings, file);

		return response;
	}

	private static async _initialiseRelationships(
		database: DatabaseInterface,
	): Promise<void> {
		const relationshipsInitialisation: Promise<void>[] = [];

		database.recordset.forEach((component: ModelInterface) => {
			relationshipsInitialisation.push(component.initialiseRelationships());
		});

		return Promise.all(relationshipsInitialisation)
			.then(() => {
				for (let index=0; index<database.recordset.length; index++){
					const relationships = database.recordset[index].getRelationships(database).relationships;
					for (let relationshipIndex=0; relationshipIndex<relationships.length; relationshipIndex++){
						if (relationships[relationshipIndex].component !== undefined){
							this._api.service(RelationshipService).createRelationshipFromReverse(database.recordset[index], relationships[relationshipIndex]);
						}
					}
				}

				for (let index=0; index<database.recordset.length; index++){
					database.recordset[index].touch();
				}

				return;
			});
	}

	public static async reinitialiseRelationships(
		component: ModelInterface,
		database: DatabaseInterface,
	): Promise<void> {
		return component.initialiseRelationships()
			.then(() => {
				const relationships = component.getRelationships();
				if (component.touch()) {
					relationships.forEach((relationship: RelationshipInterface) => {
						if (relationship.component === undefined)
							this._api.service(RelationshipService).createRelationshipFromReverse(component, relationship);
					});

					database.recordset.forEach((component: ModelInterface) => {
						component.getRelationships(database);
						component.touch();
					});
				}

				return;
			});
	}
}
