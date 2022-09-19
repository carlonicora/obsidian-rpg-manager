import {CampaignSetting} from "../enums/CampaignSetting";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {App, CachedMetadata, TFile} from "obsidian";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {ErrorLog, InfoLog, LogMessageType} from "../helpers/Logger";
import {AbstractOutlineRecord} from "../abstracts/database/AbstractOutlineRecord";
import {AbstractRpgError} from "../abstracts/AbstractRpgError";
import {DatabaseErrorModal} from "../modals/DatabaseErrorModal";
import {DataType} from "../enums/DataType";
import {Id} from "./Id";

export class DatabaseInitialiser {
    private static campaignSettings: Map<number, CampaignSetting> = new Map();
	private static misconfiguredTags: Map<TFile, RpgErrorInterface> = new Map();
	private static app: App;
	private static database: DatabaseInterface;

	public static async initialise(
		app: App,
	): Promise<DatabaseInterface> {
		await new InfoLog(LogMessageType.DatabaseInitialisation, 'Initialisation started');

		this.app = app;
		this.misconfiguredTags = await new Map();

		this.database = await this.app.plugins.getPlugin('rpg-manager').factories.database.create();
		const temporaryDatabase = await this.app.plugins.getPlugin('rpg-manager').factories.database.create();

		await this.loadCampaignSettings();
		await new InfoLog(LogMessageType.DatabaseInitialisation, 'Campaign rpgs read');

		const markdownFiles: TFile[] = app.vault.getMarkdownFiles();
		for (let index=0; index<markdownFiles.length; index++){
			try {
				const data: RecordInterface|undefined = await this.createComponent(markdownFiles[index]);

				if (data !== undefined) {
					if (data instanceof AbstractOutlineRecord) await data.checkDuplicates(temporaryDatabase);
					await temporaryDatabase.create(data);
				}
			} catch (e) {
				if (e instanceof AbstractRpgError) {
					this.misconfiguredTags.set(markdownFiles[index], e as RpgErrorInterface);
				} else {
					throw e;
				}
			}
		}

		new InfoLog(LogMessageType.DatabaseInitialisation, 'Temporary database initialised', temporaryDatabase);

		await this.buildHierarchyAndRelationships(temporaryDatabase);

		if (this.misconfiguredTags.size > 0){
			new DatabaseErrorModal(this.app, this.misconfiguredTags).open();
		}

		this.database.ready();

		new InfoLog(LogMessageType.Database, 'Database Ready', this.database);

		return this.database;
	}

	/**
	 * Creates a Record from an Obsidian TFile
	 *
	 * @param file
	 * @private
	 */
	public static async createComponent(
		file: TFile,
	): Promise<RecordInterface|undefined> {
		let response: RecordInterface|undefined;

		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
		new InfoLog(LogMessageType.DatabaseInitialisation, 'Record TFile metadata read for ' + file.basename, metadata);
		if (metadata == null) return;

		let id: Id|null;
		try {
			id = this.app.plugins.getPlugin('rpg-manager').factories.tags.createId(undefined, metadata?.frontmatter?.tags);
		} catch (e) {
			return undefined;
		}

		const campaignId = id.getTypeValue(DataType.Campaign);
		if (campaignId === undefined) new ErrorLog(LogMessageType.DatabaseInitialisation, 'Campaign Id not found', id);

		const settings = this.campaignSettings.get(campaignId) ?? CampaignSetting.Agnostic;

		if (id.getTypeValue(DataType.Campaign) !== undefined && settings !== undefined) {
			response = await this.app.plugins.getPlugin('rpg-manager').factories.data.create(
				settings,
				file,
				id,
			);
			await response.initialise();
			new InfoLog(LogMessageType.DatabaseInitialisation, 'Record Created', response);
		}

		return response;
	}

	/**
	 * PRIVATE METHODS
	 */

	private static loadCampaignSettings(
	): void {
		this.app.vault.getMarkdownFiles().forEach((file: TFile) => {
			const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
			if (metadata !== null) {
				const dataTags = this.app.plugins.getPlugin('rpg-manager').factories.tags.sanitiseTags(metadata?.frontmatter?.tags);
				if (this.app.plugins.getPlugin('rpg-manager').factories.tags.getDataType(dataTags) === DataType.Campaign){
					try {
						const campaignId = this.app.plugins.getPlugin('rpg-manager').factories.tags.getId(DataType.Campaign, undefined, dataTags);
						if (campaignId !== undefined) {
							const settings = metadata?.frontmatter?.settings !== undefined ?
								CampaignSetting[metadata?.frontmatter?.settings as keyof typeof CampaignSetting] :
								CampaignSetting.Agnostic;
							this.campaignSettings.set(campaignId, settings);
						}
					} catch (e) {
						//No need to trap the errors here
					}
				}
			}
		});
	}

	/**
	 * Builds the entire hierarchy and relationships for all the elements in the temporary database
	 *
	 * @private
	 */
	private static async buildHierarchyAndRelationships(
		temporaryDatabase: DatabaseInterface,
	): Promise<void> {
		new InfoLog(LogMessageType.DatabaseInitialisation, 'Building Hierarchy', temporaryDatabase);
		return await this.addHierarchy(temporaryDatabase, DataType.Campaign)
			.then(() => {
				new InfoLog(LogMessageType.DatabaseInitialisation, 'Hierarchy built', temporaryDatabase);
				return this.buildRelationships(temporaryDatabase)
					.then(() => {
						new InfoLog(LogMessageType.DatabaseInitialisation, 'Relationships connected', temporaryDatabase);
						return;
					});
			});
	}

	/**
	 * Adds the hierarchical structure to the outline Records from the temporary database and adds the valid Records to the final database
	 * Calling `addHierarchy(DataType.Campaign)` creates a cascade that adds the hierarchy to all the elements in the database
	 *
	 * @param dataType
	 * @private
	 */
	private static async addHierarchy(
		temporaryDatabase: DatabaseInterface,
		dataType: DataType|undefined,
	): Promise<void> {
		new InfoLog(LogMessageType.DatabaseInitialisation, 'Loading hierarchy', (dataType !== undefined ? DataType[dataType] : 'Elements'));

		const data: RecordInterface[] = temporaryDatabase.read(
			(data: RecordInterface) => (dataType !== undefined ? (dataType & data.id.type) === data.id.type : data.isOutline === false),
		);

		for (let index=0; index<data.length; index++){
			await data[index].loadHierarchy(this.database)
				.then(
					() => {
						this.database.create(data[index]);
					}, (e: Error) => {
						if (e instanceof AbstractRpgError) {
							this.misconfiguredTags.set(data[index].file, e as RpgErrorInterface);
						} else {
							throw e;
						}

					});
		}

		if (dataType === undefined) return;

		switch (dataType) {
			case DataType.Campaign:
				return await this.addHierarchy(temporaryDatabase, DataType.Adventure);
				break;
			case DataType.Adventure:
				return await this.addHierarchy(temporaryDatabase, DataType.Session);
				break;
			case DataType.Session:
				return await this.addHierarchy(temporaryDatabase, DataType.Scene);
				break;
			case DataType.Scene:
				return await this.addHierarchy(temporaryDatabase, DataType.Note);
				break;
			case DataType.Note:
				return await this.addHierarchy(temporaryDatabase, undefined);
				break;
			default:
				return;
				break;
		}
	}

	/**
	 * Adds the relationships to every Record in the database, including the reverse relationships between non-outline Records
	 *
	 * @private
	 */
	private static async buildRelationships(
		database: DatabaseInterface,
	): Promise<void> {
		for (let index=0; index<database.elements.length; index++){
			await database.elements[index].loadRelationships(database);
		}
		for (let index=0; index<database.elements.length; index++){
			if (!database.elements[index].isOutline) await database.elements[index].loadReverseRelationships(database);
		}
	}
}
