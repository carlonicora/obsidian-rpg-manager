import {App, Component, debounce, MarkdownPostProcessorContext, parseYaml, TFile} from "obsidian";
import {ResponseDataInterface} from "./interfaces/response/ResponseDataInterface";
import {ResponseDataElementInterface} from "./interfaces/response/ResponseDataElementInterface";
import {ViewInterface} from "./interfaces/ViewInterface";
import {ModelInterface} from "./interfaces/ModelInterface";
import {CampaignSetting} from "./enums/CampaignSetting";
import {AbstractRpgManagerMarkdownRenderChild} from "./abstracts/AbstractRpgManagerMarkdownRenderChild";
import {ComponentInterface} from "./database/interfaces/ComponentInterface";
import {CampaignInterface} from "./database/components/interfaces/CampaignInterface";
import {
	ControllerMetadataInterface
} from "./database/interfaces/metadata/ControllerMetadataInterface";

export class Controller extends AbstractRpgManagerMarkdownRenderChild {
	private isActive = false;
	private data: ResponseDataInterface;
	private models: Array<ModelInterface> = [];

	private currentElement: ComponentInterface;
	private campaignSettings: CampaignSetting;

	private componentVersion: number|undefined = undefined;

	constructor(
		app: App,
		container: HTMLElement,
		private source: string,
		private component: Component | MarkdownPostProcessorContext,
		private sourcePath: string,
	) {
		super(app, container);
		this.registerEvent(this.app.vault.on('rename', (file: TFile, oldPath: string) => this.onRename(file, oldPath)));
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
		if (this.campaignSettings === undefined) {
			this.campaignSettings = CampaignSetting.Agnostic;
			if (this.currentElement.campaign !== undefined) {
				this.campaignSettings = this.currentElement.campaign.campaignSettings;
			} else if ((<CampaignInterface>this.currentElement).campaignSettings !== undefined) {
				this.campaignSettings = (<CampaignInterface>this.currentElement).campaignSettings;
			}
		}

		try {
			const configurations: ControllerMetadataInterface | any = parseYaml(this.source);

			if (configurations.models.header !== undefined){
				this.models.push(this._generateModel('Header'));
			}


			if (configurations.models.lists !== undefined){
				this.models.push(this._generateModel('List', configurations.models.lists));
				// Object.keys(configurations.models.lists).filter((v) => isNaN(Number(v))).forEach((name: string) => {

					// if (configurations.models.lists === undefined) return;
					// const list: ControllerMetadataModelElementInterface | undefined = configurations.models.lists[name as keyof ControllerMetadataModelListsInterface];
					//if (list === undefined) return;

					//this.models.push(this._generateModel(name, list.relationship));
				// });
			}
		} catch (e) {
			//No need to throw an exception... possibly saving before the data is ready
		}
	}

	private _generateModel(
		modelName: string,
		sourceMeta: any|undefined = undefined,
	): ModelInterface {
		if (this.campaignSettings === undefined) this._initialiseCampaignSettings();

		if (this.campaignSettings === undefined) throw new Error('');

		return this.factories.models.create(
			this.campaignSettings,
			modelName,
			this.currentElement,
			this.source,
			this.sourcePath,
			sourceMeta,
		);
	}

	private _initialiseCampaignSettings(
	): void {
		this.campaignSettings = CampaignSetting.Agnostic;
		if (this.currentElement.campaign !== undefined){
			this.campaignSettings = this.currentElement.campaign.campaignSettings;
		} else if ((<CampaignInterface>this.currentElement).campaignSettings !== undefined) {
			this.campaignSettings = (<CampaignInterface>this.currentElement).campaignSettings;
		}
	}

	private _initialise(
	): boolean {
		const currentElement:ComponentInterface|undefined = this.app.plugins.getPlugin('rpg-manager').database.readByPath<ComponentInterface>(this.sourcePath);
		if (currentElement === undefined) return false;

		if (currentElement.version === undefined) {
			setTimeout(this._render.bind(this), 100);
			return false;
		}

		if (this.componentVersion !== undefined && currentElement.version === this.componentVersion) return false;

		this.componentVersion = currentElement.version;

		this._render = debounce(this._render, 250, true) as unknown as () => Promise<void>;
		this.currentElement = currentElement;

		this._generateModels();

		return true;
	}

	onload() {
		this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this._render.bind(this)));
		this.registerEvent(this.app.workspace.on("rpgmanager:force-refresh-views", (() => {
			this._render(true);
		}).bind(this)));
		this._render();
	}

	private async _render(
		forceRefresh=false,
	): Promise<void> {
		if (this.database === undefined) return;

		if (forceRefresh) this.componentVersion = undefined;

		if (await this._initialise()) {
			this.container.empty();

			for (let modelCounter=0; modelCounter<this.models.length; modelCounter++){
				this.models[modelCounter].generateData()
					.then((data: ResponseDataInterface) => {
						data.elements.forEach((element: ResponseDataElementInterface) => {
							const view: ViewInterface = this.factories.views.create(
								this.campaignSettings,
								element.responseType,
								this.sourcePath,
							);
							view.render(this.container, element);
						});
					});
			}
		}
	}
}
