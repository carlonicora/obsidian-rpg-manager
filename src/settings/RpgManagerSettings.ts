import { AttributeInterface } from "@/data/interfaces/AttributeInterface";
import i18n from "i18next";
import {
  App,
  Plugin,
  PluginSettingTab,
  Setting,
  TAbstractFile,
  TFolder,
} from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";

export interface RpgManagerSettingsInterface {
  chatGptKey: string | undefined;
  ollamaUrl: string | undefined;
  model: string;
  hasLLM: boolean;
  templatesFolder: string | undefined;
  assetsFolder: string | undefined;
  automaticMove: boolean;
  useSceneAnalyser: boolean;
  version: string;
  customAttributes: AttributeInterface[];
  forceFullWidth: boolean;
}

export type PartialSettings = Partial<RpgManagerSettingsInterface>;

export const rpgManagerDefaultSettings: RpgManagerSettingsInterface = {
  chatGptKey: undefined,
  ollamaUrl: undefined,
  model: "gpt-4.1-nano",
  hasLLM: false,
  templatesFolder: undefined,
  assetsFolder: undefined,
  automaticMove: false,
  useSceneAnalyser: true,
  version: "0.0.0",
  customAttributes: [],
  forceFullWidth: true,
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
    const t = (key: string) => i18n.t(key);

    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h3", { text: t("settings.title") });
    const mainDesc = containerEl.createEl("p");
    mainDesc.addClass("mb-3");
    mainDesc.appendText(t("settings.help") + " ");
    mainDesc.appendChild(
      createEl("a", {
        text: t("settings.github"),
        href: "https://github.com/carlonicora/obsidian-rpg-manager",
      }),
    );
    mainDesc.appendText(" " + t("settings.or") + " ");
    mainDesc.appendChild(
      createEl("a", {
        text: t("settings.discord"),
        href: "https://discord.com/channels/686053708261228577/1022806716343144518",
      }),
    );

    containerEl.createEl("h3", { text: t("settings.mainOptions") });

    new Setting(containerEl)
      .setName(t("settings.templatesFolder"))
      .setDesc(t("settings.templatesFolderDesc"))
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
      .setName(t("settings.keepOrganised"))
      .setDesc(t("settings.keepOrganisedDesc"))
      .addToggle((toggle) => {
        toggle
          .setValue(this._plugin.settings.automaticMove)
          .onChange(async (value) => {
            await this.saveSettings({ automaticMove: value });
          });
      });

    new Setting(containerEl)
      .setName(t("settings.forceFullWidth"))
      .setDesc(t("settings.forceFullWidthDesc"))
      .addToggle((toggle) => {
        toggle
          .setValue(this._plugin.settings.forceFullWidth)
          .onChange(async (value) => {
            await this.saveSettings({ forceFullWidth: value });
            if (value === true)
              document.body.classList.add("rpgm-toggle-full-width-styles");
            else
              document.body.classList.remove("rpgm-toggle-full-width-styles");
          });
      });

    new Setting(containerEl)
      .setName(t("settings.assetsFolder"))
      .setDesc(t("settings.assetsFolderDesc"))
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
      .setName(t("settings.sceneAnalyser"))
      .setDesc(t("settings.sceneAnalyserDesc"))
      .addToggle((toggle) => {
        toggle
          .setValue(this._plugin.settings.useSceneAnalyser)
          .onChange(async (value) => {
            await this.saveSettings({ useSceneAnalyser: value });
          });
      });

    containerEl.createEl("h3", { text: t("settings.aiPlugins"), cls: "mt-3" });
    const AIPlugins = containerEl.createEl("p");
    AIPlugins.appendText(t("settings.aiPluginsDesc"));
    const ChatGPTWarning = containerEl.createEl("p");
    ChatGPTWarning.appendChild(
      createEl("span", {
        text: t("settings.chatGptWarning"),
        cls: "text-[--text-warning]",
      }),
    );

    new Setting(containerEl)
      .setName(t("settings.chatGptKey"))
      .setDesc(t("settings.chatGptKeyDesc"))
      .addText((text) =>
        text
          .setPlaceholder("")
          .setValue(this._plugin.settings.chatGptKey)
          .onChange(async (value: string) => {
            await this.saveSettings({
              chatGptKey: value,
              hasLLM: true,
            });
          }),
      );

    const OllamaWarning = containerEl.createEl("p");
    OllamaWarning.appendChild(
      createEl("span", {
        text: t("settings.ollamaWarning"),
        cls: "text-[--text-warning]",
      }),
    );

    new Setting(containerEl)
      .setName(t("settings.ollamaUrl"))
      .setDesc(t("settings.ollamaUrlDesc"))
      .addText((text) =>
        text
          .setPlaceholder("http://localhost:11434")
          .setValue(this._plugin.settings.ollamaUrl)
          .onChange(async (value: string) => {
            await this.saveSettings({
              ollamaUrl: value,
              hasLLM: true,
            });
          }),
      );

    const modelWarning = containerEl.createEl("p");
    modelWarning.appendChild(
      createEl("span", {
        text: t("settings.modelWarning"),
        cls: "text-[--text-warning]",
      }),
    );
    new Setting(containerEl)
      .setName(t("settings.aiModel"))
      .setDesc(t("settings.aiModelDesc"))
      .addText((text) =>
        text
          .setPlaceholder("")
          .setValue(this._plugin.settings.model)
          .onChange(async (value: string) => {
            await this.saveSettings({ model: value });
          }),
      );
  }

  private _createFolderMap(
    parent: TFolder | undefined = undefined,
    indent = 0,
  ): void {
    let folderList: TAbstractFile[] = [];
    if (parent != undefined) {
      folderList = parent.children.filter(
        (file: TAbstractFile) => file instanceof TFolder,
      );
    } else {
      this._folderMap = new Map();
      folderList = this.app.vault
        .getRoot()
        .children.filter((file: TAbstractFile) => file instanceof TFolder);
    }

    folderList.forEach((folder: TFolder) => {
      if (folder.name !== "Campaigns") {
        this._folderMap.set(folder.path, folder.path);
        this._createFolderMap(folder, indent + 1);
      }
    });
  }
}
