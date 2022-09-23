import {CampaignSetting} from "../enums/CampaignSetting";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {App, CachedMetadata, TFile} from "obsidian";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {ErrorLog, InfoLog, LogMessageType} from "../helpers/Logger";
import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {AbstractRpgManagerError} from "../abstracts/AbstractRpgManagerError";
import {RecordType} from "../enums/RecordType";
import {IdInterface} from "../interfaces/data/IdInterface";
import {FactoriesInterface} from "../interfaces/FactoriesInterface";
import {DatabaseErrorModal} from "../modals/DatabaseErrorModal";
import {MultipleRpgManagerTagsError} from "../errors/MultipleRpgManagerTagsError";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {TagHelper} from "../helpers/TagHelper";

export class DatabaseInitialiser {
    private static campaignSettings: Map<number, CampaignSetting> = new Map();
	private static misconfiguredTags: Map<TFile, RpgErrorInterface> = new Map();
	private static app: App;

	private static database: DatabaseInterface;
	private static factories: FactoriesInterface;
	private static tagHelper: TagHelper;

	public static async initialise(
		app: App,
	): Promise<DatabaseInterface> {
		await new InfoLog(LogMessageType.DatabaseInitialisation, 'Initialisation started');

		this.app = app;
		this.misconfiguredTags = await new Map();

		this.factories = this.app.plugins.getPlugin('rpg-manager').factories;
		this.tagHelper = this.app.plugins.getPlugin('rpg-manager').tagHelper;

		this.database = await this.factories.database.create();
		const temporaryDatabase = await this.factories.database.create();

		await this.loadCampaignSettings();
		await new InfoLog(LogMessageType.DatabaseInitialisation, 'Campaign rpgs read');

		const markdownFiles: TFile[] = app.vault.getMarkdownFiles();
		for (let index=0; index<markdownFiles.length; index++){
			let record: RecordInterface|undefined;
			try {
				new InfoLog(LogMessageType.DatabaseInitialisation, '\x1b[48;2;220;220;220mLog ---START OF ' + markdownFiles[index].basename + ' ---\x1b[0m');

				record = await this.createRecord(markdownFiles[index]);

				if (record !== undefined) {
					new InfoLog(LogMessageType.DatabaseInitialisation, 'tag', record.id.tag);

					if (record instanceof AbstractOutlineRecord) await record.checkDuplicates(temporaryDatabase);

					new InfoLog(LogMessageType.DatabaseInitialisation, 'No duplicates in the temporary database', record.id.tag);

					await temporaryDatabase.create(record);

					new InfoLog(LogMessageType.DatabaseInitialisation, 'Record added to the temporary database', record);
				}
			} catch (e) {
				if (e instanceof AbstractRpgManagerError) {
					new ErrorLog(LogMessageType.DatabaseInitialisation, 'Error in generating the record', [
						record ? RecordType[record.id.type] : 'No type',
						record?.id.campaignId,
						record?.id.adventureId,
						record?.id.actId,
						record?.id.sceneId,
						record,
					]);
					this.misconfiguredTags.set(markdownFiles[index], e as RpgErrorInterface);
				} else {
					throw e;
				}
			}

			new InfoLog(LogMessageType.DatabaseInitialisation, '\x1b[48;2;240;240;240mLog ---END OF ' + markdownFiles[index].basename + ' ---\x1b[0m');
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
	public static async createRecord(
		file: TFile,
	): Promise<RecordInterface|undefined> {
		let response: RecordInterface|undefined;

		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);

		if (metadata != null) {
			new InfoLog(LogMessageType.RecordInitialisation, '1/5 -> Record TFile metadata read for ' + file.basename, metadata);

			if (!this.tagHelper.hasRpgManagerTags(this.tagHelper.sanitiseTags(metadata?.frontmatter?.tags))) return undefined;

			const id: IdInterface | undefined = this.factories.id.createFromTags(metadata?.frontmatter?.tags);

			new InfoLog(LogMessageType.RecordInitialisation, '2/5 -> Id for ' + file.basename + ' created', id);

			if (!id.isValid) throw new TagMisconfiguredError(this.app, id);

			let rpgManagerTagCounter = 0;
			const tags = this.tagHelper.sanitiseTags(metadata?.frontmatter?.tags);
			for (let tagIndex=0; tagIndex<tags.length; tagIndex++){
				if (this.tagHelper.isRpgManagerTag(tags[tagIndex])) rpgManagerTagCounter++;
				if (rpgManagerTagCounter > 1) throw new MultipleRpgManagerTagsError(this.app, id);
			}

			const settings = this.campaignSettings.get(id.campaignId) ?? CampaignSetting.Agnostic;

			new InfoLog(LogMessageType.RecordInitialisation, '3/5 -> Setting for ' + file.basename, CampaignSetting[settings]);

			response = await this.factories.data.create(
				settings,
				file,
				id,
			);

			new InfoLog(LogMessageType.RecordInitialisation, '4/5 -> Record created for ' + file.basename, response);

			await response.initialise();

			new InfoLog(LogMessageType.RecordInitialisation, '5/5 -> Record initialised for ' + file.basename, response);
		} else {
			new InfoLog(LogMessageType.RecordInitialisation, 'TFile ' + file.basename + ' does not have metadata');
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
			if (
				metadata?.frontmatter?.tags != null &&
				this.tagHelper.hasRpgManagerTags(this.tagHelper.sanitiseTags(metadata.frontmatter.tags))
			) {
				const tag = this.tagHelper.getTag(this.tagHelper.sanitiseTags(metadata.frontmatter.tags));
				if (tag === undefined) return;

				const type = this.tagHelper.getDataType(tag);
				if (type === undefined) return;

				if (type === RecordType.Campaign){
					const id = this.factories.id.createFromTag(tag);
					try {
						const settings = metadata?.frontmatter?.settings != undefined ?
							CampaignSetting[metadata.frontmatter.settings as keyof typeof CampaignSetting] :
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

		for (let index=0; index<record.length; index++){
			await record[index].loadHierarchy(this.database)
				.then(
					() => {
						this.database.create(record[index]);
					}, (e: Error) => {
						if (e instanceof AbstractRpgManagerError) {
							this.misconfiguredTags.set(record[index].file, e as RpgErrorInterface);
						} else {
							throw e;
						}

					});
		}

		if (dataType === undefined) return;

		switch (dataType) {
			case RecordType.Campaign:
				return await this.addHierarchy(temporaryDatabase, RecordType.Session);
				break;
			case RecordType.Session:
				return await this.addHierarchy(temporaryDatabase, RecordType.Adventure);
				break;
			case RecordType.Adventure:
				return await this.addHierarchy(temporaryDatabase, RecordType.Act);
				break;
			case RecordType.Act:
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
		for (let index=0; index<database.recordset.length; index++){
			await database.recordset[index].loadRelationships(database);
		}
		for (let index=0; index<database.recordset.length; index++){
			if (!database.recordset[index].isOutline) await database.recordset[index].loadReverseRelationships(database);
		}
	}
}
