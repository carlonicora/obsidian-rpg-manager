import {
	Component,
	debounce,
	MarkdownPostProcessorContext,
	Plugin,
} from 'obsidian';

import {Api} from "./api";
import {RpgModelFactory} from "./factories/RpgModelFactory";
import {RpgViewFactory} from "./factories/RpgViewFactory";
import {DataType} from "./io/IoData";
import {DEFAULT_SETTINGS, RpgManagerSettings, RpgManagerSettingTab} from "./Settings";

export default class RpgManager extends Plugin {
	settings: RpgManagerSettings;

	private api: Api;

	async onload() {
		await this.loadSettings();
		console.log('Loading RpgManager ' + this.manifest.version);

		this.addSettingTab(new RpgManagerSettingTab(this.app, this));

		this.api = new Api(this.app, this.settings);

		RpgViewFactory.initialise(
			this.api,
		);

		RpgModelFactory.initialise(
			this.api,
		)

		this.refreshViews = debounce(this.refreshViews, 2500, true) as unknown as () => Promise<void>

		this.registerEvent(this.app.metadataCache.on('resolved', (function(){
			this.refreshViews();
		}).bind(this)));

		this.registerEvent(this.app.vault.on('modify', (function(){
			this.refreshViews();
		}).bind(this)));

		this.registerPriorityCodeblockPostProcessor("RpgManager", -100, async (source: string, el, ctx) =>
			this.createRpgView(source, el, ctx, ctx.sourcePath)
		);

		Object.keys(DataType).filter((v) => isNaN(Number(v))).forEach((type, index) => {
			this.addCommand({
				id: "rpg-manager-create-" + type.toLowerCase(),
				name: "Create a new " + type,
				callback: () => {
					this.api.fileFactory.initialise(DataType[type as keyof typeof DataType]);
				},
			});
			this.addCommand({
				id: "rpg-manager-fill-" + type.toLowerCase(),
				name: "Fill with " + type,
				callback: () => {
					this.api.fileFactory.initialise(DataType[type as keyof typeof DataType], false);
				},
			});
		})
	}

	async onunload() {
		super.onunload();

		this.app.workspace.off('resolved', this.refreshViews);
		this.app.workspace.off('modify', this.refreshViews);
	}

	refreshViews(){
		this.app.workspace.trigger("rpgmanager:refresh-views");
	}

	public async createRpgView(
		source: string,
		el: HTMLElement,
		component: Component | MarkdownPostProcessorContext,
		sourcePath: string
	) {
		//@ts-ignore
		this.app.plugins.plugins.dataview.api.index.touch();

		component.addChild(RpgModelFactory.create(el, source, component, sourcePath));
	}

	/** Register a markdown codeblock post processor with the given priority. */
	public registerPriorityCodeblockPostProcessor(
		language: string,
		priority: number,
		processor: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => Promise<void>
	) {
		const registered = this.registerMarkdownCodeBlockProcessor(language, processor);
		registered.sortOrder = priority;
	}

	/** Register a markdown post processor with the given priority. */
	public registerPriorityMarkdownPostProcessor(
		priority: number,
		processor: (el: HTMLElement, ctx: MarkdownPostProcessorContext) => Promise<void>
	) {
		const registered = this.registerMarkdownPostProcessor(processor);
		registered.sortOrder = priority;
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);

		RpgModelFactory.initialise(
			this.api,
		)
	}
}
