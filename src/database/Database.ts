import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";
import {App, CachedMetadata, MarkdownView, TFile} from "obsidian";
import {ComponentType} from "../enums/ComponentType";
import {DatabaseErrorModal} from "../modals/DatabaseErrorModal";
import {AbstractComponentOutline} from "../abstracts/AbstractComponentOutline";
import {AbstractRpgManagerError} from "../abstracts/AbstractRpgManagerError";
import {ComponentNotFoundError} from "../errors/ComponentNotFoundError";
import {ComponentDuplicatedError} from "../errors/ComponentDuplicatedError";
import {CampaignInterface} from "../interfaces/components/CampaignInterface";
import {AdventureInterface} from "../interfaces/components/AdventureInterface";
import {ActInterface} from "../interfaces/components/ActInterface";
import {SceneInterface} from "../interfaces/components/SceneInterface";
import {InfoLog, LogMessageType} from "../helpers/Logger";
import {DatabaseInitialiser} from "./DatabaseInitialiser";
import {AbstractRpgManagerComponent} from "../abstracts/AbstractRpgManagerComponent";
import {IdInterface} from "../interfaces/components/IdInterface";
import {SessionInterface} from "../interfaces/components/SessionInterface";

export class Database extends AbstractRpgManagerComponent implements DatabaseInterface {
	public recordset: Array<ComponentInterface> = [];
	private basenameIndex: Map<string, string>;

	constructor(
		app: App,
	) {
		super(app);
		this.basenameIndex = new Map();

		//this.onSave = debounce(this.onSave, 2000, true) as unknown as () => Promise<void>;
		//this.onDelete = debounce(this.onDelete, 2000, true) as unknown as () => Promise<void>;
		//this.onRename = debounce(this.onRename, 2000, true) as unknown as () => Promise<void>;
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
		data: ComponentInterface,
	): void {
		let isNew = true;

		for (let elementCount = 0; elementCount < this.recordset.length; elementCount++) {
			if (this.recordset[elementCount].path === data.path){
				this.recordset[elementCount] = data;
				isNew = false;
			}
		}

		if (isNew) {
			this.recordset.push(data);
			this.basenameIndex.set(data.path, data.basename);
		}
	}

	public read<T>(
		query: any,
	): Array<T> {
		return (<unknown>this.recordset.filter((query !== null ? query : true))) as Array<T>;
	}

	public update(
		data: ComponentInterface,
	): void {
		this.create(data);
	}

	public delete(
		data: ComponentInterface|string,
	): boolean {
		const key = (typeof data === 'string') ? data : data.path;

		let index: number|undefined = undefined;
		for (let dataCounter=0; dataCounter<this.recordset.length; dataCounter++){
			if (this.recordset[dataCounter].path === key){
				index = dataCounter;
				break;
			}
		}

		if (index !== undefined) {
			this.recordset.splice(index, 1);
			this.basenameIndex.delete(key);
		}

		return index !== undefined;
	}

	public readByPath<T extends ComponentInterface>(
		path: string,
	): T|undefined {
		const response:Array<ComponentInterface> = this.recordset
			.filter((record: ComponentInterface) => record.path === path);

		return ((response.length) === 1 ? <T>response[0] : undefined);
	}

	public readSingle<T extends ComponentInterface>(
		type: ComponentType,
		id: IdInterface,
		overloadId: number|undefined=undefined,
	): T {
		const result = this.read(this.generateQuery(type, id, false, overloadId));

		if (result.length === 0) {
			throw new ComponentNotFoundError(this.app, id);
		}
		if (result.length > 1) throw new ComponentDuplicatedError(this.app, (<T>result[0]).id, <Array<T>>result);

		return <T>result[0];
	}

	public readList<T extends ComponentInterface>(
		type: ComponentType,
		id: IdInterface|undefined,
		overloadId: number|undefined = undefined,
	): Array<T> {
		return <Array<T>>this.read(
			this.generateQuery(type, id, true, overloadId),
		);
	}

	private generateQuery(
		type: ComponentType,
		id: IdInterface|undefined,
		isList: boolean,
		overloadId: number|undefined=undefined,
	): any {
		let campaignId:number|undefined=id?.campaignId;
		let adventureId:number|undefined=id?.adventureId;
		let actId:number|undefined=id?.actId;
		let sceneId:number|undefined=id?.sceneId;
		let sessionId:number|undefined=id?.sessionId;

		switch(type) {
			case ComponentType.Campaign:
				if (overloadId !== undefined) campaignId = overloadId;
				return (data: CampaignInterface) =>
					(type & data.id.type) === data.id.type &&
					(isList ? true : data.id.campaignId === campaignId);
				break;
			case ComponentType.Adventure:
				if (overloadId !== undefined) adventureId = overloadId;
				return (data: AdventureInterface) =>
					(type & data.id.type) === data.id.type &&
					data.id.campaignId === campaignId &&
					(isList ? true : data.id.adventureId === adventureId);
				break;
			case ComponentType.Session:
				if (overloadId !== undefined) sessionId = overloadId;
				return (data: SessionInterface) =>
					(type & data.id.type) === data.id.type &&
					data.id.campaignId === campaignId &&
					(isList ? true : data.id.sessionId === sessionId);
				break;
			case ComponentType.Act:
				if (overloadId !== undefined) actId = overloadId;
				return (data: ActInterface) =>
					(type & data.id.type) === data.id.type &&
					data.id.campaignId === campaignId &&
					(adventureId !== undefined ? data.id.adventureId === adventureId : true) &&
					(isList ? true : data.id.actId === actId);
				break;
			case ComponentType.Scene:
				if (overloadId !== undefined) sceneId = overloadId;
				return (data: SceneInterface) =>
					(type & data.id.type) === data.id.type &&
					data.id.campaignId === campaignId &&
					(adventureId !== undefined ? data.id.adventureId === adventureId : true) &&
					data.id.actId === actId &&
					(isList ? true : data.id.sceneId === sceneId);
				break;
			default:
				if (overloadId !== undefined) campaignId = overloadId;
				return (data: ComponentInterface) =>
					(type & data.id.type) === data.id.type &&
					data.id.campaignId === campaignId
				break;
		}
	}

	/**
	 * PRIVATE METHODS
	 */

	private async replaceLinkInRelationships(
		oldBaseName: string,
		newBaseName: string,
	): Promise<void> {
		for(let index=0; index<this.recordset.length; index++){
			if (this.recordset[index].relationships.has(oldBaseName)){
				await this.replaceFileContent(this.recordset[index].file, oldBaseName, newBaseName);
				await this.recordset[index].reload();
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

	public async refreshRelationships(
		element: ComponentInterface|undefined=undefined,
	): Promise<void> {
		if (element !== undefined){
			await element.loadRelationships(this);
			if (!element.isOutline) await element.loadReverseRelationships(this);
		} else {
			for (let index = 0; index < this.recordset.length; index++) {
				await this.recordset[index].loadRelationships(this);
			}
			for (let index=0; index<this.recordset.length; index++){
				if (!this.recordset[index].isOutline) await this.recordset[index].loadReverseRelationships(this);
			}
		}
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
		const data: ComponentInterface|undefined = this.readByPath(file.path);

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

	public async onSave(
		file: TFile,
	): Promise<void> {
		let component:ComponentInterface|undefined = this.readByPath(file.path);

		try {
			const isNewComponent = component === undefined;

			if (component !== undefined) {
				await component.reload();
			} else {
				component = await DatabaseInitialiser.createRecord(file);
			}

			if (component === undefined) return;

			if (isNewComponent && component instanceof AbstractComponentOutline) {
				await component.checkDuplicates(this);
			}

			await component.loadHierarchy(this);
			await this.create(component);
			await this.refreshRelationships(component);

			this.app.workspace.trigger("rpgmanager:refresh-views");
		} catch (e) {
			if (e instanceof AbstractRpgManagerError) {
				new DatabaseErrorModal(this.app, undefined, e, file).open();
			} else {
				throw e;
			}
			return;
		}
	}
}
