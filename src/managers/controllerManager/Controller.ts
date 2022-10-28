import {
	Component,
	MarkdownPostProcessorContext,
	MarkdownRenderChild,
	MarkdownView,
	parseYaml,
	TFile,
	WorkspaceLeaf
} from "obsidian";
import {ControllerMetadataInterface} from "./interfaces/ControllerMetadataInterface";
import {ModelInterface} from "../modelsManager/interfaces/ModelInterface";
import {ResponseDataInterface} from "../../../REFACTOR/responses/interfaces/ResponseDataInterface";
import {ViewType} from "../viewsManager/enum/ViewType";
import {StaticViewInterface} from "../staticViewsManager/interfaces/StaticViewInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RelationshipType} from "../../services/relationshipsService/enums/RelationshipType";
import {RelationshipService} from "../../services/relationshipsService/RelationshipService";
import {ViewClassInterface} from "../viewsManager/interfaces/ViewClassInterface";
import {NewRelationshipsViewInterface} from "../viewsManager/interfaces/NewRelationshipsViewInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export class Controller extends MarkdownRenderChild {
	private _componentVersion: number|undefined = undefined;
	private _currentComponent: ModelInterface;
	private _data: ResponseDataInterface;
	private _isActive = false;
	private _views: Map<ViewClassInterface, {type: ViewType, relatedType?: ComponentType, relationshipType?: RelationshipType}>;

	constructor(
		private _api: RpgManagerApiInterface,
		container: HTMLElement,
		private _source: string,
		private _component: Component | MarkdownPostProcessorContext,
		private _sourcePath: string,
	) {
		super(container);

		this._views = new Map<ViewClassInterface, {type: ViewType, relatedType?: ComponentType; relationshipType?: RelationshipType}>();

		this.registerEvent(this._api.app.vault.on('rename', (file: TFile, oldPath: string) => this._onRename(file, oldPath)));

		this.registerEvent(this._api.app.workspace.on("rpgmanager:refresh-views", this._render.bind(this)));
		this.registerEvent(this._api.app.workspace.on("rpgmanager:force-refresh-views", (() => {
			this._render(true);
		}).bind(this)));
	}

	onload() {
		super.onload();
		this._render();
	}

	private async _onRename(
		file: TFile,
		oldPath: string,
	): Promise<void>{
		if (this._sourcePath === oldPath)
			this._sourcePath = file.path;

		this._render();
	}

	private async _initialise(
	): Promise<boolean> {
		if (this._componentVersion !== undefined && this._currentComponent.version === this._componentVersion)
			return false;

		this._componentVersion = this._currentComponent.version ?? 0 + 0;

		return true;
	}

	private async _waitForComponentToBeReady() {
		const poll = (resolve: any) => {
			if (this._api.database.isReady){
				if (this._currentComponent === undefined)
					this._loadCurrentModel()

				if (this._currentComponent !== undefined && this._currentComponent.version !== undefined)
					resolve();
				else
					setTimeout(callback => poll(resolve), 100);

			} else {
				setTimeout(callback => poll(resolve), 100);
			}
		};

		return new Promise(poll);
	}

	private _loadCurrentModel(
	): void {
		if (this._api.database === undefined)
			return;

		const rpgmComponent: ModelInterface|undefined = this._api.database.readByPath<ModelInterface>(this._sourcePath);

		if (rpgmComponent === undefined)
			return;

		this._currentComponent = rpgmComponent;

		const yamlSource: ControllerMetadataInterface = parseYaml(this._source);

		if (yamlSource.models.header !== undefined) {
			const viewClass = this._api.views.create(ViewType.Header, this._currentComponent.id.type, this._currentComponent.campaignSettings);
			if (viewClass !== undefined)
				this._views.set(viewClass, {type: ViewType.Header});

		}

		if (yamlSource.models.lists !== undefined) {
			Object.entries(yamlSource.models.lists).forEach(([relationshipType, value]: [string, any]) => {
				const componentType: ComponentType|undefined = this._api.service(RelationshipService).getComponentTypeFromListName(relationshipType);

				if (componentType !== undefined) {
					const viewClass = this._api.views.create(ViewType.Relationships, componentType, this._currentComponent.campaignSettings);

					if (viewClass !== undefined)
						this._views.set(
							viewClass,
							{
								type: ViewType.Relationships,
								relatedType: componentType,
								relationshipType: this._api.service(RelationshipService).getTypeFromString(relationshipType),
							}
						);

				}
			});
		}
	}

	private async _render(
		forceRefresh=false,
	): Promise<void> {
		await this._waitForComponentToBeReady();

		if (this._currentComponent === undefined)
			return;

		if (await !this._isComponentVisible())
			return;

		if (forceRefresh)
			this._componentVersion = undefined;

		if (await this._initialise()) {
			this.containerEl.empty();

			this._views.forEach((viewClassDetails: {type: ViewType, relatedType?: ComponentType, relationshipType?: RelationshipType}, viewClass: ViewClassInterface) => {
				let view: StaticViewInterface|undefined = undefined;

				if (viewClassDetails.type === ViewType.Header){
					view = new viewClass(this._api, this._currentComponent, this.containerEl, this._sourcePath);
				} else {
					if (viewClassDetails.relatedType !== undefined && viewClassDetails.relationshipType !== undefined) {
						view = new viewClass(this._api, this._currentComponent, this.containerEl, this._sourcePath);
						(<NewRelationshipsViewInterface>view).relatedComponentType = viewClassDetails.relatedType;
						(<NewRelationshipsViewInterface>view).relationshipType = viewClassDetails.relationshipType;
					}
				}

				if (view !== undefined)
					view.render();
			});

			this.containerEl.show();
		}
	}

	private async _isComponentVisible(
	): Promise<boolean> {
		if (this._currentComponent === undefined) {
			return false;
		}

		if (this._currentComponent.file === undefined) {
			return false;
		}

		await this._api.app.workspace.iterateAllLeaves((leaf: WorkspaceLeaf) => {
			if (leaf.view instanceof MarkdownView) {
				const file = leaf.view?.file;
				if (file !== undefined){
					if (file.path === this._currentComponent.file.path) return true;
				}
			}
		});

		return false;
	}
}
