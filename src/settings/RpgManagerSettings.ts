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

export interface FolderStructureInterface {
  adventures: string;
  sessions: string;
  npcs: string;
  events: string;
  locations: string;
  factions: string;
  clues: string;
  pcs: string;
  subplots: string;
  objects: string;
  monsters: string;
  lore: string;
}

export const defaultFolderStructure: FolderStructureInterface = {
  adventures: "Adventures",
  sessions: "Sessions",
  npcs: "Non Player Characters",
  events: "Events",
  locations: "Locations",
  factions: "Factions",
  clues: "Clues",
  pcs: "Player Characters",
  subplots: "Subplots",
  objects: "Objects",
  monsters: "Monsters",
  lore: "Lore",
};

export function getLocalizedFolderDefaults(): FolderStructureInterface {
  return {
    adventures: i18n.t("settings.defaultAdventures"),
    sessions: i18n.t("settings.defaultSessions"),
    npcs: i18n.t("settings.defaultNpcs"),
    events: i18n.t("settings.defaultEvents"),
    locations: i18n.t("settings.defaultLocations"),
    factions: i18n.t("settings.defaultFactions"),
    clues: i18n.t("settings.defaultClues"),
    pcs: i18n.t("settings.defaultPcs"),
    subplots: i18n.t("settings.defaultSubplots"),
    objects: i18n.t("settings.defaultObjects"),
    monsters: i18n.t("settings.defaultMonsters"),
    lore: i18n.t("settings.defaultLore"),
  };
}

export type FolderKey = keyof FolderStructureInterface;

export const defaultFolderOrder: FolderKey[] = [
  "adventures",
  "sessions",
  "npcs",
  "events",
  "locations",
  "factions",
  "clues",
  "pcs",
  "subplots",
  "objects",
  "monsters",
  "lore",
];

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
  folderStructure: FolderStructureInterface;
  folderOrder: FolderKey[];
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
  folderStructure: { ...defaultFolderStructure },
  folderOrder: [...defaultFolderOrder],
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

    // Folder Structure Section - Collapsible
    const folderDetailsEl = containerEl.createEl("details", { cls: "mt-3" });
    const folderSummaryEl = folderDetailsEl.createEl("summary", {
      text: t("settings.folderStructure"),
      cls: "setting-item-heading",
      attr: { style: "cursor: pointer; font-weight: var(--font-semibold); font-size: var(--h3-size);" }
    });
    folderDetailsEl.createEl("p", { text: t("settings.folderStructureDesc") });

    // Get localized defaults
    const localizedDefaults = getLocalizedFolderDefaults();

    // Ensure folderStructure exists (for existing installations)
    if (!this._plugin.settings.folderStructure) {
      this._plugin.settings.folderStructure = { ...localizedDefaults };
    }

    // Ensure folderOrder exists (for existing installations)
    if (!this._plugin.settings.folderOrder || this._plugin.settings.folderOrder.length === 0) {
      this._plugin.settings.folderOrder = [...defaultFolderOrder];
    }

    const folderLabelMap: Record<FolderKey, string> = {
      adventures: "settings.folderAdventures",
      sessions: "settings.folderSessions",
      npcs: "settings.folderNpcs",
      events: "settings.folderEvents",
      locations: "settings.folderLocations",
      factions: "settings.folderFactions",
      clues: "settings.folderClues",
      pcs: "settings.folderPcs",
      subplots: "settings.folderSubplots",
      objects: "settings.folderObjects",
      monsters: "settings.folderMonsters",
      lore: "settings.folderLore",
    };

    // Render folders in the saved order
    const currentOrder = this._plugin.settings.folderOrder;

    currentOrder.forEach((key, index) => {
      // Format order number with leading zero (01, 02, ... 12)
      const orderNumber = String(index + 1).padStart(2, "0");

      const setting = new Setting(folderDetailsEl)
        .setName(`${orderNumber}. ${t(folderLabelMap[key])}`)
        .addText((text) =>
          text
            .setPlaceholder(localizedDefaults[key])
            .setValue(this._plugin.settings.folderStructure[key])
            .onChange(async (value: string) => {
              const newFolderStructure = { ...this._plugin.settings.folderStructure };
              newFolderStructure[key] = value || localizedDefaults[key];
              await this.saveSettings({ folderStructure: newFolderStructure });
            }),
        );

      // Add move up button (disabled if first)
      setting.addExtraButton((button) =>
        button
          .setIcon("arrow-up")
          .setTooltip(t("settings.moveUp"))
          .setDisabled(index === 0)
          .onClick(async () => {
            if (index > 0) {
              const newOrder = [...currentOrder];
              [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
              await this.saveSettings({ folderOrder: newOrder });
              this.display();
            }
          }),
      );

      // Add move down button (disabled if last)
      setting.addExtraButton((button) =>
        button
          .setIcon("arrow-down")
          .setTooltip(t("settings.moveDown"))
          .setDisabled(index === currentOrder.length - 1)
          .onClick(async () => {
            if (index < currentOrder.length - 1) {
              const newOrder = [...currentOrder];
              [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
              await this.saveSettings({ folderOrder: newOrder });
              this.display();
            }
          }),
      );
    });

    new Setting(folderDetailsEl)
      .setName(t("settings.resetFolderStructure"))
      .setDesc(t("settings.resetFolderStructureDesc"))
      .addButton((button) =>
        button
          .setButtonText(t("settings.resetFolderStructure"))
          .setWarning()
          .onClick(async () => {
            await this.saveSettings({
              folderStructure: { ...localizedDefaults },
              folderOrder: [...defaultFolderOrder]
            });
            this.display(); // Refresh the settings UI
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
