import {App, Plugin_2, PluginSettingTab, TAbstractFile, TFolder} from "obsidian";
import {SettingsUpdater} from "./SettingsUpdater";
import {RpgManagerInterface} from "../core/interfaces/RpgManagerInterface";
import {SettingsFactory} from "./factories/SettingsFactory";
import {
	RpgManagerAdvancedSettingsInterface,
	RpgManagerAdvancedSettingsListsInterface, rpgManagerDefaultSettings,
	RpgManagerSettingsInterface
} from "./RpgManagerSettingsInterface";
import {SettingType} from "./enums/SettingType";
import {SettingInterface} from "./interfaces/SettingsInterface";
import {tableFieldName} from "../REFACTOR/views/enums/TableField";

export class RpgManagerSettings extends PluginSettingTab {
	private _plugin: RpgManagerInterface;
	private _settingsFactory: SettingsFactory;
	private _settingsUpdater: SettingsUpdater;
	private _map: Map<SettingType, SettingInterface>;
	public containerEl: HTMLElement;
	private _folderMap: Map<string, string>;

	private _advancedSettingsDescription: Map<string, {title: string, description: string}> = new Map<string, {title: string, description: string}>();

	constructor(
		app: App,
	) {
		super(
			app,
			(<unknown>app.plugins.getPlugin('rpg-manager')) as Plugin_2,
		);

		this._plugin = app.plugins.getPlugin('rpg-manager');

		const {containerEl} = this;
		this.containerEl = containerEl;

		this._map = new Map();
		this._map.set(SettingType.YouTubeApiKey, {title: 'YouTube API Key', value: this._plugin.settings.YouTubeKey, placeholder: 'Your YouTube API Key'});
		this._map.set(SettingType.automaticMove, {title: 'Automatically organise elements in folders', value: this._plugin.settings.automaticMove, placeholder: 'Organise new elements'});
		this._map.set(SettingType.templateFolder, {title: 'Template folder', value: this._plugin.settings.templateFolder, placeholder: 'Template Folder'});
		this._map.set(SettingType.imagesFolder, {title: 'Images folder', value: this._plugin.settings.imagesFolder, placeholder: 'Images Folder'});
		this._map.set(SettingType.usePlotStructures, {title: 'Abt/Story Circle plot structure', value: this._plugin.settings.usePlotStructures, placeholder: ''});
		this._map.set(SettingType.useSceneAnalyser, {title: 'SceneModel Analyser', value: this._plugin.settings.useSceneAnalyser, placeholder: ''});

		this._advancedSettingsDescription.set('ActList', {title: 'ActModel List', description: 'Select which fields you would like to see when displaying a list of Acts'});
		this._advancedSettingsDescription.set('AdventureList', {title: 'AdventureModel List', description: 'Select which fields you would like to see when displaying a list of Adventures'});
		this._advancedSettingsDescription.set('CharacterList', {title: 'Player CharacterModel List', description: 'Select which fields you would like to see when displaying a list of Player characters'});
		this._advancedSettingsDescription.set('ClueList', {title: 'ClueModel List', description: 'Select which fields you would like to see when displaying a list of Clues'});
		this._advancedSettingsDescription.set('EventList', {title: 'EventModel List', description: 'Select which fields you would like to see when displaying a list of Events'});
		this._advancedSettingsDescription.set('FactionList', {title: 'FactionModel List', description: 'Select which fields you would like to see when displaying a list of Factions'});
		this._advancedSettingsDescription.set('LocationList', {title: 'LocationModel List', description: 'Select which fields you would like to see when displaying a list of Locations'});
		this._advancedSettingsDescription.set('MusicList', {title: 'MusicModel List', description: 'Select which fields you would like to see when displaying a list of Musics'});
		this._advancedSettingsDescription.set('NonPlayerCharacterList', {title: 'Non Player CharacterModel List', description: 'Select which fields you would like to see when displaying a list of Non Player Characters'});
		this._advancedSettingsDescription.set('SceneList', {title: 'SceneModel List', description: 'Select which fields you would like to see when displaying a list of Scenes'});
		this._advancedSettingsDescription.set('SessionList', {title: 'SessionModel List', description: 'Select which fields you would like to see when displaying a list of Sessions'});
		this._advancedSettingsDescription.set('SubplotList', {title: 'SubplotModel List', description: 'Select which fields you would like to see when displaying a list of Subplots'});

		this._settingsUpdater = new SettingsUpdater(this.app);
		this._settingsFactory = new SettingsFactory(this.app, this._plugin, this._map, this.containerEl);
	}

	display(): void {
		this.containerEl.empty();

		this._createFolderMap();

		this._settingsFactory.createHeader('CampaignSetting for Role Playing Game Manager');

		this._loadTemplatesSettings();
		this._loadImagesSettings();
		this._loadExternalServicesSettings();
		this._loadAdvancedSettings();
	}

	private _loadExternalServicesSettings(
	): void {
		this._settingsFactory.createHeader('External Services', 3);
		this._settingsFactory.createWarning(`Configurations are saved in a file in your vault. If you share your vault, you share your key!`);

		this._settingsFactory.createTextSetting(
			SettingType.YouTubeApiKey,
			`Used to access YouTube-specific information`,
		);
	}

	private _loadTemplatesSettings(
	): void {
		this._settingsFactory.createHeader('Component creations', 3, 'Manage how new subModels are created');

		this._settingsFactory.createDropdownSetting(
			SettingType.templateFolder,
			`Select the folder in which you keep the templates for RPG Manager.`,
			this._folderMap,
		)

		this._settingsFactory.createToggleSetting(
			SettingType.automaticMove,
			`Keeps your structure organised by creating subfolders for your Outlines and Elements`,
		);

		this._settingsFactory.createToggleSetting(
			SettingType.usePlotStructures,
			`Use ABT/Story Circle plot structures`,
		);

		this._settingsFactory.createToggleSetting(
			SettingType.useSceneAnalyser,
			`Analyses the scenes inside acts or sessions to provide running time estimations and act or session balance`,
		);
	}

	private _loadImagesSettings(
	): void {
		this._settingsFactory.createHeader('Images Management', 3, 'Manage where you store the galleryService for all your campaigns');

		this._settingsFactory.createDropdownSetting(
			SettingType.imagesFolder,
			`Select the folder in which you keep the images for RPG Manager. Leave it empty if you want to use the default Obsidian Attachment folder. RPG Manager scans every subfolder in the one you selected`,
			this._folderMap,
		)
	}

	private _createFolderMap(
		parent: TFolder|undefined = undefined,
		indent = 0,
	): void {
		let folderList: TAbstractFile[] = [];
		if (parent != undefined) {
			folderList = parent.children.filter((file: TAbstractFile) => file instanceof TFolder);
		} else {
			this._folderMap = new Map();
			folderList = this.app.vault.getRoot().children.filter((file: TAbstractFile) => file instanceof TFolder);
		}

		folderList.forEach((folder: TFolder) => {
			this._folderMap.set(folder.path, folder.path);
			this._createFolderMap(folder, indent + 1);
		});
	}

	private _loadAdvancedSettings(
	): void {
		this._settingsFactory.createHeader('Lists', 3);

		Object.keys(this._plugin.settings.advanced.Agnostic).forEach((name: string, index: number) => {
			const advancedSetting = this._plugin.settings.advanced.Agnostic[name as keyof RpgManagerAdvancedSettingsInterface];
			this._addSettingsItem(name, advancedSetting);
		});
	}

	private _addSettingsItem(
		type: string,
		settings: RpgManagerAdvancedSettingsListsInterface,
	): void {
		const settingItemEl: HTMLDivElement = this.containerEl.createDiv({cls: 'setting-item'});

		const settingItemInfoEl: HTMLDivElement = settingItemEl.createDiv({cls: 'setting-item-info'});
		settingItemInfoEl.createDiv({cls: 'setting-item-name', text: this._advancedSettingsDescription.get(type)?.title ?? ''});
		settingItemInfoEl.createDiv({cls: 'setting-item-description', text: this._advancedSettingsDescription.get(type)?.description ?? ''}).createEl('br');

		const settingItemControlEl: HTMLDivElement = settingItemEl.createDiv({cls: 'setting-item-control'});

		const listSettingTableEl: HTMLTableElement = settingItemControlEl.createEl('table', {cls: 'rpgm-advanced-settings-table'});

		const defaultSettings = rpgManagerDefaultSettings.advanced.Agnostic[type as keyof RpgManagerAdvancedSettingsInterface];

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
				this._updateAdvancedListSettings(
					index,
					type,
					listSettingFieldCheckboxEl.checked,
				)
			})
		}
	}

	private async _updateAdvancedListSettings(
		index: number,
		type: string,
		checked: boolean,
	): Promise<void> {
		const name = type as keyof RpgManagerAdvancedSettingsInterface;
		const partialSettings: Partial<RpgManagerSettingsInterface> = {
			advanced: {
				Agnostic: this._plugin.settings.advanced.Agnostic
			}
		};

		if (partialSettings.advanced !== undefined) {
			for (let defaultIndex=0; defaultIndex<rpgManagerDefaultSettings.advanced.Agnostic[name].fields.length; defaultIndex++){
				if (partialSettings.advanced.Agnostic[name].fields[defaultIndex] === undefined) {
					partialSettings.advanced.Agnostic[name].fields.push(rpgManagerDefaultSettings.advanced.Agnostic[name].fields[defaultIndex]);
				}
			}

			partialSettings.advanced.Agnostic[name].fields[index].checked = checked;
			await this._plugin.updateSettings(partialSettings);
		}

		this.app.workspace.trigger("rpgmanager:refresh-views");
	}
}
