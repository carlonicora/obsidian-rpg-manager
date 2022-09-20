import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {App, CachedMetadata, Component, debounce, MarkdownView, TFile} from "obsidian";
import {DataType} from "../enums/DataType";
import {DatabaseErrorModal} from "../modals/DatabaseErrorModal";
import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {AbstractRpgError} from "../abstracts/AbstractRpgError";
import {ElementNotFoundError} from "../errors/ElementNotFoundError";
import {ElementDuplicatedError} from "../errors/ElementDuplicatedError";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {NoteInterface} from "../interfaces/data/NoteInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {InfoLog, LogMessageType} from "../helpers/Logger";
import {DatabaseInitialiser} from "./DatabaseInitialiser";

export class Database extends Component implements DatabaseInterface {
	public elements: Array<RecordInterface> = [];
	private basenameIndex: Map<string, string>;

	constructor(
		private app: App,
	) {
		super();
		this.basenameIndex = new Map();

		this.onSave = debounce(this.onSave, 2000, true) as unknown as () => Promise<void>;
		this.onDelete = debounce(this.onDelete, 2000, true) as unknown as () => Promise<void>;
		this.onRename = debounce(this.onRename, 2000, true) as unknown as () => Promise<void>;
	}

	/**
	 * PUBLIC METHODS
	 */
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

		if (result.length === 0) {
			const dynamicallyGeneratedTag = this.app.plugins.getPlugin('rpg-manager').factories.tags.generateTag(dataType, campaignId, adventureId, sessionId, sceneId);
			const idMap = this.app.plugins.getPlugin('rpg-manager').factories.tags.createId(dynamicallyGeneratedTag);
			throw new ElementNotFoundError(this.app, idMap);
		}
		if (result.length > 1) throw new ElementDuplicatedError(this.app, result[0].id, result);

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

		if (result.length === 0) {
			const idMap = this.app.plugins.getPlugin('rpg-manager').factories.tags.createId(tag);
			throw new ElementNotFoundError(this.app, idMap);
		}
		if (result.length > 1) throw new ElementDuplicatedError(this.app, result[0].id, result);

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

		try {
			const isNewComponent = component === undefined;

			if (component !== undefined) {
				await component.reload();
			} else {
				component = await DatabaseInitialiser.createComponent(file);
			}

			if (component === undefined) return;

			if (isNewComponent && component instanceof AbstractOutlineRecord) {
				await component.checkDuplicates(this);
			}

			await component.loadHierarchy(this);
			await this.create(component);
			await this.refreshRelationships();

			this.app.workspace.trigger("rpgmanager:refresh-views");

		} catch (e) {
			if (e instanceof AbstractRpgError) {
				new DatabaseErrorModal(this.app, undefined, e, file).open();
			} else {
				throw e;
			}
			return;
		}
	}

	/**
	 * PRIVATE METHODS
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
			campaignId = this.app.plugins.getPlugin('rpg-manager').factories.tags.getId(DataType.Campaign, tag);
			adventureId = this.app.plugins.getPlugin('rpg-manager').factories.tags.getOptionalId(DataType.Adventure, tag);
			sessionId = this.app.plugins.getPlugin('rpg-manager').factories.tags.getOptionalId(DataType.Session, tag);
			sceneId = this.app.plugins.getPlugin('rpg-manager').factories.tags.getOptionalId(DataType.Scene, tag);
		}

		switch(dataType) {
			case DataType.Campaign:
				if (overloadId !== undefined) campaignId = overloadId;
				return (data: CampaignInterface) =>
					(dataType & data.id.type) === data.id.type &&
					(isList ? true : data.campaignId === campaignId);
				break;
			case DataType.Adventure:
				if (overloadId !== undefined) adventureId = overloadId;
				return (data: AdventureInterface) =>
					(dataType & data.id.type) === data.id.type &&
					data.campaign.campaignId === campaignId &&
					(isList ? true : data.adventureId === adventureId);
				break;
			case DataType.Session:
				if (overloadId !== undefined) sessionId = overloadId;
				return (data: SessionInterface) =>
					(dataType & data.id.type) === data.id.type &&
					data.campaign.campaignId === campaignId &&
					(adventureId !== undefined ? data.adventure.adventureId === adventureId : true) &&
					(isList ? true : data.sessionId === sessionId);
				break;
			case DataType.Note:
				return (note: NoteInterface) =>
					dataType === note.id.type &&
					note.campaign.campaignId === campaignId &&
					(adventureId !== undefined ? note.adventure.adventureId === adventureId : true) &&
					note.sessionId === sessionId;
				break;
			case DataType.Scene:
				if (overloadId !== undefined) sceneId = overloadId;
				return (data: SceneInterface) =>
					(dataType & data.id.type) === data.id.type &&
					data.campaign.campaignId === campaignId &&
					(adventureId !== undefined ? data.adventure.adventureId === adventureId : true) &&
					data.session.sessionId === sessionId &&
					(isList ? true : data.sceneId === sceneId);
				break;
			default:
				if (overloadId !== undefined) campaignId = overloadId;
				return (data: RecordInterface) =>
					(dataType & data.id.type) === data.id.type &&
					data.campaign.campaignId === campaignId
				break;
		}
	}
}


