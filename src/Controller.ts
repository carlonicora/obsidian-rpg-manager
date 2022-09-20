import {
	App,
	Component, debounce,
	MarkdownPostProcessorContext,
	MarkdownRenderChild,
	parseYaml, TFile
} from "obsidian";
import {ResponseDataInterface} from "./interfaces/response/ResponseDataInterface";
import {ResponseElementInterface} from "./interfaces/response/ResponseElementInterface";
import {ViewInterface} from "./interfaces/ViewInterface";
import {ModelInterface} from "./interfaces/ModelInterface";
import {Campaign} from "./data/Campaign";
import {RecordInterface} from "./interfaces/database/RecordInterface";
import {AbstractLogMessage, ErrorLog, LogMessageType} from "./helpers/Logger";
import {CampaignSetting} from "./enums/CampaignSetting";

export class Controller extends MarkdownRenderChild {
	private isActive = false;
	private data: ResponseDataInterface;
	private model: ModelInterface;

	private currentElement: RecordInterface;

	constructor(
		protected app: App,
		protected container: HTMLElement,
		private source: string,
		private component: Component | MarkdownPostProcessorContext,
		private sourcePath: string,
	) {
		super(container);
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

		const settings = ((this.currentElement instanceof Campaign) ? this.currentElement.settings : this.currentElement.campaign.settings);
		try {
			this.model = this.app.plugins.getPlugin('rpg-manager').factories.models.create(
				settings,
				modelName,
				this.currentElement,
				this.source,
				this.sourcePath,
				sourceMeta,
			);
		} catch (e) {
			new ErrorLog(LogMessageType.Model, 'Cannot create model ' + CampaignSetting[settings] + modelName)
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
						((this.currentElement instanceof Campaign) ? this.currentElement.settings : this.currentElement.campaign.settings),
						element.responseType,
						this.sourcePath,
					);
					view.render(this.container, element);
				});
			});
	}
}
