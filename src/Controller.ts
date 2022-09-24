import {App, Component, debounce, MarkdownPostProcessorContext, parseYaml, TFile} from "obsidian";
import {ResponseDataInterface} from "./interfaces/response/ResponseDataInterface";
import {ResponseElementInterface} from "./interfaces/response/ResponseElementInterface";
import {ViewInterface} from "./interfaces/ViewInterface";
import {ModelInterface} from "./interfaces/ModelInterface";
import {Campaign} from "./data/Campaign";
import {RecordInterface} from "./interfaces/database/RecordInterface";
import {CampaignSetting} from "./enums/CampaignSetting";
import {ErrorLog, LogMessageType} from "./helpers/Logger";
import {AbstractRpgManagerMarkdownRenderChild} from "./abstracts/AbstractRpgManagerMarkdownRenderChild";
import {CampaignInterface} from "./interfaces/data/CampaignInterface";

export class Controller extends AbstractRpgManagerMarkdownRenderChild {
	private isActive = false;
	private data: ResponseDataInterface;
	private model: ModelInterface;

	private currentElement: RecordInterface;
	private campaignSettings: CampaignSetting;

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
		this.initialise();
		this.render();
	}

	private generateModel(
	): void {
		const sourceLines = this.source.split('\n');
		let modelName = sourceLines[0].toLowerCase();
		modelName = modelName[0].toUpperCase() + modelName.substring(1);
		modelName = modelName.replace('navigation', 'Navigation');

		sourceLines.shift();

		const sourceMeta = parseYaml(sourceLines.join('\n'));

		this.campaignSettings = CampaignSetting.Agnostic;
		if (this.currentElement.campaign !== undefined){
			this.campaignSettings = this.currentElement.campaign.campaignSettings;
		} else if ((<CampaignInterface>this.currentElement).campaignSettings !== undefined) {
			this.campaignSettings = (<CampaignInterface>this.currentElement).campaignSettings;
		}

		try {
			this.model = this.app.plugins.getPlugin('rpg-manager').factories.models.create(
				this.campaignSettings,
				modelName,
				this.currentElement,
				this.source,
				this.sourcePath,
				sourceMeta,
			);
		} catch (e) {
			new ErrorLog(LogMessageType.Model, 'Cannot create model ' + CampaignSetting[this.campaignSettings] + modelName)
		}
	}

	private initialise(
	): void {
		const currentElement:RecordInterface|undefined = this.app.plugins.getPlugin('rpg-manager').database.readByPath<RecordInterface>(this.sourcePath);
		if (currentElement === undefined) return;

		this.render = debounce(this.render, 250, true) as unknown as () => Promise<void>;
		this.currentElement = currentElement;
		this.generateModel();

	}

	onload() {
		this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this.render.bind(this)));
		this.render();
	}

	private async render(
	): Promise<void> {
		if (this.app.plugins.getPlugin('rpg-manager')?.database === undefined) return;

		this.initialise();
		if (this.currentElement === undefined) return;

		this.container.empty();

		this.model.generateData()
			.then((data: ResponseDataInterface) => {
				data.elements.forEach((element: ResponseElementInterface) => {
					const view: ViewInterface = this.app.plugins.getPlugin('rpg-manager').factories.views.create(
						this.campaignSettings,
						element.responseType,
						this.sourcePath,
					);
					view.render(this.container, element);
				});
			});
	}
}
