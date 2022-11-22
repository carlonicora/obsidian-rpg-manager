import {CachedMetadata, Component, MarkdownView, TFile} from "obsidian";
import {ComponentType} from "../../core/enums/ComponentType";
import {IndexInterface} from "../../services/indexService/interfaces/IndexInterface";
import {ComponentNotFoundError} from "../../core/errors/ComponentNotFoundError";
import {DatabaseInterface} from "./interfaces/DatabaseInterface";
import {ModelInterface} from "../modelsManager/interfaces/ModelInterface";
import {DatabaseInitialiser} from "./DatabaseInitialiser";
import {ComponentDuplicatedError} from "../../core/errors/ComponentDuplicatedError";
import {ComponentStage} from "../../core/enums/ComponentStage";
import {DatabaseErrorModal} from "./modals/DatabaseErrorModal";
import {RpgErrorInterface} from "../../core/errors/interfaces/RpgErrorInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {RunningTimeService} from "../../services/runningTimeService/RunningTimeService";
import {AbstractRpgManagerError} from "../../core/errors/abstracts/AbstractRpgManagerError";
import {GalleryService} from "../../services/galleryService/GalleryService";
import {
	AllComponentManipulatorService
} from "../../services/allComponentManipulatorService/AllComponentManipulatorService";

export class Database extends Component implements DatabaseInterface {
	public recordset: ModelInterface[] = [];
	private _basenameIndex: Map<string, string>;
	private _isDatabaseReady = false;

	constructor(
		private _api: RpgManagerApiInterface,
	) {
		super();
		this._basenameIndex = new Map();
	}

	/**
	 * PUBLIC METHODS
	 */
	public async ready(
	): Promise<void> {
		this._isDatabaseReady = true;
		this._api.app.workspace.trigger("rpgmanager:database-ready");
		this._api.service(RunningTimeService).updateMedianTimes(true);

		this.registerEvent(this._api.app.metadataCache.on('resolve', (file: TFile) => this.onSave(file)));
		this.registerEvent(this._api.app.vault.on('rename', (file: TFile, oldPath: string) => this._onRename(file, oldPath)));
		this.registerEvent(this._api.app.vault.on('delete', (file: TFile) => this._onDelete(file)));

		this._api.app.workspace.trigger("rpgmanager:index-complete");
		this._api.app.workspace.trigger("rpgmanager:force-refresh-views");
	}

	get isReady(
	): boolean {
		return this._isDatabaseReady;
	}

	public create(
		component: ModelInterface,
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
		component: ModelInterface,
	): void {
		this.create(component);
	}

	public delete(
		component: ModelInterface|string,
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

	public readByPath<T extends ModelInterface>(
		path: string,
	): T|undefined {
		const response:ModelInterface[] = this.recordset
			.filter((component: ModelInterface) => component.file.path === path);

		return ((response.length) === 1 ? <T>response[0] : undefined);
	}

	public readByBaseName<T extends ModelInterface>(
		basename: string,
	): T|undefined {
		const response:ModelInterface[] = this.recordset
			.filter((component: ModelInterface) => component.file.basename === basename);

		return ((response.length) === 1 ? <T>response[0] : undefined);
	}

	public readById<T extends ModelInterface>(
		id: string,
	): T {
		const result = this.read((component: ModelInterface) =>
			component.index.id === id
		);

		if (result.length !== 1)
			throw new Error('');

		return <T>result[0];
	}

	public readChildren<T extends ModelInterface>(
		type: ComponentType,
		id: string,
	): T[] {
		return this.read((model: ModelInterface) =>
			model.index.type === type &&
			model.index.parentId === id
		);
	}

	public readNeighbour<T extends ModelInterface>(
		type: ComponentType,
		id: IndexInterface,
		previous: boolean,
	): T {
		const result = this.read((model: ModelInterface) =>
			model.index.type === type &&
			(id.campaignId !== undefined ? model.index.campaignId === id.campaignId : true) &&
			(id.parentId !== undefined ? model.index.parentId === id.parentId : true) &&
			(model.index.positionInParent === (previous ? id.positionInParent - 1 : id.positionInParent + 1))
		);

		if (result.length === 0) throw new ComponentNotFoundError(this._api, id);

		return <T>result[0];
	}

	private async _replaceFileContent(
		file: TFile,
		oldBaseName: string,
		newBaseName: string,
	): Promise<void> {
		const content = await this._api.app.vault.read(file);
		const newFileContent = content
			.replaceAll('[[' +  oldBaseName + ']]', '[[' + newBaseName + ']]')
			.replaceAll('[[' + oldBaseName + '|', '[[' + newBaseName + '|');

		if (content !== newFileContent) {
			return this._api.app.vault.modify(file, newFileContent)
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
		if (this.delete(file.path))
			this._api.app.workspace.trigger("rpgmanager:refresh-views");

	}

	private async _onRename(
		file: TFile,
		oldPath: string,
	): Promise<void> {
		const oldBaseName: string|undefined = this._basenameIndex.get(oldPath);
		const newBaseName = file.path;

		const metadata: CachedMetadata|null = this._api.app.metadataCache.getFileCache(file);
		const component: ModelInterface|undefined = this.readByPath(file.path);

		await this._basenameIndex.delete(oldPath);
		if (component !== undefined) await this._basenameIndex.set(file.path, file.basename);

		if (this._api.service(GalleryService).imageExtensions.contains(file.extension)) {
			this._api.service(AllComponentManipulatorService).updateImagePath(oldPath, file.path);
		} else {
			this._api.service(AllComponentManipulatorService).updateRelationshipPath(oldPath, file.path);
		}

		if (oldBaseName !== undefined && component !== undefined && metadata != null) {
			await this._replaceFileContent(file, oldBaseName, newBaseName);

			await component.readMetadata();
			component.addReverseRelationships()
				.then(() => {
					if (this._api.app.workspace.getActiveFile()?.path === file.path){
						this._api.app.workspace.getActiveViewOfType(MarkdownView)?.editor.refresh();
					}

					this._api.app.workspace.trigger("rpgmanager:refresh-views");
				});
		}
	}

	public async onSave(
		file: TFile,
	): Promise<void> {
		let component:ModelInterface|undefined = await this.readByPath(file.path);

		try {
			const isNewComponent = component === undefined;

			if (component === undefined)
				component = await DatabaseInitialiser.createComponent(this._api, file);

			if (component === undefined)
				return;

			await component.readMetadata();

			if (!isNewComponent)
				await component.addReverseRelationships();

			await component.addRelationshipToRelatedElements();

			if (isNewComponent && (component.stage === ComponentStage.Run || component.stage === ComponentStage.Plot)) {
				await component.validateHierarchy();

				let error: RpgErrorInterface | undefined = undefined;
				try {
					const duplicate = this.readById(component.index.id);
					error = new ComponentDuplicatedError(this._api, component.index, [duplicate], component);
				} catch (e) {
					//no need to trap an error here
				}

				if (error !== undefined) {
					throw error;
				}
			}

			await this.create(component);

			await component.touch();

			this._api.app.workspace.trigger("rpgmanager:refresh-views");
		} catch (e) {
			if (e instanceof AbstractRpgManagerError) {
				new DatabaseErrorModal(this._api, undefined, e, file).open();
			} else {
				throw e;
			}
			return;
		}
	}
}
