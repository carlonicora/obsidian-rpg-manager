import {
	App,
	Component,
	MarkdownPostProcessorContext,
	MarkdownRenderChild,
	parseYaml
} from "obsidian";
import {ResponseDataInterface} from "./interfaces/response/ResponseDataInterface";
import {ResponseElementInterface} from "./interfaces/response/ResponseElementInterface";
import {ViewInterface} from "./interfaces/ViewInterface";
import {ModelInterface} from "./interfaces/ModelInterface";
import {RpgElementDataInterface} from "./interfaces/data/RpgElementDataInterface";
import {RpgOutlineDataInterface} from "./interfaces/data/RpgOutlineDataInterface";
import {Campaign} from "./data/Campaign";

export class RpgController extends MarkdownRenderChild {
	private isActive = false;
	private data: ResponseDataInterface;
	private model: ModelInterface;

	private rendering = false;

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
		const currentElement = this.app.plugins.getPlugin('rpg-manager').io.getElementByPath(this.sourcePath);
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

			this.model = this.app.plugins.getPlugin('rpg-manager').factories.models.create(
				((this.currentElement instanceof Campaign) ? this.currentElement.settings : this.currentElement.campaign.settings),
				modelName,
				this.currentElement,
				this.source,
				this.sourcePath,
				sourceMeta,
			);
		}
	}

	onload() {
		//this.render = debounce(this.render, 100, true) as unknown as () => Promise<void>;
		this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this.render.bind(this)));
		this.render();
	}

	private async render(){
		if (!this.rendering) {
			//const activeLeaf = this.app.workspace.getActiveViewOfType(MarkdownView);
			//if (activeLeaf != null && activeLeaf.file.path === this.sourcePath) {
			this.initialise();

			if (this.isActive) {
				this.rendering = true;
				this.container.empty();

				this.model.generateData()
					.then((data: ResponseDataInterface) => {
						data.elements.forEach((element: ResponseElementInterface) => {
							const view: ViewInterface = this.app.plugins.getPlugin('rpg-manager').factories.views.create(
								((this.currentElement instanceof Campaign) ? this.currentElement.settings : this.currentElement.campaign.settings),
								element.responseType,
								this.sourcePath,
							);
							view.render(this.container, element);
						});
						this.rendering = false;
					});
			}
		}
		//}
	}
}
