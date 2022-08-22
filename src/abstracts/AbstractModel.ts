import {Component, MarkdownPostProcessorContext, MarkdownRenderChild} from "obsidian";
import {Api} from "../api";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {RpgViewFactory, viewType} from "../factories/RpgViewFactory";
import {CampaignData, CampaignDataInterface} from "../data/CampaignData";
import {GenericDataInterface, GenericDataListInterface} from "../interfaces/DataInterfaces";
import {DataType, IoData} from "../io/IoData";

export abstract class AbstractModel extends MarkdownRenderChild {
	protected dv: DataviewInlineApi;
	protected campaign: CampaignDataInterface;
	protected current: Record<string, any>;
	protected io: IoData;

	constructor(
		protected api: Api,
		protected container: HTMLElement,
		private source: string,
		private component: Component | MarkdownPostProcessorContext,
		private sourcePath: string,
	) {
		super(container);
	}

	abstract render(): Promise<void>;

	private async renderComponent(wait = 500){
		setTimeout(() => {
			let continueRendering = true;
			//@ts-ignore
			this.dv = this.api.app.plugins.plugins.dataview.localApi(this.sourcePath, this.component, this.container);

			const current = this.dv.current();
			if (current != null){
				this.current = current;
			} else {
				continueRendering = false;
			}

			if (continueRendering) {
				try {
					const campaignId = this.api.getTagId(this.current.tags, DataType.Campaign);
					const campaigns = this.dv.pages('#' + this.api.settings.campaignTag + '/' + campaignId);

					if (campaigns.length !== 1) {
						continueRendering = false;
					}

					if (continueRendering) {
						this.campaign = new CampaignData(
							this.api,
							campaigns[0],
						);
					}
				} catch (e) {
					continueRendering = false;
				}
			}

			if (continueRendering) {
				this.io = new IoData(this.api, this.campaign, this.dv, this.current);
				this.container.empty();

				this.render();
			}
		}, wait);
	}

	onload() {
		this.renderComponent(0);
		this.registerEvent(this.api.app.workspace.on("rpgmanager:refresh-views", this.redrawContainer));
	}

	redrawContainer = () => {
		if (this.isActivePage()) {
			this.renderComponent();
		}
	};

	private isActivePage(): boolean {
		const views = this.api.app.workspace.getLayout().main.children;

		for (let viewCounter = 0; viewCounter < views.length; viewCounter++){
			if (
				views[viewCounter].state?.state?.file !== undefined &&
				views[viewCounter].state?.state?.file === this.sourcePath
			){
				return true;
			}
		}

		return false;
	}

	protected writeList(
		data: GenericDataListInterface,
		typeOfView: viewType,
		title: string|null = null,
	): void {
		if (data.elements.length > 0) {
			const view = RpgViewFactory.createList(typeOfView, this.dv);
			view.render(data, title);
		}
	}

	protected writeData(
		data: GenericDataInterface,
		typeOfView: viewType,
	): void {
		const view = RpgViewFactory.createSingle(typeOfView, this.dv);
		view.render(data);
	}

	protected image(
		width = 75,
		height = 75,
	){
		this.writeData(
			this.io.getImage(width, height),
			viewType.Image,
		)
	}

	protected synopsis(
		title: string|null = null,
	){
		this.writeData(
			this.io.getSynopsis(title),
			viewType.Synopsis,
		)
	}
}
