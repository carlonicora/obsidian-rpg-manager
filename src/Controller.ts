import {
	App,
	Component,
	debounce,
	MarkdownPostProcessorContext,
	MarkdownView,
	parseYaml,
	TFile, WorkspaceLeaf,
	WorkspaceWindow
} from "obsidian";
import {ResponseDataInterface} from "./responses/interfaces/ResponseDataInterface";
import {ResponseDataElementInterface} from "./responses/interfaces/ResponseDataElementInterface";
import {ViewInterface} from "./views/interfaces/ViewInterface";
import {ModelInterface} from "./models/interfaces/ModelInterface";
import {CampaignSetting} from "./databases/enums/CampaignSetting";
import {AbstractRpgManagerMarkdownRenderChild} from "./abstracts/AbstractRpgManagerMarkdownRenderChild";
import {ComponentInterface} from "./databases/interfaces/ComponentInterface";
import {CampaignInterface} from "./databases/components/interfaces/CampaignInterface";
import {
	ControllerMetadataInterface
} from "./metadatas/controllers/ControllerMetadataInterface";
import {LogMessageType} from "./loggers/enums/LogMessageType";

export class Controller extends AbstractRpgManagerMarkdownRenderChild {
	private isActive = false;
	private data: ResponseDataInterface;
	private models: Array<ModelInterface> = [];

	private currentComponent: ComponentInterface;

	public componentVersion: number|undefined = undefined;

	constructor(
		app: App,
		container: HTMLElement,
		private source: string,
		private component: Component | MarkdownPostProcessorContext,
		private sourcePath: string,
	) {
		super(app, container);

		this.registerEvent(this.app.vault.on('rename', (file: TFile, oldPath: string) => this.onRename(file, oldPath)));

		this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this._render.bind(this)));
		this.registerEvent(this.app.workspace.on("rpgmanager:force-refresh-views", (() => {
			this._render(true);
		}).bind(this)));
	}

	private async onRename(
		file: TFile,
		oldPath: string,
	): Promise<void>{
		if (this.sourcePath === oldPath) this.sourcePath = file.path;
		this._render();
	}

	private _generateModels(
	): void {
		this.models = [];
		try {
			const configurations: ControllerMetadataInterface | any = parseYaml(this.source);

			if (configurations.models.header !== undefined){
				this.models.push(this._generateModel('Header'));
			}


			if (configurations.models.lists !== undefined){
				this.models.push(this._generateModel('List', configurations.models.lists));
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
			this.currentComponent.campaignSettings,
			modelName,
			this.currentComponent,
			this.source,
			this.sourcePath,
			sourceMeta,
		);
	}

	private async _initialise(
	): Promise<boolean> {
		if (this.componentVersion !== undefined && this.currentComponent.version === this.componentVersion) {
			return false;
		}

		this.componentVersion = this.currentComponent.version ?? 0 + 0;

		this._generateModels();

		return true;
	}

	private async waitForComponentToBeReady() {
		const poll = (resolve: any) => {
			if(this.database.isReady && this.currentComponent.version !== undefined) {
				resolve();
			} else {
				setTimeout(_ => poll(resolve), 100);
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

		if (this.currentComponent === undefined){
			const rpgmComponent: ComponentInterface|undefined = this.app.plugins.getPlugin('rpg-manager').database.readByPath<ComponentInterface>(this.sourcePath);
			if (rpgmComponent === undefined) return;
			this.currentComponent = rpgmComponent;
		}

		await this.waitForComponentToBeReady();

		//if (await !this.isComponentVisible()) return;

		if (forceRefresh) this.componentVersion = undefined;

		if (await this._initialise()) {
			this.container.empty();

			for (let modelCounter = 0; modelCounter < this.models.length; modelCounter++) {
				await this.models[modelCounter].generateData()
					.then((data: ResponseDataInterface) => {
						data.elements.forEach((element: ResponseDataElementInterface) => {
							const view: ViewInterface = this.factories.views.create(
								this.currentComponent.campaignSettings,
								element.responseType,
								this.sourcePath,
							);

							view.render(this.container, element);
						});
					});
			}

			this.container.show();
		}
	}

	private async isComponentVisible(
	): Promise<boolean> {
		if (this.currentComponent === undefined) {
			return false;
		}

		if (this.currentComponent.file === undefined) {
			return false;
		}

		await this.app.workspace.iterateAllLeaves((leaf: WorkspaceLeaf) => {
			if (leaf.view instanceof MarkdownView) {
				const file = leaf.view?.file;
				if (file !== undefined){
					if (file.path === this.currentComponent.file.path) return true;
				}
			}
		});

		return false;
	}
}
