import { App, PluginSettingTab, Plugin_2, Setting, TAbstractFile, TFolder } from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";

export interface RpgManagerSettingsInterface {
	chatGptKey: string | undefined;
	templatesFolder: string | undefined;
	assetsFolder: string | undefined;
}

export type PartialSettings = Partial<RpgManagerSettingsInterface>;

export const rpgManagerDefaultSettings: RpgManagerSettingsInterface = {
	chatGptKey: undefined,
	templatesFolder: undefined,
	assetsFolder: undefined,
};

export class RpgManagerSettings extends PluginSettingTab {
	private _folderMap: Map<string, string>;

	constructor(private _app: App, private _plugin: RpgManagerInterface) {
		super(_app, _plugin as unknown as Plugin_2);

		const { containerEl } = this;
		this.containerEl = containerEl;
	}

	async saveSettings(changed: PartialSettings) {
		this._plugin.settings = { ...this._plugin.settings, ...changed };
		await (this._plugin as unknown as Plugin_2).saveData(this._plugin.settings);

		this._app.workspace.trigger("rpgmanager:refresh-views");
	}

	display(): void {
		this.containerEl.empty();

		this.containerEl.createEl("h2", { text: "Rpg Manager Settings" });

		this._createFolderMap();

		this._templateFolderSettings();
		this._assetsFolderSettings();
		this._chatGptSettings();
	}

	private async _templateFolderSettings(): Promise<void> {
		this.containerEl.createEl("h2", { text: "Template Folder" });
		this.containerEl.createEl("p", {
			text: "Select the folder in which you keep the templates for RPG Manager.",
		});

		new Setting(this.containerEl).setName("Templates Folder").addDropdown((dropdown) => {
			dropdown.addOption("", "");
			this._folderMap.forEach((value: string, display: string) => {
				dropdown.addOption(value, display);
			});

			dropdown.setValue(this._plugin.settings.templatesFolder);
			dropdown.onChange(async (value) => {
				await this.saveSettings({ templatesFolder: value });
			});
		});
	}

	private async _assetsFolderSettings(): Promise<void> {
		this.containerEl.createEl("h2", { text: "Assets Folder" });
		this.containerEl.createEl("p", {
			text: "Select the folder in which you keep the assets (images) for RPG Manager.",
		});

		new Setting(this.containerEl).setName("Assets Folder").addDropdown((dropdown) => {
			dropdown.addOption("", "");
			this._folderMap.forEach((value: string, display: string) => {
				dropdown.addOption(value, display);
			});

			dropdown.setValue(this._plugin.settings.assetsFolder);
			dropdown.onChange(async (value) => {
				await this.saveSettings({ assetsFolder: value });
			});
		});
	}

	private async _chatGptSettings(): Promise<void> {
		this.containerEl.createEl("h2", { text: "ChatGptSettings" });
		this.containerEl.createEl("p", {
			text: "Configurations are saved in a file in your vault. If you share your vault, you share your key!",
		}).style.color = "var(--text-error)";

		new Setting(this.containerEl)
			.setName("OpenAI Key")
			.setDesc(this._generateFragment("Insert your OpenAI key here."))
			.addText((text) =>
				text
					.setPlaceholder("")
					.setValue(this._plugin.settings.chatGptKey)
					.onChange(async (value: string) => {
						await this.saveSettings({ chatGptKey: value });
					})
			);
	}

	private _generateFragment(text: string): DocumentFragment {
		const lines = text.split("\n");

		return createFragment((fragment) => {
			lines.forEach((content: string) => {
				fragment.appendText(content);
				fragment.createEl("br");
			});
			fragment.appendText(" ");
		});
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
