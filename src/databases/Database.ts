import {AbstractRpgManagerComponent} from "../abstracts/AbstractRpgManagerComponent";
import {App, CachedMetadata, MarkdownView, TFile} from "obsidian";
import {ComponentType} from "../components/enums/ComponentType";
import {IdInterface} from "../id/interfaces/IdInterface";
import {ComponentNotFoundError} from "../errors/ComponentNotFoundError";
import {DatabaseInterface} from "./interfaces/DatabaseInterface";
import {ComponentInterface} from "../components/interfaces/ComponentInterface";
import {CampaignInterface} from "../components/components/campaign/interfaces/CampaignInterface";
import {AdventureInterface} from "../components/components/adventure/interfaces/AdventureInterface";
import {SessionInterface} from "../components/components/session/interfaces/SessionInterface";
import {ActInterface} from "../components/components/act/interfaces/ActInterface";
import {SceneInterface} from "../components/components/scene/interfaces/SceneInterface";
import {DatabaseInitialiser} from "./DatabaseInitialiser";
import {ComponentDuplicatedError} from "../errors/ComponentDuplicatedError";
import {ComponentStage} from "../components/enums/ComponentStage";
import {AbstractRpgManagerError} from "../abstracts/AbstractRpgManagerError";
import {DatabaseErrorModal} from "../modals/DatabaseErrorModal";
import {RpgErrorInterface} from "../errors/interfaces/RpgErrorInterface";

export class Database extends AbstractRpgManagerComponent implements DatabaseInterface {
	public recordset: ComponentInterface[] = [];
	private _basenameIndex: Map<string, string>;
	private _isDatabaseReady = false;

	constructor(
		app: App,
	) {
		super(app);
		this._basenameIndex = new Map();
	}

	/**
	 * PUBLIC METHODS
	 */
	public async ready(
	): Promise<void> {
		this._isDatabaseReady = true;
		this.registerEvent(this.app.metadataCache.on('resolve', (file: TFile) => this.onSave(file)));
		this.registerEvent(this.app.vault.on('rename', (file: TFile, oldPath: string) => this._onRename(file, oldPath)));
		this.registerEvent(this.app.vault.on('delete', (file: TFile) => this._onDelete(file)));

		this.app.workspace.trigger("rpgmanager:index-complete");
		this.app.workspace.trigger("rpgmanager:refresh-views");
	}

	get isReady(
	): boolean {
		return this._isDatabaseReady;
	}

	public create(
		component: ComponentInterface,
	): void {
		let isNew = true;

		for (let componentsCounter = 0; componentsCounter < this.recordset.length; componentsCounter++) {
			if (this.recordset[componentsCounter].file.path === component.file.path){
				this.recordset[componentsCounter] = component;
				isNew = false;
			}
		}

		if (isNew) {
			this.recordset.push(component);
			this._basenameIndex.set(component.file.path, component.file.basename);
		}
	}

	public read<T>(
		query: any,
	): T[] {
		return (<unknown>this.recordset.filter((query !== null ? query : true))) as T[];
	}

	public update(
		component: ComponentInterface,
	): void {
		this.create(component);
	}

	public delete(
		component: ComponentInterface|string,
	): boolean {
		const key = (typeof component === 'string') ? component : component.file.path;

		let index: number|undefined = undefined;
		for (let componentsCounter=0; componentsCounter<this.recordset.length; componentsCounter++){
			if (this.recordset[componentsCounter].file.path === key){
				index = componentsCounter;
				break;
			}
		}

		if (index !== undefined) {
			this.recordset.splice(index, 1);
			this._basenameIndex.delete(key);
		}

		return index !== undefined;
	}

	public readByPath<T extends ComponentInterface>(
		path: string,
	): T|undefined {
		const response:ComponentInterface[] = this.recordset
			.filter((component: ComponentInterface) => component.file.path === path);

		return ((response.length) === 1 ? <T>response[0] : undefined);
	}

	public readByBaseName<T extends ComponentInterface>(
		basename: string,
	): T|undefined {
		const response:ComponentInterface[] = this.recordset
			.filter((component: ComponentInterface) => component.file.basename === basename);

		return ((response.length) === 1 ? <T>response[0] : undefined);
	}

	public readSingle<T extends ComponentInterface>(
		type: ComponentType,
		id: IdInterface,
		overloadId: number|undefined=undefined,
	): T {
		const result = this.read(this._generateQuery(type, id, false, overloadId));

		if (result.length === 0) throw new ComponentNotFoundError(this.app, id);

		return <T>result[0];
	}

	public readList<T extends ComponentInterface>(
		type: ComponentType,
		id: IdInterface|undefined,
		overloadId: number|undefined = undefined,
	): T[] {
		return <T[]>this.read(
			this._generateQuery(type, id, true, overloadId),
		);
	}

	private _generateQuery(
		type: ComponentType,
		id: IdInterface|undefined,
		isList: boolean,
		overloadId: number|undefined=undefined,
	): any {
		let campaignId: number | undefined = id?.campaignId;
		let adventureId: number | undefined = id?.adventureId;
		let actId: number | undefined = id?.actId;
		let sceneId: number | undefined = id?.sceneId;
		let sessionId: number | undefined = id?.sessionId;

		switch(type) {
			case ComponentType.Campaign:
				if (overloadId !== undefined) campaignId = overloadId;
				return (component: CampaignInterface) =>
					(type & component.id.type) === component.id.type &&
					(isList ? true : component.id.campaignId === campaignId);
				break;
			case ComponentType.Adventure:
				if (overloadId !== undefined) adventureId = overloadId;
				return (component: AdventureInterface) =>
					(type & component.id.type) === component.id.type &&
					component.id.campaignId === campaignId &&
					(isList ? true : component.id.adventureId === adventureId);
				break;
			case ComponentType.Session:
				if (overloadId !== undefined) sessionId = overloadId;
				return (component: SessionInterface) =>
					(type & component.id.type) === component.id.type &&
					component.id.campaignId === campaignId &&
					(isList ? true : component.id.sessionId === sessionId);
				break;
			case ComponentType.Act:
				if (overloadId !== undefined) actId = overloadId;
				return (component: ActInterface) =>
					(type & component.id.type) === component.id.type &&
					component.id.campaignId === campaignId &&
					(adventureId !== undefined ? component.id.adventureId === adventureId : true) &&
					(isList ? true : component.id.actId === actId);
				break;
			case ComponentType.Scene:
				if (overloadId !== undefined) sceneId = overloadId;
				return (component: SceneInterface) =>
					(type & component.id.type) === component.id.type &&
					component.id.campaignId === campaignId &&
					(adventureId !== undefined ? component.id.adventureId === adventureId : true) &&
					component.id.actId === actId &&
					(isList ? true : component.id.sceneId === sceneId);
				break;
			default:
				if (overloadId !== undefined) campaignId = overloadId;
				return (component: ComponentInterface) =>
					(type & component.id.type) === component.id.type &&
					component.id.campaignId === campaignId
				break;
		}
	}

	private async _replaceFileContent(
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

	/**
	 * EVENTS
	 */
	private async _onDelete(
		file: TFile,
	): Promise<void> {
		if (this.delete(file.path)){
			this.app.workspace.trigger("rpgmanager:refresh-views");
		}
	}

	private async _onRename(
		file: TFile,
		oldPath: string,
	): Promise<void> {
		const oldBaseName: string|undefined = this._basenameIndex.get(oldPath);
		const newBaseName = file.path;

		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
		const component: ComponentInterface|undefined = this.readByPath(file.path);

		await this._basenameIndex.delete(oldPath);
		if (component !== undefined) await this._basenameIndex.set(file.path, file.basename);

		if (oldBaseName !== undefined && component !== undefined && metadata != null) {
			await this._replaceFileContent(file, oldBaseName, newBaseName);
			await component.readMetadata();

			DatabaseInitialiser.reinitialiseRelationships(component, this)
				.then(() => {
					if (this.app.workspace.getActiveFile()?.path === file.path){
						this.app.workspace.getActiveViewOfType(MarkdownView)?.editor.refresh();
					}

					this.app.workspace.trigger("rpgmanager:refresh-views");
				});
		}
	}

	public async onSave(
		file: TFile,
	): Promise<void> {
		let component:ComponentInterface|undefined = this.readByPath(file.path);

		try {
			const isNewComponent = component === undefined;

			if (component === undefined) {
				component = await DatabaseInitialiser.createComponent(file);
			}

			if (component === undefined) return;

			await component.readMetadata();
			await component.validateHierarchy();

			if (isNewComponent && (component.stage === ComponentStage.Run || component.stage === ComponentStage.Plot)) {
				let error: RpgErrorInterface | undefined = undefined;
				try {
					const duplicate = this.readSingle(component.id.type, component.id);
					error = new ComponentDuplicatedError(this.app, component.id, [duplicate], component);
				} catch (e) {
					//no need to trap an error here
				}

				if (error !== undefined) {
					throw error;
				}
			}

			await this.create(component);

			DatabaseInitialiser.reinitialiseRelationships(component, this)
				.then(() => {
					this.app.workspace.trigger("rpgmanager:refresh-views");
				});
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
