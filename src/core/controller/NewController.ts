import {
	App,
	Component,
	MarkdownPostProcessorContext,
	MarkdownRenderChild,
	MarkdownView,
	parseYaml,
	TFile,
	WorkspaceLeaf
} from "obsidian";
import {ControllerMetadataInterface} from "./interfaces/ControllerMetadataInterface";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {ResponseDataInterface} from "../../responses/interfaces/ResponseDataInterface";
import {ResponseDataElementInterface} from "../../responses/interfaces/ResponseDataElementInterface";
import {ViewInterface} from "../../REFACTOR/views/interfaces/ViewInterface";
import {NewViewType} from "../enums/NewViewType";
import {NewViewInterface} from "../../views/interfaces/NewViewInterface";
import {ComponentType} from "../enums/ComponentType";
import {NewHeaderViewInterface} from "../../views/interfaces/NewHeaderViewInterface";
import {NewRelationshipsViewInterface} from "../../views/interfaces/NewRelationshipsViewInterface";
import {RelationshipType} from "../../services/relationships/enums/RelationshipType";
import {RelationshipService} from "../../services/relationships/RelationshipService";

export class NewController extends MarkdownRenderChild {
	private _componentVersion: number|undefined = undefined;
	private _currentComponent: ComponentModelInterface;
	private _data: ResponseDataInterface;
	private _isActive = false;
	private _views: Map<NewViewInterface, {relatedType?: ComponentType, relationshipType?: RelationshipType}>;

	constructor(
		private _app: App,
		container: HTMLElement,
		private _source: string,
		private _component: Component | MarkdownPostProcessorContext,
		private _sourcePath: string,
	) {
		super(container);

		this._views = new Map<NewViewInterface, {relatedType?: ComponentType; relationshipType?: RelationshipType}>();

		this.registerEvent(this._app.vault.on('rename', (file: TFile, oldPath: string) => this._onRename(file, oldPath)));

		this.registerEvent(this._app.workspace.on("rpgmanager:refresh-views", this._render.bind(this)));
		this.registerEvent(this._app.workspace.on("rpgmanager:force-refresh-views", (() => {
			this._render(true);
		}).bind(this)));
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
			if(window.RpgManagerAPI?.database.isReady && this._currentComponent.version !== undefined) {
				resolve();
			} else {
				setTimeout(callback => poll(resolve), 100);
			}
		}

		return new Promise(poll);
	}

	onload() {
		super.onload();
		this._render();
	}

	private async _render(
		forceRefresh=false,
	): Promise<void> {
		if (window.RpgManagerAPI?.database === undefined)
			return;

		if (this._currentComponent === undefined){
			const rpgmComponent: ComponentModelInterface|undefined = window.RpgManagerAPI?.database.readByPath<ComponentModelInterface>(this._sourcePath);

			if (rpgmComponent === undefined)
				return;

			this._currentComponent = rpgmComponent;

			const yamlSource: ControllerMetadataInterface = parseYaml(this._source);
			if (yamlSource.models.header !== undefined){
				this._views.set(window.RpgManagerAPI.views.create(NewViewType.Header, this._currentComponent.id.type, this._currentComponent.campaignSettings), {});
			} else if (yamlSource.models.lists !== undefined) {
				Object.entries(yamlSource.models.lists).forEach(([relationshipType, value]: [string, any]) => {
					const componentType: ComponentType|undefined = window.RpgManagerAPI?.services.get(RelationshipService)?.getComponentTypeFromListName(relationshipType)

					if (componentType !== undefined && window.RpgManagerAPI !== undefined)
						this._views.set(
							window.RpgManagerAPI.views.create(NewViewType.Relationships, componentType, this._currentComponent.campaignSettings),
							{
								relatedType: componentType,
								relationshipType: window.RpgManagerAPI.services.get(RelationshipService)?.getTypeFromString(relationshipType),
							}
						);
				});
			}
		}

		await this._waitForComponentToBeReady();

		if (await !this._isComponentVisible())
			return;

		if (forceRefresh)
			this._componentVersion = undefined;

		if (await this._initialise()) {
			this.containerEl.empty();

			this._views.forEach((relationship: {relatedType?: ComponentType, relationshipType?: RelationshipType}, view: NewViewInterface) => {
				if (view.type === NewViewType.Header){
					(<NewHeaderViewInterface>view).render(this._currentComponent, this.containerEl);
				} else {
					if (relationship.relatedType !== undefined && relationship.relationshipType !== undefined)
						(<NewRelationshipsViewInterface>view).render(this._currentComponent, relationship.relatedType, relationship.relationshipType, this.containerEl);
				}
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

		await this._app.workspace.iterateAllLeaves((leaf: WorkspaceLeaf) => {
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
