import {Component, debounce, MarkdownPostProcessorContext, Plugin} from 'obsidian';
import {Api} from "./Api";
import {DEFAULT_SETTINGS, RpgManagerSettings, RpgManagerSettingTab} from "./Settings";
import {DataType} from "./enums/DataType";
import {Controller} from "./Controller";

export default class RpgManager extends Plugin {
	settings: RpgManagerSettings;

	private api: Api;

	async onload() {
		console.log('Loading RpgManager ' + this.manifest.version);

		this.refreshViews = debounce(this.refreshViews, 500, true) as unknown as () => Promise<void>

		await this.loadSettings();
		this.addSettingTab(new RpgManagerSettingTab(this.app, this));

		this.api = new Api(this.app, this.settings);

		this.registerEvents();
		this.registerCodeBlock();
		this.registerCommands();
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
		component.addChild(
			new Controller(
				this.api,
				el,
				source,
				component,
				sourcePath,
			)
		);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private registerEvents(
	) : void {
		this.registerEvent(this.app.metadataCache.on('resolved', (function(){
			this.refreshViews();
		}).bind(this)));

		this.registerEvent(this.app.vault.on('modify', (function(){
			this.refreshViews();
		}).bind(this)));
	}

	private registerCodeBlock(
	): void {
		this.registerMarkdownCodeBlockProcessor('RpgManager', async (source: string, el, ctx) =>
			this.createRpgView(source, el, ctx, ctx.sourcePath)
		);
	}

	private registerCommands(
	): void {
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
}
