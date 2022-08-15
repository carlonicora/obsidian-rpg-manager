import {App, Component, debounce, MarkdownPostProcessorContext, Plugin, PluginSettingTab, Setting} from 'obsidian';

import {Api} from "./api";
import {RpgModelFactory} from "./factories/RpgModelFactory";
import {RpgViewFactory} from "./factories/RpgViewFactory";
import {DataType} from "./io/IoData";

export interface RpgManagerSettings {
	campaignTag: string;
	campaignIdentifier: string;
	adventureTag: string;
	sessionTag: string;
	sceneTag: string;
	npcTag: string;
	pcTag: string;
	locationTag: string;
	factionTag: string;
	eventTag: string;
	clueTag: string;
}

const DEFAULT_SETTINGS: RpgManagerSettings = {
	campaignTag: 'rpgm/outline/campaign',
	campaignIdentifier: 'rpgm/campaign',
	adventureTag: 'rpgm/outline/adventure',
	sessionTag: 'rpgm/outline/session',
	sceneTag: 'rpgm/outline/scene',
	npcTag: 'rpgm/element/character/npc',
	pcTag: 'rpgm/element/character/pc',
	locationTag: 'rpgm/element/location',
	factionTag: 'rpgm/element/faction',
	eventTag: 'rpgm/element/event',
	clueTag: 'rpgm/element/clue',
}

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

		for (const type in DataType) {
			this.addCommand({
				id: "rpg-manager-create-" + type.toLowerCase(),
				name: "Create a new " + type,
				callback: () => {
					this.api.fileFactory.create(DataType[type as keyof typeof DataType]);
				},
			});
		}
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

class RpgManagerSettingTab extends PluginSettingTab {
	plugin: RpgManager;

	constructor(app: App, plugin: RpgManager) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();
		containerEl.createEl('h2', {text: 'Settings for Role Playing Game Manager'});

		new Setting(this.containerEl)
			.setName("Campaign Relationship Tag")
			.setDesc("The tag that identifies the Campaign the current note belongs to")
			.addText(text =>
				text
					.setPlaceholder('rpgm/campaign')
					.setValue(this.plugin.settings.campaignIdentifier)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);

		containerEl.createEl('h3', {text: 'Outlines'});
		containerEl.createEl('span', {text: 'Outline Tags should always be followed by an id and the id of the parent. Example: `#' + this.plugin.settings.sessionTag + '/{session-id}/{adventure-id}`'});

		new Setting(this.containerEl)
			.setName("Campaign Outline Tag")
			.setDesc("The tag identifying a Campaign")
			.addText(text =>
				text
					.setPlaceholder('rpgm/outline/campaign')
					.setValue(this.plugin.settings.campaignTag)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Adventure Outline Tag")
			.setDesc("The tag identifying an Adventure (`#" + this.plugin.settings.adventureTag + "/{adventure-id}`)")
			.addText(text =>
				text
					.setPlaceholder('rpgm/outline/adventure')
					.setValue(this.plugin.settings.adventureTag)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Session Outline Tag")
			.setDesc("The tag identifying a Session (`#" + this.plugin.settings.sessionTag + "/{session-id}/{adventure-id}`)")
			.addText(text =>
				text
					.setPlaceholder('rpgm/outline/session')
					.setValue(this.plugin.settings.sessionTag)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Scenes Outline Tag")
			.setDesc("The tag identifying a Session (`#" + this.plugin.settings.sceneTag + "/{scene-id}/{session-id}`)")
			.addText(text =>
				text
					.setPlaceholder('rpgm/outline/scene')
					.setValue(this.plugin.settings.sceneTag)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);

		containerEl.createEl('h3', {text: 'Elements'});
		containerEl.createEl('span', {text: 'Please Note: Player Characters and Non Player Characters must have the same element prefix (ie: `rpgm/character`).'});

		new Setting(this.containerEl)
			.setName("Player Character Tag")
			.setDesc("The tag identifying a Player Character")
			.addText(text =>
				text
					.setPlaceholder('rpgm/element/character/pc')
					.setValue(this.plugin.settings.pcTag)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Non Player Character Tag")
			.setDesc("The tag identifying a Non Player Character")
			.addText(text =>
				text
					.setPlaceholder('rpgm/element/character/npc')
					.setValue(this.plugin.settings.npcTag)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Location Tag")
			.setDesc("The tag identifying a Location")
			.addText(text =>
				text
					.setPlaceholder('rpgm/element/location')
					.setValue(this.plugin.settings.locationTag)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Faction Tag")
			.setDesc("The tag identifying a Faction")
			.addText(text =>
				text
					.setPlaceholder('rpgm/element/faction')
					.setValue(this.plugin.settings.factionTag)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Event Tag")
			.setDesc("The tag identifying an Event")
			.addText(text =>
				text
					.setPlaceholder('rpgm/element/event')
					.setValue(this.plugin.settings.eventTag)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Clue Tag")
			.setDesc("The tag identifying a Clue")
			.addText(text =>
				text
					.setPlaceholder('rpgm/element/clue')
					.setValue(this.plugin.settings.clueTag)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);
	}
}
