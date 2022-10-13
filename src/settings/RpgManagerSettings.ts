import {App, Plugin_2, PluginSettingTab, TAbstractFile, TFolder} from "obsidian";
import {SettingsUpdater} from "./SettingsUpdater";
import {RpgManagerInterface} from "../interfaces/RpgManagerInterface";
import {SettingsFactory} from "./factories/SettingsFactory";
import {
	RpgManagerAdvancedSettingsInterface,
	RpgManagerAdvancedSettingsListsInterface, RpgManagerDefaultSettings,
	RpgManagerSettingsInterface
} from "./RpgManagerSettingsInterface";
import {SettingType} from "../databases/enums/SettingType";
import {SettingInterface} from "./interfaces/SettingsInterface";
import {tableFieldName} from "../views/enums/TableField";

export class RpgManagerSettings extends PluginSettingTab {
	private plugin: RpgManagerInterface;
	private settingsFactory: SettingsFactory;
	private settingsUpdater: SettingsUpdater;
	private map: Map<SettingType, SettingInterface>;
	public containerEl: HTMLElement;
	private templateFolderMap: Map<string, string>;

	private advancedSettingsDescription: Map<string, {title: string, description: string}> = new Map<string, {title: string, description: string}>();

	constructor(
		app: App,
	) {
		super(
			app,
			(<unknown>app.plugins.getPlugin('rpg-manager')) as Plugin_2,
		);

		this.plugin = app.plugins.getPlugin('rpg-manager');

		const {containerEl} = this;
		this.containerEl = containerEl;

		this.map = new Map();
		this.map.set(SettingType.YouTubeApiKey, {title: 'YouTube API Key', value: this.plugin.settings.YouTubeKey, placeholder: 'Your YouTube API Key'});
		this.map.set(SettingType.automaticMove, {title: 'Automatically organise elements in folders', value: this.plugin.settings.automaticMove, placeholder: 'Organise new elements'});
		this.map.set(SettingType.templateFolder, {title: 'Template folder', value: this.plugin.settings.templateFolder, placeholder: 'Template Folder'});
		this.map.set(SettingType.usePlotStructures, {title: 'Abt/Story Circle plot structure', value: this.plugin.settings.usePlotStructures, placeholder: ''});
		this.map.set(SettingType.useSceneAnalyser, {title: 'Scene Analyser', value: this.plugin.settings.useSceneAnalyser, placeholder: ''});

		this.advancedSettingsDescription.set('ActList', {title: 'Act List', description: 'Select which fields you would like to see when displaying a list of Acts'});
		this.advancedSettingsDescription.set('AdventureList', {title: 'Adventure List', description: 'Select which fields you would like to see when displaying a list of Adventures'});
		this.advancedSettingsDescription.set('CharacterList', {title: 'Player Character List', description: 'Select which fields you would like to see when displaying a list of Player characters'});
		this.advancedSettingsDescription.set('ClueList', {title: 'Clue List', description: 'Select which fields you would like to see when displaying a list of Clues'});
		this.advancedSettingsDescription.set('EventList', {title: 'Event List', description: 'Select which fields you would like to see when displaying a list of Events'});
		this.advancedSettingsDescription.set('FactionList', {title: 'Faction List', description: 'Select which fields you would like to see when displaying a list of Factions'});
		this.advancedSettingsDescription.set('LocationList', {title: 'Location List', description: 'Select which fields you would like to see when displaying a list of Locations'});
		this.advancedSettingsDescription.set('MusicList', {title: 'Music List', description: 'Select which fields you would like to see when displaying a list of Musics'});
		this.advancedSettingsDescription.set('NonPlayerCharacterList', {title: 'Non Player Character List', description: 'Select which fields you would like to see when displaying a list of Non Player Characters'});
		this.advancedSettingsDescription.set('SceneList', {title: 'Scene List', description: 'Select which fields you would like to see when displaying a list of Scenes'});
		this.advancedSettingsDescription.set('SessionList', {title: 'Session List', description: 'Select which fields you would like to see when displaying a list of Sessions'});
		this.advancedSettingsDescription.set('SubplotList', {title: 'Subplot List', description: 'Select which fields you would like to see when displaying a list of Subplots'});

		this.settingsUpdater = new SettingsUpdater(this.app);
		this.settingsFactory = new SettingsFactory(this.app, this.plugin, this.map, this.containerEl);
	}

	display(): void {
		this.containerEl.empty();

		this.createTemplateFolderMap();

		this.settingsFactory.createHeader('CampaignSetting for Role Playing Game Manager');

		this.loadTemplatesSettings();
		this.loadExternalServicesSettings();
		this.loadAdvancedSettings();
	}

	private loadExternalServicesSettings(
	): void {
		this.settingsFactory.createHeader('External Services', 3);
		this.settingsFactory.createWarning(`Configurations are saved in a file in your vault. If you share your vault, you share your key!`);

		this.settingsFactory.createTextSetting(
			SettingType.YouTubeApiKey,
			`Used to access YouTube-specific information`,
		);
	}

	private loadTemplatesSettings(
	): void {
		this.settingsFactory.createHeader('Component creations', 3, 'Manage how new subModels are created');

		this.settingsFactory.createDropdownSetting(
			SettingType.templateFolder,
			`Select the folder in which you keep the templates for RPG Manager.`,
			this.templateFolderMap,
		)

		this.settingsFactory.createToggleSetting(
			SettingType.automaticMove,
			`Keeps your structure organised by creating subfolders for your Outlines and Elements`,
		);

		this.settingsFactory.createToggleSetting(
			SettingType.usePlotStructures,
			`Use ABT/Story Circle plot structures`,
		);

		this.settingsFactory.createToggleSetting(
			SettingType.useSceneAnalyser,
			`Analyses the scenes inside acts or sessions to provide running time estimations and act or session balance`,
		);
	}

	private createTemplateFolderMap(
		parent: TFolder|undefined=undefined,
	): void {
		let folderList: TAbstractFile[] = [];
		if (parent != undefined) {
			folderList = parent.children.filter((file: TAbstractFile) => file instanceof TFolder);
		} else {
			this.templateFolderMap = new Map();
			folderList = this.app.vault.getRoot().children.filter((file: TAbstractFile) => file instanceof TFolder);
		}

		folderList.forEach((folder: TFolder) => {
			this.templateFolderMap.set(folder.path, folder.path);
			this.createTemplateFolderMap(folder);
		});
	}

	private loadAdvancedSettings(
	): void {
		this.settingsFactory.createHeader('Lists', 3);

		Object.keys(this.plugin.settings.advanced.Agnostic).forEach((name: string, index: number) => {
			const advancedSetting = this.plugin.settings.advanced.Agnostic[name as keyof RpgManagerAdvancedSettingsInterface];
			this.addSettingsItem(name, advancedSetting);
		});
	}

	private addSettingsItem(
		type: string,
		settings: RpgManagerAdvancedSettingsListsInterface,
	): void {
		const settingItemEl: HTMLDivElement = this.containerEl.createDiv({cls: 'setting-item'});

		const settingItemInfoEl: HTMLDivElement = settingItemEl.createDiv({cls: 'setting-item-info'});
		settingItemInfoEl.createDiv({cls: 'setting-item-name', text: this.advancedSettingsDescription.get(type)?.title ?? ''});
		settingItemInfoEl.createDiv({cls: 'setting-item-description', text: this.advancedSettingsDescription.get(type)?.description ?? ''}).createEl('br');

		const settingItemControlEl: HTMLDivElement = settingItemEl.createDiv({cls: 'setting-item-control'});

		const listSettingTableEl: HTMLTableElement = settingItemControlEl.createEl('table', {cls: 'rpgm-advanced-settings-table'});

		const defaultSettings = RpgManagerDefaultSettings.advanced.Agnostic[type as keyof RpgManagerAdvancedSettingsInterface];

		for (let index=0; index<defaultSettings.fields.length; index++) {
			const listSettingTableRowEl: HTMLTableRowElement = listSettingTableEl.createEl('tr');
			listSettingTableRowEl.createEl('td', {text: tableFieldName.get(defaultSettings.fields[index].field) ?? ''});

			const listSettingTableCheckboxEl: HTMLTableCellElement = listSettingTableRowEl.createEl('td');

			const listSettingFieldCheckboxEl: HTMLInputElement = listSettingTableCheckboxEl.createEl('input');
			listSettingFieldCheckboxEl.type = 'checkbox';
			listSettingFieldCheckboxEl.dataset.id = index.toString();

			let isChecked = defaultSettings.fields[index].checked;
			for (let actualSettingsIndex=0; actualSettingsIndex<settings.fields.length; actualSettingsIndex++){
				if (settings.fields[actualSettingsIndex].field === defaultSettings.fields[index].field) {
					isChecked = settings.fields[actualSettingsIndex].checked;
					break;
				}
			}

			if (isChecked) listSettingFieldCheckboxEl.checked = true;
			if (defaultSettings.fields[index].required) listSettingFieldCheckboxEl.disabled = true;

			listSettingFieldCheckboxEl.addEventListener('change', () => {
				this.updateAdvancedListSettings(
					index,
					type,
					listSettingFieldCheckboxEl.checked,
				)
			})
		}
	}

	private async updateAdvancedListSettings(
		index: number,
		type: string,
		checked: boolean,
	): Promise<void> {
		const name = type as keyof RpgManagerAdvancedSettingsInterface;
		const partialSettings: Partial<RpgManagerSettingsInterface> = {
			advanced: {
				Agnostic: this.plugin.settings.advanced.Agnostic
			}
		};

		if (partialSettings.advanced !== undefined) {
			for (let defaultIndex=0; defaultIndex<RpgManagerDefaultSettings.advanced.Agnostic[name].fields.length; defaultIndex++){
				if (partialSettings.advanced.Agnostic[name].fields[defaultIndex] === undefined) {
					partialSettings.advanced.Agnostic[name].fields.push(RpgManagerDefaultSettings.advanced.Agnostic[name].fields[defaultIndex]);
				}
			}

			partialSettings.advanced.Agnostic[name].fields[index].checked = checked;
			await this.plugin.updateSettings(partialSettings);
		}

		this.app.workspace.trigger("rpgmanager:refresh-views");
	}
}
