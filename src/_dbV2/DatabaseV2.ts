import {AbstractRpgManagerComponent} from "../abstracts/AbstractRpgManagerComponent";
import {App, CachedMetadata, MarkdownView, TFile} from "obsidian";
import {ComponentType} from "../enums/ComponentType";
import {IdInterface} from "../interfaces/IdInterface";
import {ComponentNotFoundError} from "../errors/ComponentNotFoundError";
import {DatabaseV2Interface} from "./interfaces/DatabaseV2Interface";
import {ComponentV2Interface} from "./interfaces/ComponentV2Interface";
import {CampaignV2Interface} from "./components/interfaces/CampaignV2Interface";
import {AdventureV2Interface} from "./components/interfaces/AdventureV2Interface";
import {SessionV2Interface} from "./components/interfaces/SessionV2Interface";
import {ActV2Interface} from "./components/interfaces/ActV2Interface";
import {SceneV2Interface} from "./components/interfaces/SceneV2Interface";
import {DatabaseV2Initialiser} from "./DatabaseV2Initialiser";
import {ComponentDuplicatedError} from "../errors/ComponentDuplicatedError";
import {ComponentStage} from "./components/enums/ComponentStage";
import {AbstractRpgManagerError} from "../abstracts/AbstractRpgManagerError";
import {DatabaseErrorModal} from "../modals/DatabaseErrorModal";

export class DatabaseV2 extends AbstractRpgManagerComponent implements DatabaseV2Interface {
	public recordset: Array<ComponentV2Interface> = [];
	private basenameIndex: Map<string, string>;

	constructor(
		app: App,
	) {
		super(app);
		this.basenameIndex = new Map();
	}

	/**
	 * PUBLIC METHODS
	 */
	public async ready(
	): Promise<void> {
		this.registerEvent(this.app.metadataCache.on('resolve', (file: TFile) => this.onSave(file)));
		this.registerEvent(this.app.vault.on('rename', (file: TFile, oldPath: string) => this.onRename(file, oldPath)));
		this.registerEvent(this.app.vault.on('delete', (file: TFile) => this.onDelete(file)));

		this.app.workspace.trigger("rpgmanager:index-complete");
		this.app.workspace.trigger("rpgmanager:refresh-views");
	}

	public create(
		component: ComponentV2Interface,
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
			this.basenameIndex.set(component.file.path, component.file.basename);
		}
	}

	public read<T>(
		query: any,
	): Array<T> {
		return (<unknown>this.recordset.filter((query !== null ? query : true))) as Array<T>;
	}

	public update(
		component: ComponentV2Interface,
	): void {
		this.create(component);
	}

	public delete(
		component: ComponentV2Interface|string,
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
			this.basenameIndex.delete(key);
		}

		return index !== undefined;
	}

	public readByPath<T extends ComponentV2Interface>(
		path: string,
	): T|undefined {
		const response:Array<ComponentV2Interface> = this.recordset
			.filter((component: ComponentV2Interface) => component.file.path === path);

		return ((response.length) === 1 ? <T>response[0] : undefined);
	}

	public readByBaseName<T extends ComponentV2Interface>(
		basename: string,
	): T|undefined {
		const response:Array<ComponentV2Interface> = this.recordset
			.filter((component: ComponentV2Interface) => component.file.basename === basename);

		return ((response.length) === 1 ? <T>response[0] : undefined);
	}

	public readSingle<T extends ComponentV2Interface>(
		type: ComponentType,
		id: IdInterface,
		overloadId: number|undefined=undefined,
	): T {
		const result = this.read(this.generateQuery(type, id, false, overloadId));

		if (result.length === 0) throw new ComponentNotFoundError(this.app, id);

		return <T>result[0];
	}

	public readList<T extends ComponentV2Interface>(
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
		let campaignId: number | undefined = id?.campaignId;
		let adventureId: number | undefined = id?.adventureId;
		let actId: number | undefined = id?.actId;
		let sceneId: number | undefined = id?.sceneId;
		let sessionId: number | undefined = id?.sessionId;

		switch(type) {
			case ComponentType.Campaign:
				if (overloadId !== undefined) campaignId = overloadId;
				return (component: CampaignV2Interface) =>
					(type & component.id.type) === component.id.type &&
					(isList ? true : component.id.campaignId === campaignId);
				break;
			case ComponentType.Adventure:
				if (overloadId !== undefined) adventureId = overloadId;
				return (component: AdventureV2Interface) =>
					(type & component.id.type) === component.id.type &&
					component.id.campaignId === campaignId &&
					(isList ? true : component.id.adventureId === adventureId);
				break;
			case ComponentType.Session:
				if (overloadId !== undefined) sessionId = overloadId;
				return (component: SessionV2Interface) =>
					(type & component.id.type) === component.id.type &&
					component.id.campaignId === campaignId &&
					(isList ? true : component.id.sessionId === sessionId);
				break;
			case ComponentType.Act:
				if (overloadId !== undefined) actId = overloadId;
				return (component: ActV2Interface) =>
					(type & component.id.type) === component.id.type &&
					component.id.campaignId === campaignId &&
					(adventureId !== undefined ? component.id.adventureId === adventureId : true) &&
					(isList ? true : component.id.actId === actId);
				break;
			case ComponentType.Scene:
				if (overloadId !== undefined) sceneId = overloadId;
				return (component: SceneV2Interface) =>
					(type & component.id.type) === component.id.type &&
					component.id.campaignId === campaignId &&
					(adventureId !== undefined ? component.id.adventureId === adventureId : true) &&
					component.id.actId === actId &&
					(isList ? true : component.id.sceneId === sceneId);
				break;
			default:
				if (overloadId !== undefined) campaignId = overloadId;
				return (component: ComponentV2Interface) =>
					(type & component.id.type) === component.id.type &&
					component.id.campaignId === campaignId
				break;
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

	/**
	 * EVENTS
	 */
	private async onDelete(
		file: TFile,
	): Promise<void> {
		if (this.delete(file.path)){
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
		const component: ComponentV2Interface|undefined = this.readByPath(file.path);

		await this.basenameIndex.delete(oldPath);
		if (component !== undefined) await this.basenameIndex.set(file.path, file.basename);

		if (oldBaseName !== undefined && component !== undefined && metadata != null) {
			await this.replaceFileContent(file, oldBaseName, newBaseName);
			await component.readMetadata();


			if (this.app.workspace.getActiveFile()?.path === file.path){
				this.app.workspace.getActiveViewOfType(MarkdownView)?.editor.refresh();
			}

			this.app.workspace.trigger("rpgmanager:refresh-views");
		}
	}

	public async onSave(
		file: TFile,
	): Promise<void> {
		let component:ComponentV2Interface|undefined = this.readByPath(file.path);

		try {
			const isNewComponent = component === undefined;

			if (component !== undefined) {
				await component.readMetadata();
			} else {
				component = await DatabaseV2Initialiser.createComponent(file);
			}

			if (component === undefined) return;

			if (isNewComponent && (component.stage === ComponentStage.Run || component.stage === ComponentStage.Plot)) {
				try {
					const duplicate = this.readSingle(component.id.type, component.id);
					throw new ComponentDuplicatedError(this.app, component.id, [duplicate], component);
				} catch (e) {
					//no need to trap an error here
				}
			}

			await this.create(component);

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
