import {App, PluginSettingTab, Setting} from "obsidian";
import RpgManager from "./main";

export interface RpgManagerSettings {
	campaignTag: string;
	adventureTag: string;
	sessionTag: string;
	sceneTag: string;
	npcTag: string;
	pcTag: string;
	locationTag: string;
	factionTag: string;
	eventTag: string;
	clueTag: string;
	timelineTag: string;
	noteTag: string;
}

export const DEFAULT_SETTINGS: RpgManagerSettings = {
	campaignTag: 'rpgm/outline/campaign',
	adventureTag: 'rpgm/outline/adventure',
	sessionTag: 'rpgm/outline/session',
	sceneTag: 'rpgm/outline/scene',
	npcTag: 'rpgm/element/character/npc',
	pcTag: 'rpgm/element/character/pc',
	locationTag: 'rpgm/element/location',
	factionTag: 'rpgm/element/faction',
	eventTag: 'rpgm/element/event',
	clueTag: 'rpgm/element/clue',
	timelineTag: 'rpgm/element/timeline',
	noteTag: 'rpgm/element/note',
}

export class RpgManagerSettingTab extends PluginSettingTab {
	plugin: RpgManager;

	constructor(app: App, plugin: RpgManager) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();
		containerEl.createEl('h2', {text: 'CampaignSetting for Role Playing Game Manager'});

		containerEl.createEl('h3', {text: 'Outlines'});
		containerEl.createEl('span', {text: createFragment(frag => {
				frag.appendText('Outlines are the plot part of the campaign.');
				frag.createEl('br');
				frag.appendText('The outlines are organised as campaigns > adventures > sessions > scenes');
				frag.createEl('br');
				frag.appendText('Each tag that identifies an outline should be followed by the ids of the parent outlines and end with a unique identifier for the current outline');
				frag.createEl('br');
				frag.createEl('span');
				frag.appendText(' ');
			})});

		new Setting(this.containerEl)
			.setName("Campaign Outline Tag")
			.setDesc(createFragment(frag => {
				frag.appendText('The tag identifying the campaign');
				frag.createEl('br');
				frag.appendText('Required ids:');
				frag.createEl('br');
				frag.appendText('/{campaignId}');
			}))
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
			.setDesc(createFragment(frag => {
				frag.appendText('The tag identifying an Adventure');
				frag.createEl('br');
				frag.appendText('Required ids:');
				frag.createEl('br');
				frag.appendText('/{campaignId}/{adventureId}');
			}))
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
			.setDesc(createFragment(frag => {
				frag.appendText('The tag identifying a Session');
				frag.createEl('br');
				frag.appendText('Required ids:');
				frag.createEl('br');
				frag.appendText('/{campaignId}/{adventureId}/{sessionId}');
			}))
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
			.setDesc(createFragment(frag => {
				frag.appendText('The tag identifying a Scene');
				frag.createEl('br');
				frag.appendText('Required ids:');
				frag.createEl('br');
				frag.appendText('/{campaignId}/{adventureId}/{sessionId}/{sceneId}');
			}))
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
		containerEl.createEl('span', {text: createFragment(frag => {
				frag.appendText('Elements are all the parts of the campaign which are not a plot.');
				frag.createEl('br');
				frag.appendText('The elements do not have a hyerarchical structure, but they only identify the campaign they belong to.');
				frag.createEl('br');
				frag.appendText('Each tag that identifies an element should be followed by the {campaignId}');
				frag.createEl('br');
				frag.appendText(' ');
			})});

		new Setting(this.containerEl)
			.setName("Player Character Tag")
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
			.addText(text =>
				text
					.setPlaceholder('rpgm/element/clue')
					.setValue(this.plugin.settings.clueTag)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Timeline Tag")
			.addText(text =>
				text
					.setPlaceholder('rpgm/element/timeline')
					.setValue(this.plugin.settings.timelineTag)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Note Tag")
			.addText(text =>
				text
					.setPlaceholder('rpgm/element/note')
					.setValue(this.plugin.settings.noteTag)
					.onChange(async value => {
						if (value.length == 0) return;

						await this.plugin.saveSettings();
					})
			);
	}
}
