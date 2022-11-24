import {TFile} from "obsidian";
import {RpgErrorInterface} from "../../core/errors/interfaces/RpgErrorInterface";
import {DatabaseErrorModal} from "./modals/DatabaseErrorModal";
import {IndexInterface} from "../../services/indexService/interfaces/IndexInterface";
import {ModelInterface} from "../modelsManager/interfaces/ModelInterface";
import {DatabaseInterface} from "./interfaces/DatabaseInterface";
import {ComponentStage} from "../../core/enums/ComponentStage";
import {ComponentDuplicatedError} from "../../core/errors/ComponentDuplicatedError";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {IndexService} from "../../services/indexService/IndexService";
import {LoggerService} from "../../services/loggerService/LoggerService";
import {LogMessageType} from "../../services/loggerService/enums/LogMessageType";
import {CodeblockService} from "../../services/codeblockService/CodeblockService";
import {CodeblockDomainInterface} from "../../services/codeblockService/interfaces/CodeblockDomainInterface";
import {RelationshipService} from "../../services/relationshipsService/RelationshipService";
import {RelationshipInterface} from "../../services/relationshipsService/interfaces/RelationshipInterface";

export class DatabaseInitialiser {
	private static _misconfiguredTags: Map<TFile, RpgErrorInterface> = new Map();
	private static _api: RpgManagerApiInterface;

	public static async initialise(
		api: RpgManagerApiInterface,
	): Promise<DatabaseInterface> {
		this._api = api;
		this._misconfiguredTags = await new Map();

		const group = this._api.service(LoggerService).createGroup();

		const response: DatabaseInterface = await this._api.createDatabase();
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
								const duplicate = response.readById(component.index.id);
								error = new ComponentDuplicatedError(this._api, component.index, [duplicate], component);
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
	): Promise<IndexInterface|undefined> {
		const codeblockDomain: CodeblockDomainInterface|undefined = await this._api.service(CodeblockService).read(file, 'RpgManagerID');

		if (codeblockDomain === undefined || codeblockDomain?.codeblock?.id === undefined)
			return undefined;

		const response = this._api.service(IndexService).createFromIndex(codeblockDomain.codeblock);

		return response;
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
		const id: IndexInterface|undefined = await this.readID(file);

		if (id === undefined)
			return undefined;

		const response = await api.models.get(id, id.campaignSettings, file);

		return response;
	}

	private static async _initialiseRelationships(
		database: DatabaseInterface,
	): Promise<void> {

		for (let index=0; index<database.recordset.length; index++){
			const model = database.recordset[index];

			const relationships = model.getRelationships(database).relationships;

			for (let relationshipIndex=0; relationshipIndex<relationships.length; relationshipIndex++){
				const relationship = relationships[relationshipIndex];

				if (relationship.component !== undefined){
					const newRelationship: RelationshipInterface|undefined = this._api.service(RelationshipService).createRelationshipFromReverse(model, relationship);

					if (newRelationship !== undefined)
						relationship.component.getRelationships(database).add(newRelationship, model);
				}
			}
		}

		for (let index=0; index<database.recordset.length; index++){
			database.recordset[index].touch();
		}
	}
}
