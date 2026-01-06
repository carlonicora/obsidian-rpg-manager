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
  private _draftFolderOrder: FolderKey[] | null = null;

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

    // Folder Structure Section - Collapsible
    const folderDetailsEl = containerEl.createEl("details", { cls: "mt-3", attr: { open: "" } });
    folderDetailsEl.createEl("summary", {
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

    // Initialize draft with current saved order if not already set
    if (this._draftFolderOrder === null) {
      this._draftFolderOrder = [...this._plugin.settings.folderOrder];
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

    // Container for action buttons (save/discard) - will be shown/hidden based on changes
    const actionButtonsEl = folderDetailsEl.createEl("div", {
      cls: "rpgm-folder-actions",
      attr: { style: "margin-bottom: 10px;" }
    });

    // Container for draggable items
    const folderListEl = folderDetailsEl.createEl("div", { cls: "rpgm-folder-list" });

    // Function to check if there are unsaved changes
    const hasUnsavedChanges = (): boolean => {
      const saved = this._plugin.settings.folderOrder;
      const draft = this._draftFolderOrder;
      if (!draft || saved.length !== draft.length) return true;
      return !saved.every((key, idx) => key === draft[idx]);
    };

    // Function to update action buttons visibility
    const updateActionButtons = () => {
      actionButtonsEl.empty();
      if (hasUnsavedChanges()) {
        const warningEl = actionButtonsEl.createEl("div", {
          cls: "setting-item-description",
          attr: { style: "color: var(--text-warning); margin-bottom: 8px;" }
        });
        warningEl.setText(t("settings.unsavedChanges"));

        const buttonsContainer = actionButtonsEl.createEl("div", {
          attr: { style: "display: flex; gap: 8px;" }
        });

        const saveBtn = buttonsContainer.createEl("button", {
          text: t("settings.saveChanges"),
          cls: "mod-cta"
        });
        saveBtn.addEventListener("click", async () => {
          await this.saveSettings({ folderOrder: [...this._draftFolderOrder!] });
          updateActionButtons();
        });

        const discardBtn = buttonsContainer.createEl("button", {
          text: t("settings.discardChanges")
        });
        discardBtn.addEventListener("click", () => {
          this._draftFolderOrder = [...this._plugin.settings.folderOrder];
          this._renderFolderList(folderListEl, folderLabelMap, localizedDefaults, updateActionButtons);
          updateActionButtons();
        });
      }
    };

    // Initial render
    this._renderFolderList(folderListEl, folderLabelMap, localizedDefaults, updateActionButtons);
    updateActionButtons();

    new Setting(folderDetailsEl)
      .setName(t("settings.resetFolderStructure"))
      .setDesc(t("settings.resetFolderStructureDesc"))
      .addButton((button) =>
        button
          .setButtonText(t("settings.resetFolderStructure"))
          .setWarning()
          .onClick(async () => {
            this._draftFolderOrder = [...defaultFolderOrder];
            await this.saveSettings({
              folderStructure: { ...localizedDefaults },
              folderOrder: [...defaultFolderOrder]
            });
            this._renderFolderList(folderListEl, folderLabelMap, localizedDefaults, updateActionButtons);
            updateActionButtons();
          }),
      );
  }

  private _renderFolderList(
    folderListEl: HTMLElement,
    folderLabelMap: Record<FolderKey, string>,
    localizedDefaults: FolderStructureInterface,
    onOrderChange?: () => void
  ): void {
    const t = (key: string) => i18n.t(key);

    // Clear the list
    folderListEl.empty();

    // Use draft order for display
    const currentOrder = this._draftFolderOrder || this._plugin.settings.folderOrder;
    let draggedItem: HTMLElement | null = null;
    let draggedKey: FolderKey | null = null;

    currentOrder.forEach((key, index) => {
      const orderNumber = String(index + 1).padStart(2, "0");

      const settingWrapper = folderListEl.createEl("div", {
        cls: "rpgm-folder-item",
        attr: {
          draggable: "true",
          "data-folder-key": key,
          style: "cursor: grab;"
        }
      });

      settingWrapper.addEventListener("dragstart", (e) => {
        draggedItem = settingWrapper;
        draggedKey = key;
        settingWrapper.style.opacity = "0.5";
        e.dataTransfer?.setData("text/plain", key);
      });

      settingWrapper.addEventListener("dragend", () => {
        if (draggedItem) {
          draggedItem.style.opacity = "1";
        }
        draggedItem = null;
        draggedKey = null;
        folderListEl.querySelectorAll(".rpgm-folder-item").forEach((el) => {
          (el as HTMLElement).style.borderTop = "";
          (el as HTMLElement).style.borderBottom = "";
        });
      });

      settingWrapper.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (draggedItem && draggedItem !== settingWrapper) {
          const rect = settingWrapper.getBoundingClientRect();
          const midY = rect.top + rect.height / 2;
          if (e.clientY < midY) {
            settingWrapper.style.borderTop = "2px solid var(--interactive-accent)";
            settingWrapper.style.borderBottom = "";
          } else {
            settingWrapper.style.borderTop = "";
            settingWrapper.style.borderBottom = "2px solid var(--interactive-accent)";
          }
        }
      });

      settingWrapper.addEventListener("dragleave", () => {
        settingWrapper.style.borderTop = "";
        settingWrapper.style.borderBottom = "";
      });

      settingWrapper.addEventListener("drop", (e) => {
        e.preventDefault();
        settingWrapper.style.borderTop = "";
        settingWrapper.style.borderBottom = "";

        if (draggedKey && draggedKey !== key) {
          const newOrder = [...currentOrder];
          const fromIndex = newOrder.indexOf(draggedKey);

          const rect = settingWrapper.getBoundingClientRect();
          const midY = rect.top + rect.height / 2;
          const dropAbove = e.clientY < midY;

          newOrder.splice(fromIndex, 1);

          let newIndex = newOrder.indexOf(key);
          if (!dropAbove) {
            newIndex++;
          }

          newOrder.splice(newIndex, 0, draggedKey);

          // Update draft only, don't save yet
          this._draftFolderOrder = newOrder;
          this._renderFolderList(folderListEl, folderLabelMap, localizedDefaults, onOrderChange);
          if (onOrderChange) onOrderChange();
        }
      });

      const setting = new Setting(settingWrapper)
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

      setting.addExtraButton((button) =>
        button
          .setIcon("grip-vertical")
          .setTooltip(t("settings.dragToReorder"))
      );
    });
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
