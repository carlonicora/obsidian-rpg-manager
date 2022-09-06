import {
	App,
	Component,
	MarkdownPostProcessorContext,
	MarkdownRenderChild,
	MarkdownView,
	debounce,
	parseYaml
} from "obsidian";
import {ResponseDataInterface} from "./interfaces/response/ResponseDataInterface";
import {ResponseElementInterface} from "./interfaces/response/ResponseElementInterface";
import {ViewInterface} from "./interfaces/ViewInterface";
import {ModelInterface} from "./interfaces/ModelInterface";
import {SingleViewKey, ViewFactory} from "./factories/ViewFactory";
import {ResponseType} from "./enums/ResponseType";
import {ModelFactory, SingleModelKey} from "./factories/ModelFactory";
import {CampaignSetting} from "./enums/CampaignSetting";
import {RpgData, RpgDataInterface} from "./Data";

export class Controller extends MarkdownRenderChild {
	private isActive = false;
	//private dv: DataviewInlineApi;
	//private campaign: CampaignDataInterface;
	private current: Record<string, any>;
	private data: ResponseDataInterface;
	private model: ModelInterface;
	private contentEl: HTMLElement;

	private currentElement: RpgDataInterface;

	constructor(
		protected app: App,
		protected container: HTMLElement,
		private source: string,
		private component: Component | MarkdownPostProcessorContext,
		private sourcePath: string,
	) {
		super(container);

		//this.dv = (<any>this.app.plugins.plugins.dataview).localApi(this.sourcePath, this.component, this.container);
	}

	private initialise(
	): void {
		const currentElement = RpgData.index?.getElementByObsidianId(this.sourcePath);
		//const current = this.dv.current();
		//if (current == null){
		if (currentElement == null){
			this.isActive = false;
		} else {
			this.isActive = true;
			//this.current = current;
			this.currentElement = currentElement;
			//this.loadCampaign();

			const sourceLines = this.source.split('\n');
			let modelName = sourceLines[0].toLowerCase();
			modelName = modelName[0].toUpperCase() + modelName.substring(1);
			modelName = modelName.replace('navigation', 'Navigation');
			//const modelIdentifier:SingleModelKey<any> = CampaignSetting[this.campaign.settings] + modelName;
			const modelIdentifier:SingleModelKey<any> = CampaignSetting[this.currentElement.campaign.settings] + modelName;

			sourceLines.shift();

			const sourceMeta = parseYaml(sourceLines.join('\n'));

			this.model = ModelFactory.create(
				modelIdentifier,
				this.app,
				//this.campaign,
				//this.current,
				//this.dv,
				this.currentElement,
				this.source,
				this.sourcePath,
				this.contentEl,
				sourceMeta,
			);
		}
	}

	onload() {
		this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this.render.bind(this)));
		this.render();
	}

	/*
	private loadCampaign(
	): void {
		const campaignId = RpgFunctions.getTagId(this.current.tags, DataType.Campaign);
		const campaigns = this.dv.pages('#' + RpgFunctions.settings.campaignTag + '/' + campaignId);

		if (campaigns.length !== 1) {
			throw new Error('Campaign Missing');
		}

		this.campaign = new CampaignData(
			campaigns[0],
		);
	}
	*/

	private async render(){
		const activeLeaf = this.app.workspace.getActiveViewOfType(MarkdownView);

		if (activeLeaf != null && activeLeaf.file.path === this.sourcePath) {
			this.contentEl = activeLeaf.contentEl;
			this.initialise();

			if (this.isActive) {
				this.render = debounce(this.render, 1000, true) as unknown as () => Promise<void>

				this.container.empty();

				this.model.generateData().elements.forEach((element: ResponseElementInterface) => {
					//const viewName: SingleViewKey<any> = CampaignSetting[this.campaign.settings] + ResponseType[element.responseType];
					const viewName: SingleViewKey<any> = CampaignSetting[this.currentElement.campaign.settings] + ResponseType[element.responseType];

					const view: ViewInterface = ViewFactory.create(viewName, this.sourcePath);

					view.render(this.container, element);
				});
			}
		}
	}
}