import {
	App,
	Component,
	MarkdownPostProcessorContext,
	MarkdownView,
	parseYaml,
	TFile, WorkspaceLeaf,
} from "obsidian";
import {ResponseDataInterface} from "../responses/interfaces/ResponseDataInterface";
import {ResponseDataElementInterface} from "../responses/interfaces/ResponseDataElementInterface";
import {ViewInterface} from "../views/interfaces/ViewInterface";
import {ModelInterface} from "../models/interfaces/ModelInterface";
import {AbstractRpgManagerMarkdownRenderChild} from "../abstracts/AbstractRpgManagerMarkdownRenderChild";
import {ComponentInterface} from "../components/interfaces/ComponentInterface";
import {
	ControllerMetadataInterface
} from "./interfaces/ControllerMetadataInterface";

export class Controller extends AbstractRpgManagerMarkdownRenderChild {
	private _isActive = false;
	private _data: ResponseDataInterface;
	private _models: ModelInterface[] = [];

	private _currentComponent: ComponentInterface;

	public componentVersion: number|undefined = undefined;

	constructor(
		app: App,
		container: HTMLElement,
		private _source: string,
		private _component: Component | MarkdownPostProcessorContext,
		private _sourcePath: string,
	) {
		super(app, container);

		this.registerEvent(this.app.vault.on('rename', (file: TFile, oldPath: string) => this._onRename(file, oldPath)));

		this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this._render.bind(this)));
		this.registerEvent(this.app.workspace.on("rpgmanager:force-refresh-views", (() => {
			this._render(true);
		}).bind(this)));
	}

	private async _onRename(
		file: TFile,
		oldPath: string,
	): Promise<void>{
		if (this._sourcePath === oldPath) this._sourcePath = file.path;
		this._render();
	}

	private _generateModels(
	): void {
		this._models = [];
		try {
			const configurations: ControllerMetadataInterface | any = parseYaml(this._source);

			if (configurations.models.header !== undefined){
				this._models.push(this._generateModel('Header'));
			}

			if (configurations.models.lists !== undefined){
				this._models.push(this._generateModel('List', configurations.models.lists));
			}
		} catch (e) {
			//No need to throw an exception... possibly saving before the data is ready
		}
	}

	private _generateModel(
		modelName: string,
		sourceMeta: any|undefined = undefined,
	): ModelInterface {
		return this.factories.models.create(
			this._currentComponent.campaignSettings,
			modelName,
			this._currentComponent,
			this._source,
			this._sourcePath,
			sourceMeta,
		);
	}

	private async _initialise(
	): Promise<boolean> {
		if (this.componentVersion !== undefined && this._currentComponent.version === this.componentVersion) {
			return false;
		}

		this.componentVersion = this._currentComponent.version ?? 0 + 0;

		this._generateModels();

		return true;
	}

	private async _waitForComponentToBeReady() {
		const poll = (resolve: any) => {
			if(this.database.isReady && this._currentComponent.version !== undefined) {
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
		if (this.database === undefined) return;

		if (this._currentComponent === undefined){
			const rpgmComponent: ComponentInterface|undefined = this.app.plugins.getPlugin('rpg-manager').database.readByPath<ComponentInterface>(this._sourcePath);
			if (rpgmComponent === undefined) return;
			this._currentComponent = rpgmComponent;
		}

		await this._waitForComponentToBeReady();

		//if (await !this.isComponentVisible()) return;

		if (forceRefresh) this.componentVersion = undefined;

		if (await this._initialise()) {
			this.container.empty();

			for (let modelCounter = 0; modelCounter < this._models.length; modelCounter++) {
				await this._models[modelCounter].generateData()
					.then((data: ResponseDataInterface) => {
						data.elements.forEach((element: ResponseDataElementInterface) => {
							const view: ViewInterface = this.factories.views.create(
								this._currentComponent.campaignSettings,
								element.responseType,
								this._sourcePath,
							);

							view.render(this.container, element);
						});
					});
			}

			this.container.show();
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

		await this.app.workspace.iterateAllLeaves((leaf: WorkspaceLeaf) => {
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
