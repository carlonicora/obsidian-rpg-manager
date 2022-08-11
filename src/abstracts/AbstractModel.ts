import {App, Component, MarkdownPostProcessorContext, MarkdownRenderChild} from "obsidian";
import {RpgFunctions} from "../data/functions/RpgFunctions";
import {RpgMetadataValidator} from "../data/validators/RpgMetadataValidator";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {ImageData} from "../data/ImageData";
import {RpgViewFactory, viewType} from "../factories/RpgViewFactory";
import {SynopsisData} from "../data/SynopsisData";
import {CampaignData, CampaignDataInterface} from "../data/CampaignData";
import {GenericDataListInterface} from "../interfaces/DataInterfaces";
import {IoData} from "../io/IoData";

export abstract class AbstractModel extends MarkdownRenderChild {
	protected dv: DataviewInlineApi;
	protected campaign: CampaignDataInterface|null;
	protected current: Record<string, any>;
	protected io: IoData;

	constructor(
		protected functions: RpgFunctions,
		protected app: App,
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
			//@ts-ignore
			this.dv = this.app.plugins.plugins.dataview.localApi(this.sourcePath, this.component, this.container);

			const current = this.dv.current();
			if (current != null){
				this.current = current;
			} else {
				return;
			}

			if (RpgMetadataValidator.validate(this.app, this.current)){
				const campaigns = this.dv.pages("#campaign and " + `-"Templates"`);
				if (campaigns !== undefined && campaigns.length === 1){
					this.campaign = new CampaignData(
						this.functions,
						campaigns[0],
					);
				} else {
					this.campaign = null;
				}

				this.io = new IoData(this.functions, this.campaign, this.dv);

				this.container.innerHTML = '';

				this.render();
			}
		}, wait);
	}

	onload() {
		this.renderComponent(0);
		this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this.redrawContainer));
	}

	redrawContainer = () => {
		if (this.isActivePage()) {
			this.renderComponent();
		}
	};

	private isActivePage(): boolean {
		const views = this.app.workspace.getLayout().main.children;

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

	protected writeData(
		data: GenericDataListInterface,
		typeOfView: viewType,
	): void {
		if (data.elements.length > 0) {
			const view = RpgViewFactory.createList(typeOfView, this.dv);
			view.render(data);
		}
	}

	protected image(
		width = 75,
		height = 75,
	){
		const current = this.dv.current();
		if (current !== undefined) {

			const data = new ImageData(
				this.functions,
				current,
				width,
				height,
			)

			const view = RpgViewFactory.createSingle(viewType.Image, this.dv);
			view.render(data);
		}
	}

	protected synopsis(
		title: string|null = null,
	){
		const current = this.dv.current();

		if (current !== undefined) {

			const data = new SynopsisData(
				this.functions,
				current,
				title
			)

			const view = RpgViewFactory.createSingle(viewType.Synopsis, this.dv);
			view.render(data);
		}
	}
}
