import { AttributeInterface } from "@/data/interfaces/AttributeInterface";
import { App, Plugin, PluginSettingTab, Setting, TAbstractFile, TFolder } from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";

export interface RpgManagerSettingsInterface {
	chatGptKey: string | undefined;
	templatesFolder: string | undefined;
	assetsFolder: string | undefined;
	automaticMove: boolean;
	useSceneAnalyser: boolean;
	version: string;
	customAttributes: AttributeInterface[];
}

export type PartialSettings = Partial<RpgManagerSettingsInterface>;

export const rpgManagerDefaultSettings: RpgManagerSettingsInterface = {
	chatGptKey: undefined,
	templatesFolder: undefined,
	assetsFolder: undefined,
	automaticMove: false,
	useSceneAnalyser: true,
	version: "0.0.0",
	customAttributes: [],
};

export class RpgManagerSettings extends PluginSettingTab {
	private _folderMap: Map<string, string>;

	constructor(private _app: App, private _plugin: RpgManagerInterface) {
		super(_app, _plugin as unknown as Plugin);

		const { containerEl } = this;
		this.containerEl = containerEl;
	}

	async saveSettings(changed: PartialSettings) {
		this._plugin.settings = { ...this._plugin.settings, ...changed };
		await (this._plugin as unknown as Plugin).saveData(this._plugin.settings);

		this._app.workspace.trigger("rpgmanager:refresh-views");
	}

	display(): void {
		this._createFolderMap();

		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h3", { text: "Rpg Manager Settings" });
		const mainDesc = containerEl.createEl("p");
		mainDesc.addClass("mb-3");
		mainDesc.appendText("For help or support, refer to ");
		mainDesc.appendChild(
			createEl("a", {
				text: "github",
				href: "https://github.com/carlonicora/obsidian-rpg-manager",
			})
		);
		mainDesc.appendText(" or join the ");
		mainDesc.appendChild(
			createEl("a", {
				text: "discord support thread",
				href: "https://discord.com/channels/686053708261228577/1022806716343144518",
			})
		);

		containerEl.createEl("h3", { text: "Main Options" });

		new Setting(containerEl)
			.setName("Templates Folder")
			.setDesc("To use custom templates, select the folder that contains them.")
			.addDropdown((dropdown) => {
				dropdown.addOption("", "");
				this._folderMap.forEach((value: string, display: string) => {
					dropdown.addOption(value, display);
				});

				dropdown.setValue(this._plugin.settings.templatesFolder);
				dropdown.onChange(async (value) => {
					await this.saveSettings({ templatesFolder: value });
				});
			});

		new Setting(containerEl)
			.setName("Keep Element Organised")
			.setDesc("Automatically move new elements in subfolders of their campaign.")
			.addToggle((toggle) => {
				toggle.setValue(this._plugin.settings.automaticMove).onChange(async (value) => {
					await this.saveSettings({ automaticMove: value });
				});
			});

		new Setting(containerEl)
			.setName("Image and Assets Folder")
			.setDesc("Select the folder that contains the assets.")
			.addDropdown((dropdown) => {
				dropdown.addOption("", "");
				this._folderMap.forEach((value: string, display: string) => {
					dropdown.addOption(value, display);
				});

				dropdown.setValue(this._plugin.settings.assetsFolder);
				dropdown.onChange(async (value) => {
					await this.saveSettings({ assetsFolder: value });
				});
			});

		new Setting(containerEl)
			.setName("Scene Analyser")
			.setDesc("Show the tool that helps you create balanced sessions.")
			.addToggle((toggle) => {
				toggle.setValue(this._plugin.settings.useSceneAnalyser).onChange(async (value) => {
					await this.saveSettings({ useSceneAnalyser: value });
				});
			});

		containerEl.createEl("h3", { text: "ChatGPT", cls: "mt-3" });
		const ChatGPT = containerEl.createEl("p");
		ChatGPT.appendText("Set up all the add-ons for the plugin. ");
		const ChatGPTWarning = containerEl.createEl("p");
		ChatGPTWarning.appendChild(
			createEl("span", {
				text: "Please note: ChatGPT is a paid service, you need to have a key to use it. Also, some data from your vault will be sent to OpenAI.",
				cls: "text-[--text-warning]",
			})
		);

		new Setting(containerEl)
			.setName("OpenAI Key")
			.setDesc("Insert your OpenAI key here.")
			.addText((text) =>
				text
					.setPlaceholder("")
					.setValue(this._plugin.settings.chatGptKey)
					.onChange(async (value: string) => {
						await this.saveSettings({ chatGptKey: value });
					})
			);
	}

	private _createFolderMap(parent: TFolder | undefined = undefined, indent = 0): void {
		let folderList: TAbstractFile[] = [];
		if (parent != undefined) {
			folderList = parent.children.filter((file: TAbstractFile) => file instanceof TFolder);
		} else {
			this._folderMap = new Map();
			folderList = this.app.vault.getRoot().children.filter((file: TAbstractFile) => file instanceof TFolder);
		}

		folderList.forEach((folder: TFolder) => {
			if (folder.name !== "Campaigns") {
				this._folderMap.set(folder.path, folder.path);
				this._createFolderMap(folder, indent + 1);
			}
		});
	}
}
