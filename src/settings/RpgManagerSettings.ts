import {App, Plugin_2, PluginSettingTab, TAbstractFile, TFolder} from "obsidian";
import {SettingsUpdater} from "./SettingsUpdater";
import {RpgManagerInterface} from "../interfaces/RpgManagerInterface";
import {SettingsFactory} from "../factories/SettingsFactory";
import {RpgManagerSettingsInterface} from "./RpgManagerSettingsInterface";
import {SettingType} from "../enums/SettingType";
import {SettingInterface} from "../interfaces/SettingsInterface";

export class RpgManagerSettings extends PluginSettingTab {
	private plugin: RpgManagerInterface;
	private settingsFactory: SettingsFactory;
	private settingsUpdater: SettingsUpdater;
	private map: Map<SettingType, SettingInterface>;
	public containerEl: HTMLElement;
	private templateFolderMap: Map<string, string>;

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
		this.map.set(SettingType.PC, {title: 'Player Character Tag', value: this.plugin.settings.pcTag, placeholder: 'rpgm/element/character/pc'});
		this.map.set(SettingType.NPC, {title: 'Non Player Character Tag', value: this.plugin.settings.npcTag, placeholder: 'rpgm/element/character/npc'});
		this.map.set(SettingType.Location, {title: 'Location Tag', value: this.plugin.settings.locationTag, placeholder: 'rpgm/element/location'});
		this.map.set(SettingType.Faction, {title: 'Faction Tag', value: this.plugin.settings.factionTag, placeholder: 'rpgm/element/faction'});
		this.map.set(SettingType.Clue, {title: 'Clue Tag', value: this.plugin.settings.eventTag, placeholder: 'rpgm/element/event'});
		this.map.set(SettingType.Event, {title: 'Event Tag', value: this.plugin.settings.clueTag, placeholder: 'rpgm/element/clue'});
		this.map.set(SettingType.Timeline, {title: 'Timeline Tag', value: this.plugin.settings.timelineTag, placeholder: 'rpgm/element/timeline'});
		this.map.set(SettingType.Music, {title: 'Music Tag', value: this.plugin.settings.musicTag, placeholder: 'rpgm/element/music'});

		this.map.set(SettingType.Campaign, {title: 'Campaign Outline Tag', value: this.plugin.settings.campaignTag, placeholder: 'rpgm/outline/campaign'});
		this.map.set(SettingType.Adventure, {title: 'Adventure Outline Tag', value: this.plugin.settings.adventureTag, placeholder: 'rpgm/outline/adventure'});
		this.map.set(SettingType.Act, {title: 'Act Outline Tag', value: this.plugin.settings.actTag, placeholder: 'rpgm/outline/act'});
		this.map.set(SettingType.Session, {title: 'Session Outline Tag', value: this.plugin.settings.sessionTag, placeholder: 'rpgm/outline/session'});
		this.map.set(SettingType.Scene, {title: 'Scene Outline Tag', value: this.plugin.settings.sceneTag, placeholder: 'rpgm/outline/scene'});

		this.map.set(SettingType.YouTubeApiKey, {title: 'YouTube API Key', value: this.plugin.settings.YouTubeKey, placeholder: 'Your YouTube API Key'});
		this.map.set(SettingType.automaticMove, {title: 'Automatically organise elements in folders', value: this.plugin.settings.automaticMove, placeholder: 'Organise new elements'});
		this.map.set(SettingType.templateFolder, {title: 'Template folder', value: this.plugin.settings.templateFolder, placeholder: 'Template Folder'});

		this.settingsUpdater = new SettingsUpdater(this.app);
		this.settingsFactory = new SettingsFactory(this.plugin, this.map, this.containerEl);
	}

	display(): void {
		this.containerEl.empty();

		this.createTemplateFolderMap();

		this.settingsFactory.createHeader('CampaignSetting for Role Playing Game Manager');

		this.loadTemplatesSettings();
		this.loadAutomationSettings();
		this.loadExternalServicesSettings();
		this.loadOutlineSettings();
		this.loadElementSettings();

		const saveButtonEl = this.containerEl.createEl('button');
		const saved = this.containerEl.createEl('p', {text: 'Settings Saved'});
		saved.style.display = 'none';
		saveButtonEl.textContent = 'Save Settings';
		saveButtonEl.addEventListener("click", () => {
			saved.style.display = 'none';
			this.saveSettings()
				.then((response: string) => {
					saved.textContent = response;
					saved.style.display = 'block';
				});
		});
	}

	private async saveSettings(
	): Promise<string> {
		let response = 'No changes to the settings have been made.';
		const updatedTags: Map<string, string> = new Map();

		let doUpdate = false;
		const settingsToUpdate: Partial<RpgManagerSettingsInterface> = {};

		if (this.plugin.settings.campaignTag !== this.map.get(SettingType.Campaign)?.value) {
			settingsToUpdate.campaignTag = this.map.get(SettingType.Campaign)?.value;
			updatedTags.set(this.plugin.settings.campaignTag, this.map.get(SettingType.Campaign)?.value);
		}

		if (this.plugin.settings.adventureTag !== this.map.get(SettingType.Adventure)?.value) {
			settingsToUpdate.adventureTag = this.map.get(SettingType.Adventure)?.value;
			updatedTags.set(this.plugin.settings.adventureTag, this.map.get(SettingType.Adventure)?.value);
			doUpdate = true;
		}

		if (this.plugin.settings.actTag !== this.map.get(SettingType.Act)?.value) {
			settingsToUpdate.actTag = this.map.get(SettingType.Act)?.value;
			updatedTags.set(this.plugin.settings.actTag, this.map.get(SettingType.Act)?.value);
			doUpdate = true;
		}

		if (this.plugin.settings.sceneTag !== this.map.get(SettingType.Scene)?.value) {
			settingsToUpdate.sceneTag = this.map.get(SettingType.Scene)?.value;
			updatedTags.set(this.plugin.settings.sceneTag, this.map.get(SettingType.Scene)?.value);
			doUpdate = true;
		}

		if (this.plugin.settings.sessionTag !== this.map.get(SettingType.Session)?.value) {
			settingsToUpdate.sessionTag = this.map.get(SettingType.Session)?.value;
			updatedTags.set(this.plugin.settings.sessionTag, this.map.get(SettingType.Session)?.value);
			doUpdate = true;
		}

		if (this.plugin.settings.pcTag !== this.map.get(SettingType.PC)?.value) {
			settingsToUpdate.pcTag = this.map.get(SettingType.PC)?.value;
			updatedTags.set(this.plugin.settings.pcTag, this.map.get(SettingType.PC)?.value);
			doUpdate = true;
		}

		if (this.plugin.settings.npcTag !== this.map.get(SettingType.NPC)?.value) {
			settingsToUpdate.npcTag = this.map.get(SettingType.NPC)?.value;
			updatedTags.set(this.plugin.settings.npcTag, this.map.get(SettingType.NPC)?.value);
			doUpdate = true;
		}

		if (this.plugin.settings.factionTag !== this.map.get(SettingType.Faction)?.value) {
			settingsToUpdate.factionTag = this.map.get(SettingType.Faction)?.value;
			updatedTags.set(this.plugin.settings.factionTag, this.map.get(SettingType.Faction)?.value);
			doUpdate = true;
		}

		if (this.plugin.settings.locationTag !== this.map.get(SettingType.Location)?.value) {
			settingsToUpdate.locationTag = this.map.get(SettingType.Location)?.value;
			updatedTags.set(this.plugin.settings.locationTag, this.map.get(SettingType.Location)?.value);
			doUpdate = true;
		}

		if (this.plugin.settings.eventTag !== this.map.get(SettingType.Event)?.value) {
			settingsToUpdate.eventTag = this.map.get(SettingType.Event)?.value;
			updatedTags.set(this.plugin.settings.eventTag, this.map.get(SettingType.Event)?.value);
			doUpdate = true;
		}

		if (this.plugin.settings.clueTag !== this.map.get(SettingType.Clue)?.value) {
			settingsToUpdate.clueTag = this.map.get(SettingType.Clue)?.value;
			updatedTags.set(this.plugin.settings.clueTag, this.map.get(SettingType.Clue)?.value);
			doUpdate = true;
		}

		if (this.plugin.settings.musicTag !== this.map.get(SettingType.Music)?.value) {
			settingsToUpdate.musicTag = this.map.get(SettingType.Music)?.value;
			updatedTags.set(this.plugin.settings.musicTag, this.map.get(SettingType.Music)?.value);
			doUpdate = true;
		}

		if (this.plugin.settings.timelineTag !== this.map.get(SettingType.Timeline)?.value) {
			settingsToUpdate.timelineTag = this.map.get(SettingType.Timeline)?.value;
			updatedTags.set(this.plugin.settings.timelineTag, this.map.get(SettingType.Timeline)?.value);
			doUpdate = true;
		}

		if (doUpdate){
			await this.plugin.updateSettings(settingsToUpdate);
			await this.settingsUpdater.updateTags(updatedTags);

			response = 'Settings saved and database re-initialised';
		}

		return response;
	}

	private loadElementSettings(
	): void {
		this.settingsFactory.createHeader('Elements', 3, `Elements are all the parts of the campaign which are not a plot.
		The elements do not have a hyerarchical structure, but they only identify the campaign they belong to.
		Each tag that identifies an element should be followed by the {campaignId}`);
		this.settingsFactory.createWarning(`Warning: These settings will be saved only after pressing the button below
		All the tags will be updates in your notes.`);

		this.settingsFactory.createTextSetting(
			SettingType.PC,
			'This tag identifies the Player Characters',
		);

		this.settingsFactory.createTextSetting(
			SettingType.NPC,
			'This tag identifies the Non Player Characters',
		);

		this.settingsFactory.createTextSetting(
			SettingType.Location,
			'This tag identifies the Locations',
		);

		this.settingsFactory.createTextSetting(
			SettingType.Faction,
			'This tag identifies the Factions',
		);

		this.settingsFactory.createTextSetting(
			SettingType.Event,
			'This tag identifies the Events',
		);

		this.settingsFactory.createTextSetting(
			SettingType.Clue,
			'This tag identifies the Clues',
		);

		this.settingsFactory.createTextSetting(
			SettingType.Timeline,
			'This tag identifies the Timelines',
		);

		this.settingsFactory.createTextSetting(
			SettingType.Music,
			'This tag identifies the Musics',
		);
	}

	private loadOutlineSettings(
	): void {this.settingsFactory.createHeader('Outlines', 3, `Outlines are the plot part of RPG Manager.
		They are hierarchically organised in campaigns > adventures > acts > scenes
		Each tag that identifies an outline should contain the ids of the parent outlines and end with a unique identifier`);
		this.settingsFactory.createWarning(`Warning: These settings will be saved only after pressing the button below
		All the tags will be updates in your notes.`);

		this.settingsFactory.createTextSetting(
			SettingType.Campaign,
			`The tag identifying the campaigns
			Required ids: /{campaignId}`,
		);

		this.settingsFactory.createTextSetting(
			SettingType.Adventure,
			`The tag identifying the adventures
			Required ids: /{campaignId}/{adventureId}`,
		);

		this.settingsFactory.createTextSetting(
			SettingType.Act,
			`The tag identifying the acts
			Required ids: /{campaignId}/{adventureId}/{actId}`,
		);

		this.settingsFactory.createTextSetting(
			SettingType.Scene,
			`The tag identifying the scenes
			Required ids: /{campaignId}/{adventureId}/{actId}/{sceneId}`,
		);

		this.settingsFactory.createTextSetting(
			SettingType.Session,
			`The tag identifying the sessions
			Required ids: /{campaignId}/{adventureId}/{sessionId}`,
		);
	}

	private loadExternalServicesSettings(
	): void {
		this.settingsFactory.createHeader('External Service', 3, `Use this area to setup the information relative to third party services.`);
		this.settingsFactory.createWarning(`**ATTENTION**: the configurations are saved in a file in your vault. If you share your vault, any secret key might be shared!`);

		this.settingsFactory.createTextSetting(
			SettingType.YouTubeApiKey,
			`If you want to use the automation included in the Music element through YouTube, please generate a YouTube Api Key and add it here. \n
			To generate your YouTube Api key you can follow the instructions at https://rapidapi.com/blog/how-to-get-youtube-api-key/`,
		);
	}

	private loadAutomationSettings(
	): void {
		this.settingsFactory.createHeader('Automations', 3, 'Set your preferences for the automations RPG Manager offers.');

		this.settingsFactory.createToggleSetting(
			SettingType.automaticMove,
			`RPG Manager automatically organise created or filled outlines and elements in separate folders.
			You can avoid the automatical move of your notes by disabling this setting.`,
		);
	}

	private loadTemplatesSettings(
	): void {
		this.settingsFactory.createHeader('Templates', 3, 'Select the folder you use to store your templates.');

		this.settingsFactory.createDropdownSetting(
			SettingType.templateFolder,
			`Select the folder in which you keep the templates for RPG Manager.
			If you leave this value empty, the creation of outlines and elements won't have any additional information apart from the frontmatter and the codeblocks`,
			this.templateFolderMap,
		)
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
}
