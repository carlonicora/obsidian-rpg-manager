import {CampaignSetting} from "../enums/CampaignSetting";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";
import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {App, CachedMetadata, TFile} from "obsidian";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {ErrorLog, InfoLog, LogMessageType} from "../helpers/Logger";
import {AbstractComponentOutline} from "../abstracts/AbstractComponentOutline";
import {AbstractRpgManagerError} from "../abstracts/AbstractRpgManagerError";
import {ComponentType} from "../enums/ComponentType";
import {IdInterface} from "../interfaces/components/IdInterface";
import {FactoriesInterface} from "../interfaces/FactoriesInterface";
import {DatabaseErrorModal} from "../modals/DatabaseErrorModal";
import {MultipleTagsError} from "../errors/MultipleTagsError";
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
			let record: ComponentInterface|undefined;
			try {
				new InfoLog(LogMessageType.DatabaseInitialisation, '\x1b[48;2;220;220;220mLog ---START OF ' + markdownFiles[index].basename + ' ---\x1b[0m');

				record = await this.createRecord(markdownFiles[index]);

				if (record !== undefined) {
					new InfoLog(LogMessageType.DatabaseInitialisation, 'tag', record.id.tag);

					if (record instanceof AbstractComponentOutline) await record.checkDuplicates(temporaryDatabase);

					new InfoLog(LogMessageType.DatabaseInitialisation, 'No duplicates in the temporary database', record.id.tag);

					await temporaryDatabase.create(record);

					new InfoLog(LogMessageType.DatabaseInitialisation, 'Record added to the temporary database', record);
				}
			} catch (e) {
				if (e instanceof AbstractRpgManagerError) {
					new ErrorLog(LogMessageType.DatabaseInitialisation, 'Error in generating the record', [
						record ? ComponentType[record.id.type] : 'No type',
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
	): Promise<ComponentInterface|undefined> {
		let response: ComponentInterface|undefined;

		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);

		if (metadata != null) {
			new InfoLog(LogMessageType.RecordInitialisation, '1/5 -> Record TFile metadata read for ' + file.basename, metadata);

			try {
				if (!this.tagHelper.hasRpgManagerTags(this.tagHelper.sanitiseTags(metadata?.frontmatter?.tags))) return undefined;
			} catch (e) {
				new ErrorLog(LogMessageType.TagManagement, 'The note might have a misconfigured frontmatter and it has not been read by RPG Manager', file);
				return undefined;
			}

			const id: IdInterface | undefined = this.factories.id.createFromTags(metadata?.frontmatter?.tags);

			new InfoLog(LogMessageType.RecordInitialisation, '2/5 -> Id for ' + file.basename + ' created', id);

			if (!id.isValid) throw new TagMisconfiguredError(this.app, id);

			let rpgManagerTagCounter = 0;
			const tags = this.tagHelper.sanitiseTags(metadata?.frontmatter?.tags);

			if (tags != null) {
				for (let tagIndex = 0; tagIndex < tags.length; tagIndex++) {
					if (this.tagHelper.isRpgManagerTag(tags[tagIndex])) rpgManagerTagCounter++;
					if (rpgManagerTagCounter > 1) throw new MultipleTagsError(this.app, id);
				}
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
			if (metadata?.frontmatter?.tags != null) {
				let tag: string|undefined;
				try {
					tag = this.tagHelper.getTag(this.tagHelper.sanitiseTags(metadata.frontmatter.tags));
				} catch (e) {
					return;
				}
				if (tag === undefined) return;

				const type = this.tagHelper.getDataType(tag);
				if (type === undefined) return;

				if (type === ComponentType.Campaign){
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
		return await this.addHierarchy(temporaryDatabase, ComponentType.Campaign)
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
	 * Calling `addHierarchy(ComponentType.Campaign)` creates a cascade that adds the hierarchy to all the elements in the database
	 *
	 * @param dataType
	 * @private
	 */
	private static async addHierarchy(
		temporaryDatabase: DatabaseInterface,
		dataType: ComponentType|undefined,
	): Promise<void> {
		new InfoLog(LogMessageType.DatabaseInitialisation, 'Loading hierarchy', (dataType !== undefined ? ComponentType[dataType] : 'Elements'));

		const record: ComponentInterface[] = temporaryDatabase.read(
			(data: ComponentInterface) => (dataType !== undefined ? (dataType & data.id.type) === data.id.type : data.isOutline === false),
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
			case ComponentType.Campaign:
				return await this.addHierarchy(temporaryDatabase, ComponentType.Session);
				break;
			case ComponentType.Session:
				return await this.addHierarchy(temporaryDatabase, ComponentType.Adventure);
				break;
			case ComponentType.Adventure:
				return await this.addHierarchy(temporaryDatabase, ComponentType.Act);
				break;
			case ComponentType.Act:
				return await this.addHierarchy(temporaryDatabase, ComponentType.Scene);
				break;
			case ComponentType.Scene:
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
