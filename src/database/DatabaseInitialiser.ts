import {CampaignSetting} from "../enums/CampaignSetting";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {App, CachedMetadata, TFile} from "obsidian";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {ErrorLog, InfoLog, LogMessageType} from "../helpers/Logger";
import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {AbstractRpgError} from "../abstracts/AbstractRpgError";
import {DatabaseErrorModal} from "../modals/DatabaseErrorModal";
import {RecordType} from "../enums/RecordType";
import {IdInterface} from "../interfaces/data/IdInterface";
import {FactoriesInterface} from "../interfaces/FactoriesInterface";

export class DatabaseInitialiser {
    private static campaignSettings: Map<number, CampaignSetting> = new Map();
	private static misconfiguredTags: Map<TFile, RpgErrorInterface> = new Map();
	private static app: App;

	private static database: DatabaseInterface;
	private static factories: FactoriesInterface;

	public static async initialise(
		app: App,
	): Promise<DatabaseInterface> {
		this.factories = this.app.plugins.getPlugin('rpg-manager').factories ;
		await new InfoLog(LogMessageType.DatabaseInitialisation, 'Initialisation started');

		this.app = app;
		this.misconfiguredTags = await new Map();

		this.database = await this.factories.database.create();
		const temporaryDatabase = await this.factories.database.create();

		await this.loadCampaignSettings();
		await new InfoLog(LogMessageType.DatabaseInitialisation, 'Campaign rpgs read');

		const markdownFiles: TFile[] = app.vault.getMarkdownFiles();
		for (let index=0; index<markdownFiles.length; index++){
			let record: RecordInterface|undefined;
			try {
				console.log('---');
				record = await this.createRecord(markdownFiles[index]);

				if (record !== undefined) {
					console.log(record?.id.tag)
					if (record instanceof AbstractOutlineRecord) await record.checkDuplicates(temporaryDatabase);
					console.log('duplicates checked');
					await temporaryDatabase.create(record);
					console.log('record added to the temporary database');
				}
			} catch (e) {
				if (e instanceof AbstractRpgError) {
					//@ts-ignore
					console.error(RecordType[record?.id.type], record.id.campaignId, record.id.adventureId, record.id.sessionId, record.id.sceneId, e.showErrorMessage());
					this.misconfiguredTags.set(markdownFiles[index], e as RpgErrorInterface);
				} else {
					throw e;
				}
			}
		}

		new InfoLog(LogMessageType.DatabaseInitialisation, 'Temporary database initialised', temporaryDatabase);

		await this.buildHierarchyAndRelationships(temporaryDatabase);

		if (this.misconfiguredTags.size > 0){
			//new DatabaseErrorModal(this.app, this.misconfiguredTags).open();
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
	public static async createRecord(
		file: TFile,
	): Promise<RecordInterface|undefined> {
		let response: RecordInterface|undefined;

		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
		new InfoLog(LogMessageType.DatabaseInitialisation, 'Record TFile metadata read for ' + file.basename, metadata);

		if (metadata == null) return undefined;

		const id:IdInterface|undefined = this.factories.id.createFromTags(metadata?.frontmatter?.tags);
		if (id === undefined) return undefined;

		const settings = this.campaignSettings.get(id.campaignId) ?? CampaignSetting.Agnostic;

		if (id.getTypeValue(RecordType.Campaign) !== undefined && settings !== undefined) {
			response = await this.factories.data.create(
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
			if (metadata !== null && metadata?.frontmatter?.tags != undefined) {
				const id = this.factories.id.createFromTags(metadata.frontmatter.tags);

				if (id !== undefined && id.type === RecordType.Campaign){
					try {
						const settings = metadata?.frontmatter?.settings != undefined ?
							CampaignSetting[metadata?.frontmatter?.settings as keyof typeof CampaignSetting] :
							CampaignSetting.Agnostic;
						this.campaignSettings.set(id.campaignId, settings);
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
		return await this.addHierarchy(temporaryDatabase, RecordType.Campaign)
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
	 * Calling `addHierarchy(RecordType.Campaign)` creates a cascade that adds the hierarchy to all the elements in the database
	 *
	 * @param dataType
	 * @private
	 */
	private static async addHierarchy(
		temporaryDatabase: DatabaseInterface,
		dataType: RecordType|undefined,
	): Promise<void> {
		new InfoLog(LogMessageType.DatabaseInitialisation, 'Loading hierarchy', (dataType !== undefined ? RecordType[dataType] : 'Elements'));

		const record: RecordInterface[] = temporaryDatabase.read(
			(data: RecordInterface) => (dataType !== undefined ? (dataType & data.id.type) === data.id.type : data.isOutline === false),
		);

		console.log(dataType ? RecordType[dataType] : 'Everything Else', temporaryDatabase.elements, record);

		for (let index=0; index<record.length; index++){
			await record[index].loadHierarchy(this.database)
				.then(
					() => {
						this.database.create(record[index]);
					}, (e: Error) => {
						if (e instanceof AbstractRpgError) {
							this.misconfiguredTags.set(record[index].file, e as RpgErrorInterface);
						} else {
							throw e;
						}

					});
		}

		if (dataType === undefined) return;

		switch (dataType) {
			case RecordType.Campaign:
				return await this.addHierarchy(temporaryDatabase, RecordType.Adventure);
				break;
			case RecordType.Adventure:
				return await this.addHierarchy(temporaryDatabase, RecordType.Note);
				break;
			case RecordType.Note:
				return await this.addHierarchy(temporaryDatabase, RecordType.Session);
				break;
			case RecordType.Session:
				return await this.addHierarchy(temporaryDatabase, RecordType.Scene);
				break;
			case RecordType.Scene:
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
