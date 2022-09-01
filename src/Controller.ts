import {Api} from "./Api";
import {Component, debounce, MarkdownPostProcessorContext, MarkdownRenderChild, MarkdownView} from "obsidian";
import {ResponseDataInterface} from "./interfaces/response/ResponseDataInterface";
import {DataType} from "./enums/DataType";
import {CampaignData} from "./settings/Agnostic/data";
import {ResponseElementInterface} from "./interfaces/response/ResponseElementInterface";
import {ViewInterface} from "./interfaces/ViewInterface";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {CampaignDataInterface} from "./interfaces/data/CampaignDataInterface";
import {ModelInterface} from "./interfaces/ModelInterface";
import {Factory} from "./Factory";

export class Controller extends MarkdownRenderChild {
	private isActive = true;
	private dv: DataviewInlineApi;
	private campaign: CampaignDataInterface;
	private current: Record<string, any>;
	private data: ResponseDataInterface;
	private model: ModelInterface;

	constructor(
		protected api: Api,
		protected container: HTMLElement,
		private source: string,
		private component: Component | MarkdownPostProcessorContext,
		private sourcePath: string,
	) {
		super(container);
		this.render = debounce(this.render, 500, true) as unknown as () => Promise<void>

		//@ts-ignore
		this.dv = this.api.app.plugins.plugins.dataview.localApi(this.sourcePath, this.component, this.container);

		const current = this.dv.current();
		if (current == null){
			Factory.createError('Current is null');
			this.isActive = false;
		} else {
			this.current = current;
			this.loadCampaign();
			this.model = Factory.createModel(
				this.api,
				this.campaign,
				this.dv,
				this.current,
				this.source,
			);
		}
	}

	onload() {
		if (this.isActive) {
			this.render();
			this.registerEvent(this.api.app.workspace.on("rpgmanager:refresh-views", this.render));
		}
	}

	private loadCampaign(
	): void {
		const campaignId = this.api.getTagId(this.current.tags, DataType.Campaign);
		const campaigns = this.dv.pages('#' + this.api.settings.campaignTag + '/' + campaignId);

		if (campaigns.length !== 1) {
			throw new Error('Campaign Missing');
		}

		this.campaign = new CampaignData(
			this.api,
			campaigns[0],
		);
	}

	private async render(){
		const activeLeaf = this.api.app.workspace.getActiveViewOfType(MarkdownView);
		if (activeLeaf != null && activeLeaf.file.path === this.sourcePath) {
			this.container.empty();

			this.model.generateData().elements.forEach((element: ResponseElementInterface) => {
				const view: ViewInterface = Factory.createView(this.campaign, element.responseType, this.sourcePath);
				/*
				let view: ViewInterface;
				switch (element.responseType) {
					case ResponseType.String:
						view = new TableView(this.dv.currentFilePath);
						break;
					case ResponseType.Table:
						view = new TableView(this.dv.currentFilePath);
						break;
				}
				*/

				view.render(this.container, element);
			});
		}
	}
}
