import {
	addIcon,
	App,
	Component, DropdownComponent,
	MarkdownPostProcessorContext,
	Plugin,
	PluginSettingTab,
	Setting, TAbstractFile,
	TFolder,
} from 'obsidian';
import {RpgController} from "./RpgController";
import {DataType} from "./enums/DataType";
import {RpgData} from "./data/RpgData";
import {RpgFunctions} from "./helpers/RpgFunctions";
import {RpgFactories} from "./RpgFactories";
import {CreationModal} from "./modals/CreationModal";
import {TagManager} from "./helpers/TagManager";

export default class RpgManager extends Plugin {
	/*
	@TODO: Add additional information to modal windows and to template
	@TODO: RAW
		- Update RAW Ability stats remotely
		- POST /Characters
		- PATCH /Characters
		- Generate Character
	 */
	settings: RpgManagerSettings;
	functions: RpgFunctions;
	io: RpgData;
	factories: RpgFactories;
	tagManager: TagManager;

	async onload() {
		console.log('Loading RpgManager ' + this.manifest.version);

		await this.loadSettings();

		addIcon('d20', '<g cx="50" cy="50" r="50" fill="currentColor" g transform="translate(0.000000,0.000000) scale(0.018)" stroke="none"><path d="M1940 4358 l-612 -753 616 -3 c339 -1 893 -1 1232 0 l616 3 -612 753 c-337 413 -616 752 -620 752 -4 0 -283 -339 -620 -752z"/><path d="M1180 4389 c-399 -231 -731 -424 -739 -428 -9 -6 3 -17 40 -38 30 -17 152 -87 271 -156 l217 -126 476 585 c261 321 471 584 467 583 -4 0 -333 -189 -732 -420z"/><path d="M3676 4225 c457 -562 477 -585 498 -572 11 8 133 78 269 157 l249 143 -29 17 c-62 39 -1453 840 -1458 840 -2 0 210 -263 471 -585z"/><path d="M281 2833 c0 -472 4 -849 8 -838 24 58 520 1362 523 1373 3 12 -168 116 -474 291 l-58 32 1 -858z"/><path d="M4571 3536 c-145 -84 -264 -156 -264 -160 -1 -4 118 -320 263 -701 l265 -694 3 430 c1 237 1 621 0 854 l-3 424 -264 -153z"/><path d="M1272 3290 c7 -20 1283 -2229 1288 -2229 5 0 1281 2209 1288 2229 2 7 -451 10 -1288 10 -837 0 -1290 -3 -1288 -10z"/><path d="M1025 3079 c-2 -8 -158 -416 -345 -906 -187 -491 -340 -897 -340 -903 0 -5 4 -10 8 -10 5 0 415 -65 913 -145 497 -80 928 -149 957 -154 l52 -8 -23 41 c-85 150 -1202 2083 -1208 2090 -5 6 -10 3 -14 -5z"/><path d="M3470 2028 c-337 -585 -614 -1066 -616 -1069 -2 -3 7 -4 19 -2 12 2 445 71 962 154 517 82 941 152 943 154 3 2 -1 19 -7 37 -33 93 -675 1774 -681 1781 -4 4 -283 -471 -620 -1055z"/><path d="M955 842 c17 -11 336 -196 710 -412 374 -216 695 -401 713 -412 l32 -20 0 314 0 314 -707 113 c-390 62 -724 115 -743 118 l-35 5 30 -20z"/><path d="M3428 741 l-718 -116 0 -313 0 -314 33 20 c17 11 347 201 732 422 385 222 704 407 710 412 16 14 -22 8 -757 -111z"/></g>');

		this.addSettingTab(new RpgManagerSettingTab(this.app, this));
		app.workspace.onLayoutReady(this.onLayoutReady.bind(this));

		this.io = new RpgData(this.app);
		this.functions = new RpgFunctions(this.app);
		this.factories = new RpgFactories(this.app);
		this.tagManager = new TagManager(this.app);

		this.registerEvents();
		this.registerCodeBlock();
		this.registerCommands();
	}

	private padTo2Digits(num: number) {
		return num.toString().padStart(2, '0');
	}

	async onLayoutReady(){
		this.io.loadCache();

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
			new RpgController(
				this.app,
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

	async updateSettings(settings: Partial<RpgManagerSettings>) {
		Object.assign(this.settings, settings);
		await this.saveData(this.settings);
	}

	private registerEvents(
	) : void {

		this.registerEvent(this.app.metadataCache.on('resolved', this.refreshViews.bind(this)));
		this.registerEvent(this.app.workspace.on('file-open', this.refreshViews.bind(this)));
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
					new CreationModal(
						this.app,
						DataType[type as keyof typeof DataType],
					).open();
				},
			});
			this.addCommand({
				id: "rpg-manager-fill-" + type.toLowerCase(),
				name: "Fill with " + type,
				callback: () => {
					let name: string|null = null;
					const activeFile = app.workspace.getActiveFile();
					if (activeFile != null) {
						name = activeFile.basename;
					}
					new CreationModal(
						this.app,
						DataType[type as keyof typeof DataType],
						false,
						name,
					).open();
				},
			});
		})
	}
}

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
	automaticMove: boolean;
	templateFolder: string;
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
	noteTag: 'rpgm/outline/note',
	automaticMove: true,
	templateFolder: '',
}

export class RpgManagerSettingTab extends PluginSettingTab {
	plugin: RpgManager;

	constructor(app: App, plugin: RpgManager) {
		super(app, plugin);
		this.plugin = plugin;
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

		new Setting(this.containerEl)
			.setName("Player Character Tag")
			.addText(text =>
				text
					.setPlaceholder('rpgm/element/character/pc')
					.setValue(this.plugin.settings.pcTag)
					.onChange(async value => {
						if (value.length == 0) return;
						await this.plugin.updateSettings({ pcTag: value });
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
	}
}
