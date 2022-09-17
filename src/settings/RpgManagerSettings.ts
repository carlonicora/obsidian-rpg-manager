import {App, DropdownComponent, PluginSettingTab, Setting, TAbstractFile, TFolder} from "obsidian";
import {SettingsUpdater} from "./SettingsUpdater";
import {RpgManagerInterface} from "../interfaces/RpgManagerInterface";

export class RpgManagerSettings extends PluginSettingTab {
	private plugin: RpgManagerInterface;
	private settingsUpdater: SettingsUpdater;

	constructor(
		app: App,
	) {
		super(
			app,
			app.plugins.getPlugin('rpg-manager'),
		);

		this.plugin = app.plugins.getPlugin('rpg-manager');
		this.settingsUpdater = new SettingsUpdater(this.app);
	}

	private fillOptionsWithFolders(
		dropdown: DropdownComponent,
		parent: TFolder|undefined = undefined,
	): void {
		let folderList: TAbstractFile[] = [];
		if (parent != undefined) {
			folderList = parent.children.filter((file: TAbstractFile) => file instanceof TFolder);
		} else {
			folderList = this.app.vault.getRoot().children.filter((file: TAbstractFile) => file instanceof TFolder);
		}

		folderList.forEach((folder: TFolder) => {
			dropdown.addOption(folder.path, folder.path);
			this.fillOptionsWithFolders(dropdown, folder);
		});
	}

	display(): void {
		const {containerEl} = this;

		const pcTag = this.plugin.settings.pcTag;

		containerEl.empty();
		containerEl.createEl('h2', {text: 'CampaignSetting for Role Playing Game Manager'});

		containerEl.createEl('h3', {text: 'Templates'});
		containerEl.createEl('span', {text: createFragment(frag => {
				frag.appendText('Manage the folder RPG Manager can read the templates from');
				frag.createEl('br');
				frag.appendText(' ');
			})});

		new Setting(this.containerEl)
			.setName("Templates folder")
			.setDesc(createFragment(frag => {
				frag.appendText('Select the folder in which you keep the templates for RPG Manager.');
				frag.createEl('br');
				frag.appendText('If you leave this value empty, the creation of outlines and elements won\'t have any additional information apart from the frontmatter and the codeblocks');
				frag.createEl('br');
				frag.appendText(' ');
			}))
			.addDropdown(dropdown => {
				dropdown.addOption('', '');
				this.fillOptionsWithFolders(dropdown);

				dropdown.setValue(this.plugin.settings.templateFolder);

				dropdown.onChange(async value => await this.plugin.updateSettings({templateFolder: value}));
			});

		containerEl.createEl('h3', {text: 'Automations'});
		containerEl.createEl('span', {text: createFragment(frag => {
				frag.appendText('Set your preferences for the automations RPG Manager offers.');
				frag.createEl('br');
				frag.appendText(' ');
			})});

		new Setting(this.containerEl)
			.setName("Auto Organisation of Notes")
			.setDesc(createFragment(frag => {
				frag.createEl('br');
				frag.appendText('RPG Manager automatically organise created or filled outlines and elements in separate folders.');
				frag.createEl('br');
				frag.appendText('You can avoid the automatical move of your notes by disabling this setting.');
				frag.createEl('br');
				frag.appendText(' ');
			}))
			.addToggle(toggle =>
				toggle
					.setValue(this.plugin.settings.automaticMove)
					.onChange(async value => await this.plugin.updateSettings({ automaticMove: value }))
			);

		containerEl.createEl('h2', {text: 'External Services'});
		containerEl.createEl('span', {text: createFragment(frag => {
				frag.appendText('Use this area to setup the information relative to third party services');
				frag.createEl('br');
				frag.createEl('p', {text: 'ATTENTION: the configurations are saved in a file in your vault. If you share your vault, any secret key might be shared!'}).style.color = 'var(--text-error)';
				frag.createEl('br');
				frag.appendText(' ');
			})});

		new Setting(this.containerEl)
			.setName("YouTube API Key")
			.setDesc(createFragment(frag => {
				frag.appendText('If you want to use the automation included in the `Music` element through YouTube, please generate a YouTube Api Key and add it here');
				frag.createEl('br');
				frag.appendText('To generate your YouTube Api key you can follow the instructions in ');
				frag.createEl('a', {text: 'this link', href: 'https://rapidapi.com/blog/how-to-get-youtube-api-key/'});
				frag.createEl('br');
				frag.appendText(' ');
				frag.createEl('br');
				frag.appendText(' ');
			}))
			.addText(text =>
				text
					.setPlaceholder('Your YouTube API Key')
					.setValue(this.plugin.settings.YouTubeKey)
					.onChange(async value => {
						await this.plugin.updateSettings({ YouTubeKey: value });
					})
			);

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
						await this.plugin.updateSettings({ campaignTag: value });
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
						await this.plugin.updateSettings({ adventureTag: value });
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
						await this.plugin.updateSettings({ sessionTag: value });
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
						await this.plugin.updateSettings({ sceneTag: value });
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

		let updatePcTagInDatabaseEl: HTMLDivElement;
		let updatePcTagInDatabaseButtonEl: HTMLButtonElement;
		new Setting(this.containerEl)
			.setName("Player Character Tag")
			.setDesc(createFragment(frag => {
				frag.appendText('This tag identifies the Player Characters');
				frag.createEl('br');
				updatePcTagInDatabaseEl = frag.createDiv();
				updatePcTagInDatabaseEl.style.display = 'none';
				updatePcTagInDatabaseButtonEl = updatePcTagInDatabaseEl.createEl('button');
				updatePcTagInDatabaseButtonEl.textContent = 'Update every setting in the database';
				updatePcTagInDatabaseButtonEl.addEventListener("click", () => {
					this.settingsUpdater.updateElementTags(
						pcTag,
						this.plugin.settings.pcTag,
					);
				});
			}))
			.addText(text =>
				text
					.setPlaceholder('rpgm/element/character/pc')
					.setValue(this.plugin.settings.pcTag)
					.onChange(async value => {
						if (value.length == 0) return;
						await this.plugin.updateSettings({ pcTag: value });
						if (value !== pcTag){
							updatePcTagInDatabaseEl.style.display = 'block';
						} else {
							updatePcTagInDatabaseEl.style.display = 'none';
						}
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
						await this.plugin.updateSettings({ npcTag: value });
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
						await this.plugin.updateSettings({ locationTag: value });
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
						await this.plugin.updateSettings({ factionTag: value });
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
						await this.plugin.updateSettings({ eventTag: value });
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
						await this.plugin.updateSettings({ clueTag: value });
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
						await this.plugin.updateSettings({ timelineTag: value });
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
						await this.plugin.updateSettings({ noteTag: value });
					})
			);

		new Setting(this.containerEl)
			.setName("Music Tag")
			.addText(text =>
				text
					.setPlaceholder('rpgm/element/music')
					.setValue(this.plugin.settings.musicTag)
					.onChange(async value => {
						if (value.length == 0) return;
						await this.plugin.updateSettings({ musicTag: value });
					})
			);
	}
}
