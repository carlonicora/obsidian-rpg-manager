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
import {SingleViewKey} from "./factories/ViewFactory";
import {ResponseType} from "./enums/ResponseType";
import {SingleModelKey} from "./factories/ModelFactory";
import {CampaignSetting} from "./enums/CampaignSetting";
import {RpgElementDataInterface} from "./interfaces/data/RpgElementDataInterface";
import {RpgOutlineDataInterface} from "./interfaces/data/RpgOutlineDataInterface";
import {Campaign} from "./settings/Agnostic/data/Campaign";

export class RpgController extends MarkdownRenderChild {
	private isActive = false;
	private data: ResponseDataInterface;
	private model: ModelInterface;
	private contentEl: HTMLElement;

	private currentElement: RpgElementDataInterface|RpgOutlineDataInterface;

	constructor(
		protected app: App,
		protected container: HTMLElement,
		private source: string,
		private component: Component | MarkdownPostProcessorContext,
		private sourcePath: string,
	) {
		super(container);
	}

	private initialise(
	): void {
		const currentElement = this.app.plugins.getPlugin('rpg-manager').io.getElementByObsidianId(this.sourcePath);
		if (currentElement == null){
			this.isActive = false;
		} else {
			this.isActive = true;
			this.currentElement = currentElement;

			const sourceLines = this.source.split('\n');
			let modelName = sourceLines[0].toLowerCase();
			modelName = modelName[0].toUpperCase() + modelName.substring(1);
			modelName = modelName.replace('navigation', 'Navigation');

			sourceLines.shift();

			const sourceMeta = parseYaml(sourceLines.join('\n'));

			let campaignSettings: string;
			if (this.currentElement instanceof Campaign){
				campaignSettings = CampaignSetting[this.currentElement.settings]
			} else {
				campaignSettings = CampaignSetting[this.currentElement.campaign.settings]
			}

			this.model = this.app.plugins.getPlugin('rpg-manager').factories.models.create(
				campaignSettings + modelName as SingleModelKey<any>,
				this.currentElement,
				this.source,
				this.sourcePath,
				this.contentEl,
				sourceMeta,
			);
		}
	}

	onload() {
		this.render = debounce(this.render, 100, true) as unknown as () => Promise<void>;
		this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this.render.bind(this)));
		this.render();
	}

	private async render(){
		const activeLeaf = this.app.workspace.getActiveViewOfType(MarkdownView);

		if (activeLeaf != null && activeLeaf.file.path === this.sourcePath) {
			this.contentEl = activeLeaf.contentEl;
			this.initialise();

			if (this.isActive) {
				this.container.empty();

				let campaignSettings: string;
				if (this.currentElement instanceof Campaign){
					campaignSettings = CampaignSetting[this.currentElement.settings]
				} else {
					campaignSettings = CampaignSetting[this.currentElement.campaign.settings]
				}

				this.model.generateData().elements.forEach((element: ResponseElementInterface) => {
					const view: ViewInterface = this.app.plugins.getPlugin('rpg-manager').factories.views.create(
						campaignSettings + ResponseType[element.responseType] as SingleViewKey<any>,
						this.sourcePath,
					);

					view.render(this.container, element);
				});
			}
		}
	}
}
