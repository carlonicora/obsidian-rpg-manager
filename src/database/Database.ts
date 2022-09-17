import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {App, CachedMetadata, Component, MarkdownView, TFile} from "obsidian";
import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {CampaignSetting} from "../enums/CampaignSetting";
import {DataType} from "../enums/DataType";
import {MisconfiguredDataModal} from "../modals/MisconfiguredDataModal";
import {AbstractOutlineRecord} from "../abstracts/database/AbstractOutlineRecord";
import {RpgError} from "../errors/RpgError";
import {HiddenError} from "../errors/HiddenError";
import {ElementNotFoundError} from "../errors/ElementNotFoundError";
import {ElementDuplicatedError} from "../errors/ElementDuplicatedError";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {NoteInterface} from "../interfaces/data/NoteInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {ErrorLog, InfoLog, LogMessageType, WarningLog} from "../helpers/Logger";

export class Database extends Component implements DatabaseInterface {
	/**
	 * STATIC
	 */
	private static campaignSettings: Map<number, CampaignSetting> = new Map();
	private static misconfiguredTags: Map<RecordInterface, RpgErrorInterface> = new Map();
	private static app: App;
	private static database: Database;

	public static async initialise(
		app: App,
	): Promise<DatabaseInterface> {
		await new InfoLog(LogMessageType.DatabaseInitialisation, 'Initialisation started');

		this.app = app;
		this.misconfiguredTags = await new Map();

		this.database = await new Database(this.app);
		const temporaryDatabase = await new Database(this.app);

		await this.loadCampaignSettings();
		await new InfoLog(LogMessageType.DatabaseInitialisation, 'Campaign settings read');

		const markdownFiles: TFile[] = app.vault.getMarkdownFiles();
		for (let index=0; index<markdownFiles.length; index++){
			const data:RecordInterface|undefined = await this.createComponent(markdownFiles[index]);

			new InfoLog(LogMessageType.DatabaseInitialisation, 'Temporary database initialised', temporaryDatabase);
			if (data !== undefined) {
				try {
					if (data instanceof AbstractOutlineRecord) await data.checkDuplicates(temporaryDatabase);
					await temporaryDatabase.create(data);
				} catch (e) {
					if (e instanceof RpgError) {
						const isHidden: boolean = e instanceof HiddenError;
						if (!isHidden) this.misconfiguredTags.set(data, e as RpgErrorInterface);
					} else {
						throw e;
					}
				}
			}
		}

		new InfoLog(LogMessageType.DatabaseInitialisation, 'Temporary database initialised', temporaryDatabase);

		await this.buildHierarchyAndRelationships(temporaryDatabase);

		if (this.misconfiguredTags.size > 0){
			new MisconfiguredDataModal(this.app, this.misconfiguredTags).open();
		}

		this.database.ready();

		new InfoLog(LogMessageType.Database, 'Database Ready', this.database);

		return this.database;
	}


	/**
	 * NON-STATIC
	 */
	public elements: Array<RecordInterface> = [];
	private basenameIndex: Map<string, string>;

	constructor(
		private app: App,
	) {
		super();
		this.basenameIndex = new Map();
	}

	public async ready(
	): Promise<void> {
		this.registerEvent(this.app.metadataCache.on('resolve', (file: TFile) => this.onSave(file)));
		this.registerEvent(this.app.vault.on('rename', (file: TFile, oldPath: string) => this.onRename(file, oldPath)));
		this.registerEvent(this.app.vault.on('delete', (file: TFile) => this.onDelete(file)));

		new InfoLog(LogMessageType.Database, 'Database ready');

		this.app.workspace.trigger("rpgmanager:index-complete");
		this.app.workspace.trigger("rpgmanager:refresh-views");
	}

	public create(
		data: RecordInterface,
	): void {
		let isNew = true;

		for (let elementCount = 0; elementCount < this.elements.length; elementCount++) {
			if (this.elements[elementCount].path === data.path){
				this.elements[elementCount] = data;
				isNew = false;
			}
		}

		if (isNew) {
			this.elements.push(data);
			this.basenameIndex.set(data.path, data.basename);
		}
	}

	public read(
		query: any|undefined = undefined,
		comparison: any|undefined = undefined,
	): Array<RecordInterface> {
		const response = this.elements.filter((query !== null ? query : true));

		if (comparison !== undefined){
			this.internalSort(response, comparison);
		}

		return response;
	}

	public update(
		data: RecordInterface,
	): void {
		this.create(data);
	}

	public delete(
		data: RecordInterface|string,
	): boolean {
		const key = (typeof data === 'string') ? data : data.path;

		let index: number|undefined = undefined;
		for (let dataCounter=0; dataCounter<this.elements.length; dataCounter++){
			if (this.elements[dataCounter].path === key){
				index = dataCounter;
				break;
			}
		}

		if (index !== undefined) {
			this.elements.splice(index, 1);
			this.basenameIndex.delete(key);
		}

		return index !== undefined;
	}

	private internalSort(
		data: Array<RecordInterface>,
		comparison: any,
	): void {
	}

	public readByPath<T extends RecordInterface>(
		path: string,
	): T|undefined {
		const response:Array<RecordInterface> = this.elements
			.filter((record: RecordInterface) => record.path === path);

		return ((response.length) === 1 ? <T>response[0] : undefined);
	}

	public readSingleParametrised<T extends RecordInterface>(
		dataType: DataType,
		campaignId: number,
		adventureId: number|undefined=undefined,
		sessionId: number|undefined=undefined,
		sceneId: number|undefined=undefined,
	): T {
		const result = this.read(
			this.generateQuery(dataType, false, undefined, undefined, campaignId, adventureId, sessionId, sceneId),
		);

		if (result.length === 0) throw new ElementNotFoundError(this.app, dataType, undefined, campaignId, adventureId, sessionId, sceneId);
		if (result.length > 1) throw new ElementDuplicatedError(this.app, dataType, undefined, campaignId, adventureId, sessionId, sceneId);

		return <T>result[0];
	}


	public readSingle<T extends RecordInterface>(
		dataType: DataType,
		tag: string,
		overloadId: number|undefined = undefined,
	): T {
		const result = this.read(
			this.generateQuery(dataType, false, tag, overloadId),
		);

		if (result.length === 0) throw new ElementNotFoundError(this.app, dataType, tag);
		if (result.length > 1) throw new ElementDuplicatedError(this.app, dataType, tag);

		return <T>result[0];
	}

	public readListParametrised<T extends RecordInterface>(
		dataType: DataType,
		campaignId: number|undefined=undefined,
		adventureId: number|undefined=undefined,
		sessionId: number|undefined=undefined,
		sceneId: number|undefined=undefined,
		comparison: any|undefined = undefined,
	): Array<T> {
		return <Array<T>>this.read(
			this.generateQuery(dataType, true, undefined, undefined, campaignId, adventureId, sessionId, sceneId),
			comparison,
		);
	}

	public readList<T extends RecordInterface>(
		dataType: DataType,
		comparison: any|undefined = undefined,
		tag: string,
		overloadId: number|undefined = undefined,
	): Array<T> {
		return <Array<T>>this.read(
			this.generateQuery(dataType, true, tag, overloadId),
			comparison,
		);
	}

	/**
	 * EVENTS
	 */
	private async onDelete(
		file: TFile,
	): Promise<void> {
		if (this.delete(file.path)){
			this.refreshRelationships();
			this.app.workspace.trigger("rpgmanager:refresh-views");
		}
	}

	private async onRename(
		file: TFile,
		oldPath: string,
	): Promise<void> {
		const oldBaseName: string|undefined = this.basenameIndex.get(oldPath);
		const newBaseName = file.path;

		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
		const data: RecordInterface|undefined = this.readByPath(file.path);

		await this.basenameIndex.delete(oldPath);
		if (data !== undefined) await this.basenameIndex.set(file.path, file.basename);

		if (oldBaseName !== undefined && data !== undefined && metadata != null) {
			await this.replaceFileContent(file, oldBaseName, newBaseName);
			await data.reload();

			await this.replaceLinkInRelationships(oldBaseName, file.basename);
			await this.refreshRelationships();

			if (this.app.workspace.getActiveFile()?.path === file.path){
				this.app.workspace.getActiveViewOfType(MarkdownView)?.editor.refresh();
			}

			this.app.workspace.trigger("rpgmanager:refresh-views");
		}
	}

	private async onSave(
		file: TFile,
	): Promise<void> {
		let component:RecordInterface|undefined = this.readByPath(file.path);

		let isNewComponent = component === undefined;

		if (component !== undefined) {
			await component.reload();
		} else {
			component = await Database.createComponent(file);
		}

		if (component === undefined) return;

		try {
			if (isNewComponent && component instanceof AbstractOutlineRecord) {
				await component.checkDuplicates(this);
				await component.loadHierarchy(this);
			}
			await this.create(component);
		} catch (e) {
			if (e instanceof RpgError) {
				const isHidden: boolean = e instanceof HiddenError;
				if (!isHidden) new MisconfiguredDataModal(this.app, undefined, e).open();
			} else {
				throw e;
			}
			return;
		}

		await this.refreshRelationships();
		this.app.workspace.trigger("rpgmanager:refresh-views");
	}

	/**
	 * PRIVATE NON-STATIC METHODS
	 */

	private async replaceLinkInRelationships(
		oldBaseName: string,
		newBaseName: string,
	): Promise<void> {
		for(let index=0; index<this.elements.length; index++){
			if (this.elements[index].relationships.has(oldBaseName)){
				await this.replaceFileContent(this.elements[index].file, oldBaseName, newBaseName);
				await this.elements[index].reload();
			}
		}
	}

	private async replaceFileContent(
		file: TFile,
		oldBaseName: string,
		newBaseName: string,
	): Promise<void> {
		const content = await this.app.vault.read(file);
		const newFileContent = content
			.replaceAll('[[' +  oldBaseName + ']]', '[[' + newBaseName + ']]')
			.replaceAll('[[' + oldBaseName + '|', '[[' + newBaseName + '|')

		if (content !== newFileContent) {
			return this.app.vault.modify(file, newFileContent)
				.then(() => {
					return;
				});
		}
	}

	private async refreshRelationships(
	): Promise<void> {
		for (let index=0; index<this.elements.length; index++){
			await this.elements[index].loadRelationships(this);
		}
		for (let index=0; index<this.elements.length; index++){
			if (!this.elements[index].isOutline) await this.elements[index].loadReverseRelationships(this);
		}
	}

	private generateQuery(
		dataType: DataType,
		isList: boolean,
		tag: string|undefined,
		overloadId: number|undefined,
		campaignId: number|undefined=undefined,
		adventureId: number|undefined=undefined,
		sessionId: number|undefined=undefined,
		sceneId: number|undefined=undefined,
	): any {
		if (tag !== undefined) {
			campaignId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Campaign, tag);
			adventureId = this.app.plugins.getPlugin('rpg-manager').tagManager.getOptionalId(DataType.Adventure, tag);
			sessionId = this.app.plugins.getPlugin('rpg-manager').tagManager.getOptionalId(DataType.Session, tag);
			sceneId = this.app.plugins.getPlugin('rpg-manager').tagManager.getOptionalId(DataType.Scene, tag);
		}

		switch(dataType) {
			case DataType.Campaign:
				if (overloadId !== undefined) campaignId = overloadId;
				return (data: CampaignInterface) =>
					(dataType & data.type) === data.type &&
					(isList ? true : data.campaignId === campaignId);
				break;
			case DataType.Adventure:
				if (overloadId !== undefined) adventureId = overloadId;
				return (data: AdventureInterface) =>
					(dataType & data.type) === data.type &&
					data.campaign.campaignId === campaignId &&
					(isList ? true : data.adventureId === adventureId);
				break;
			case DataType.Session:
			case DataType.Note:
				if (overloadId !== undefined) sessionId = overloadId;
				return (data: SessionInterface|NoteInterface) =>
					(dataType & data.type) === data.type &&
					data.campaign.campaignId === campaignId &&
					(adventureId !== undefined ? data.adventure.adventureId === adventureId : true) &&
					(isList ? true : data.sessionId === sessionId);
				break;
			case DataType.Scene:
				if (overloadId !== undefined) sceneId = overloadId;
				return (data: SceneInterface) =>
					(dataType & data.type) === data.type &&
					data.campaign.campaignId === campaignId &&
					(adventureId !== undefined ? data.adventure.adventureId === adventureId : true) &&
					data.session.sessionId === sessionId &&
					(isList ? true : data.sceneId === sceneId);
				break;
			default:
				if (overloadId !== undefined) campaignId = overloadId;
				return (data: RecordInterface) =>
					(dataType & data.type) === data.type &&
					data.campaign.campaignId === campaignId
				break;
		}
	}

	/**
	 * STATIC METHODS
	 */

	/**
	 * Preloads all the campaign settings used in the database
	 *
	 * @private
	 */
	private static loadCampaignSettings(
	): void {
		this.app.vault.getMarkdownFiles().forEach((file: TFile) => {
			const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
			if (metadata !== null) {
				const dataTags = this.app.plugins.getPlugin('rpg-manager').tagManager.sanitiseTags(metadata?.frontmatter?.tags);
				if (this.app.plugins.getPlugin('rpg-manager').tagManager.getDataType(dataTags) === DataType.Campaign){
					const campaignId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Campaign, undefined, dataTags);
					if (campaignId !== undefined){
						const settings = metadata?.frontmatter?.settings !== undefined ?
							CampaignSetting[metadata?.frontmatter?.settings as keyof typeof CampaignSetting] :
							CampaignSetting.Agnostic;
						this.campaignSettings.set(campaignId, settings);
					}
				}
			}
		});
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
		new InfoLog(LogMessageType.DatabaseInitialisation, 'Record TFile metadata read', metadata);
		if (metadata == null) return;

		const dataTags = this.app.plugins.getPlugin('rpg-manager').tagManager.sanitiseTags(metadata?.frontmatter?.tags);
		new InfoLog(LogMessageType.DatabaseInitialisation, 'Record tags initialised', dataTags);
		const dataTag = this.app.plugins.getPlugin('rpg-manager').tagManager.getDataTag(dataTags);
		new InfoLog(LogMessageType.DatabaseInitialisation, 'Record tag initialised', dataTag);
		if (dataTag == undefined) return;

		const dataType = this.app.plugins.getPlugin('rpg-manager').tagManager.getDataType(undefined, dataTag);

		if (dataType === undefined) {
			new WarningLog(LogMessageType.DatabaseInitialisation, 'TFile is not a record');
			return
		}
		new InfoLog(LogMessageType.DatabaseInitialisation, 'Record type initialised', DataType[dataType]);

		const campaignId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Campaign, dataTag);
		if (campaignId === undefined) new ErrorLog(LogMessageType.DatabaseInitialisation, 'Campaign Id not found', dataTag);

		const settings = this.campaignSettings.get(campaignId);
		if (settings === undefined) new ErrorLog(LogMessageType.DatabaseInitialisation, 'Settings Missing!');

		if (campaignId !== undefined && settings !== undefined) {
			response = await this.app.plugins.getPlugin('rpg-manager').factories.data.create(
				settings,
				dataTag,
				dataType,
				file
			);
			await response.initialise();
			new InfoLog(LogMessageType.DatabaseInitialisation, 'Record Created', response);
		}

		return response;
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
		return this.addHierarchy(temporaryDatabase, DataType.Campaign)
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
			(data: RecordInterface) => (dataType !== undefined ? (dataType & data.type) === data.type : data.isOutline === false),
		);

		for (let index=0; index<data.length; index++){
			await data[index].loadHierarchy(this.database);
			try {
				this.database.create(data[index]);
			} catch (e) {
				if (e instanceof RpgError) {
					const isHidden: boolean = e instanceof HiddenError;
					if (!isHidden) this.misconfiguredTags.set(data[index], e as RpgErrorInterface);
				} else {
					throw e;
				}
			}
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


