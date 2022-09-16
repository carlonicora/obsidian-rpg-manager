import {App, CachedMetadata, Component, TFile} from "obsidian";
import {DataType} from "../enums/DataType";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {NoteInterface} from "../interfaces/data/NoteInterface";
import {DatabaseManager} from "./DatabaseManager";
import {ElementNotFoundError} from "../errors/ElementNotFoundError";
import {ElementDuplicatedError} from "../errors/ElementDuplicatedError";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";

export class DatabaseIO extends Component{
	public isReady = false;
	private database: DatabaseInterface;

	constructor(
		private app: App,
	) {
		super();
	}

	public async initialise(
		database: DatabaseInterface,
	): Promise<void> {
		this.database = database;
		this.isReady = true;

		this.registerEvent(this.app.metadataCache.on('resolve', (file: TFile) => this.refreshDataCache(file)));
		this.registerEvent(this.app.vault.on('rename', (file: TFile, oldPath: string) => this.renameDataCache(file, oldPath)));
		this.registerEvent(this.app.vault.on('delete', (file: TFile) => this.removeDataCache(file)));

		this.app.workspace.trigger("rpgmanager:index-complete");
		this.app.workspace.trigger("rpgmanager:refresh-views");
	}

	public removeDataCache(
		file: TFile,
	): void {
		if (this.database.delete(file.path)){
			this.refreshRelationships();
			this.app.workspace.trigger("rpgmanager:refresh-views");
		}
	}

	public async renameDataCache(
		file: TFile,
		oldPath: string,
	): Promise<void> {
		//@TODO change the files content and save them
		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);

		const data: Array<RecordInterface> = this.database.read((data: RecordInterface) => data.name === oldPath, undefined);

		if (data.length === 1 && metadata != null) {
			data[0].reload(file, metadata);
			this.refreshRelationships();
			this.app.workspace.trigger("rpgmanager:refresh-views");
		}
	}

	public async refreshDataCache(
		file: TFile,
	): Promise<void> {
		const component = await new DatabaseManager(this.app, this.database).updateFile(file);
		if (component !== undefined) this.app.workspace.trigger("rpgmanager:refresh-views");
	}

	private async refreshRelationships(
	): Promise<void> {
		this.database.elements.forEach((data: RecordInterface) => {
			data.loadRelationships(this.database)
		});
	}

	public readByName<T extends RecordInterface>(
		database: DatabaseInterface|undefined,
		name: string,
	): T|undefined {
		const list = ((database !== undefined) ? database : this.database).read(
			(data: RecordInterface) => data.path === name,
			undefined,
		);

		return list.length === 1 ? <T>list[0] : undefined;
	}

	public readSingleParametrised<T extends RecordInterface>(
		database: DatabaseInterface|undefined,
		dataType: DataType,
		campaignId: number,
		adventureId: number|undefined=undefined,
		sessionId: number|undefined=undefined,
		sceneId: number|undefined=undefined,
	): T {
		const result = ((database !== undefined) ? database : this.database).read(
			this.generateQuery(dataType, false, undefined, undefined, campaignId, adventureId, sessionId, sceneId),
			undefined,
		);

		if (result.length === 0) throw new ElementNotFoundError(this.app, dataType, undefined, campaignId, adventureId, sessionId, sceneId);
		if (result.length > 1) throw new ElementDuplicatedError(this.app, dataType, undefined, campaignId, adventureId, sessionId, sceneId);

		return <T>result[0];
	}


	public readSingle<T extends RecordInterface>(
		database: DatabaseInterface|undefined,
		dataType: DataType,
		tag: string,
		overloadId: number|undefined = undefined,
	): T {
		const result = ((database !== undefined) ? database : this.database).read(
			this.generateQuery(dataType, false, tag, overloadId),
			undefined,
		);

		if (result.length === 0) throw new ElementNotFoundError(this.app, dataType, tag);
		if (result.length > 1) throw new ElementDuplicatedError(this.app, dataType, tag);

		return <T>result[0];
	}

	public readListParametrised<T extends RecordInterface>(
		database: DatabaseInterface|undefined,
		dataType: DataType,
		campaignId: number|undefined=undefined,
		adventureId: number|undefined=undefined,
		sessionId: number|undefined=undefined,
		sceneId: number|undefined=undefined,
		comparison: any|undefined = undefined,
	): Array<T> {
		return <Array<T>>((database !== undefined) ? database : this.database).read(
			this.generateQuery(dataType, true, undefined, undefined, campaignId, adventureId, sessionId, sceneId),
			comparison,
		);
	}

	public readList<T extends RecordInterface>(
		database: DatabaseInterface|undefined,
		dataType: DataType,
		comparison: any|undefined = undefined,
		tag: string,
		overloadId: number|undefined = undefined,
	): Array<T> {
		return <Array<T>>((database !== undefined) ? database : this.database).read(
			this.generateQuery(dataType, true, tag, overloadId),
			comparison,
		);
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
}
