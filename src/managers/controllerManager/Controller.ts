import {
	Component, debounce,
	MarkdownPostProcessorContext,
	MarkdownRenderChild,
	MarkdownView,
	parseYaml,
	TFile,
	WorkspaceLeaf
} from "obsidian";
import {ControllerMetadataInterface} from "./interfaces/ControllerMetadataInterface";
import {ModelInterface} from "../modelsManager/interfaces/ModelInterface";
import {ViewType} from "../viewsManager/enum/ViewType";
import {StaticViewInterface} from "../staticViewsManager/interfaces/StaticViewInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RelationshipType} from "../../services/relationshipsService/enums/RelationshipType";
import {RelationshipService} from "../../services/relationshipsService/RelationshipService";
import {ViewClassInterface} from "../viewsManager/interfaces/ViewClassInterface";
import {RelationshipsViewInterface} from "../viewsManager/interfaces/RelationshipsViewInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {ControllerMetadataModelElementInterface} from "./interfaces/ControllerMetadataModelElementInterface";

export class Controller extends MarkdownRenderChild {
	private _componentVersion: number|undefined = undefined;
	private _currentComponent: ModelInterface;
	private _isActive = false;
	private _views: Map<string, {viewClassInterface: ViewClassInterface, type: ViewType, relatedType?: ComponentType, relationshipType?: RelationshipType, title?: string}>;

	constructor(
		private _api: RpgManagerApiInterface,
		container: HTMLElement,
		private _source: string,
		private _component: Component | MarkdownPostProcessorContext,
		private _sourcePath: string,
	) {
		super(container);

		this._views = new Map<string, {viewClassInterface: ViewClassInterface, type: ViewType, relatedType?: ComponentType; relationshipType?: RelationshipType}>();

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
					this._loadCurrentModel();

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
				this._views.set(this._createModelIdentifier(ViewType.Header, this._currentComponent.id.type), {viewClassInterface: viewClass, type: ViewType.Header});

		}

		if (yamlSource.models.lists !== undefined) {
			Object.entries(yamlSource.models.lists).forEach(([relationshipType, value]: [string, ControllerMetadataModelElementInterface|ControllerMetadataModelElementInterface[]|null]) => {
				const componentType: ComponentType|undefined = this._api.service(RelationshipService).getComponentTypeFromListName(relationshipType);

				if (Array.isArray(value)) {
					for (let index=0; index<value.length; index++){
						this._loadRelationshipModel(componentType, relationshipType, value[index]);
					}
				} else {
					this._loadRelationshipModel(componentType, relationshipType, value);
				}
			});
		}
	}

	private _createModelIdentifier(
		viewType: ViewType,
		componentType: ComponentType,
		relatedType?: ComponentType,
		relationshipType?: RelationshipType,
	): string {
		let response = viewType.toString() + '-';
		response += componentType.toString() + '-';

		if (relatedType !== undefined)
			response += relatedType.toString() + '-';

		if (relationshipType !== undefined)
			response += relationshipType.toString() + '-';

		return response;
	}

	private _loadRelationshipModel(
		componentType: ComponentType|undefined,
		relationshipType: string,
		value: ControllerMetadataModelElementInterface|null,
	): void {
		let requiredRelationship: RelationshipType | undefined = undefined;
		let relationshipTitle: string|undefined = undefined;

		if (value != undefined){
			requiredRelationship = value.relationship ? this._api.service(RelationshipService).getTypeFromString(value.relationship) : undefined;
			relationshipTitle = value.title;
		}

		if (componentType !== undefined) {
			const viewClass = this._api.views.create(ViewType.Relationships, componentType, this._currentComponent.campaignSettings);

			if (viewClass !== undefined)
				this._views.set(
					this._createModelIdentifier(ViewType.Header, this._currentComponent.id.type, componentType, requiredRelationship),
					{
						viewClassInterface: viewClass,
						type: ViewType.Relationships,
						relatedType: componentType,
						relationshipType: requiredRelationship,
						title: relationshipTitle,
					}
				);

		}
	}

	private async _render(
		forceRefresh=false,
	): Promise<void> {
		this._render = debounce(this._render, 250, true) as unknown as () => Promise<void>;

		await this._waitForComponentToBeReady();

		if (this._currentComponent === undefined)
			return;

		if (await !this._isComponentVisible())
			return;

		if (forceRefresh)
			this._componentVersion = undefined;

		if (await this._initialise()) {
			this.containerEl.empty();

			this._views.forEach((viewClassDetails: {viewClassInterface: ViewClassInterface, type: ViewType, relatedType?: ComponentType, relationshipType?: RelationshipType, title?: string}, identifier: string) => {
				let view: StaticViewInterface|undefined = undefined;

				if (viewClassDetails.type === ViewType.Header){
					view = new viewClassDetails.viewClassInterface(this._api, this._currentComponent, this.containerEl, this._sourcePath);
				} else {
					if (viewClassDetails.relatedType !== undefined) {
						view = new viewClassDetails.viewClassInterface(this._api, this._currentComponent, this.containerEl, this._sourcePath);
						(<RelationshipsViewInterface>view).relatedComponentType = viewClassDetails.relatedType;
						(<RelationshipsViewInterface>view).relationshipType = viewClassDetails.relationshipType;
						(<RelationshipsViewInterface>view).relationshipTitle = viewClassDetails.title;
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
