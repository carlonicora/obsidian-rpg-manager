import {App, Component, debounce, MarkdownPostProcessorContext, MarkdownRenderChild, MarkdownView} from "obsidian";
import {ResponseDataInterface} from "./interfaces/response/ResponseDataInterface";
import {DataType} from "./enums/DataType";
import {CampaignData} from "./settings/Agnostic/data";
import {ResponseElementInterface} from "./interfaces/response/ResponseElementInterface";
import {ViewInterface} from "./interfaces/ViewInterface";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {CampaignDataInterface} from "./interfaces/data/CampaignDataInterface";
import {ModelInterface} from "./interfaces/ModelInterface";
import {RpgFunctions} from "./RpgFunctions";
import {SingleViewKey, ViewFactory} from "./factories/ViewFactory";
import {ResponseType} from "./enums/ResponseType";
import {ModelFactory, SingleModelKey} from "./factories/ModelFactory";
import {ErrorFactory} from "./factories/ErrorFactory";

export class Controller extends MarkdownRenderChild {
	private isActive = true;
	private dv: DataviewInlineApi;
	private campaign: CampaignDataInterface;
	private current: Record<string, any>;
	private data: ResponseDataInterface;
	private model: ModelInterface;

	constructor(
		protected app: App,
		protected container: HTMLElement,
		private source: string,
		private component: Component | MarkdownPostProcessorContext,
		private sourcePath: string,
	) {
		super(container);
		this.render = debounce(this.render, 500, true) as unknown as () => Promise<void>

		this.dv = (<any>this.app.plugins.plugins.dataview).localApi(this.sourcePath, this.component, this.container);

		const current = this.dv.current();
		if (current == null){
			ErrorFactory.create('Current is null');
			this.isActive = false;
		} else {
			this.current = current;
			this.loadCampaign();

			const modelName:SingleModelKey<any> = this.campaign.settings + this.source;
			this.model = ModelFactory.create(
				modelName,
				this.app,
				this.campaign,
				this.current,
				this.dv,
				this.source,
			);
		}
	}

	onload() {
		if (this.isActive) {
			this.render();
			this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this.render));
		}
	}

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

	private async render(){
		const activeLeaf = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (activeLeaf != null && activeLeaf.file.path === this.sourcePath) {
			this.container.empty();

			this.model.generateData().elements.forEach((element: ResponseElementInterface) => {
				const viewName:SingleViewKey<any> = this.campaign.settings + ResponseType[element.responseType];
				const view: ViewInterface = ViewFactory.create(viewName, this.sourcePath);

				view.render(this.container, element);
			});
		}
	}
}
