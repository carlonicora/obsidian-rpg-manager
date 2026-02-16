import { RelationshipInterface } from "@/data/interfaces/RelationshipInterface";
import i18next from "i18next";
import { App, MarkdownView, TAbstractFile, TFile } from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementType } from "src/data/enums/ElementType";
import { SystemType } from "src/data/enums/SystemType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { IdInterface } from "src/data/interfaces/IdInterface";
import { v4 as uuidv4 } from "uuid";
import { YamlService } from "../data/classes/YamlService";
import { RpgManagerCodeblockService } from "./RpgManagerCodeblockService";
import { TaskStatusType } from "./taskService/enums/TaskStatusType";
import { TaskType } from "./taskService/enums/TaskType";
const path = require("path");

export class FileCreationService {
	private _rpgManagerCodeBlock: string;
	private _codeblock: any;
	private _campaign: ElementInterface | undefined;

	constructor(
		private _app: App,
		private _api: RpgManagerInterface,
		private _type: ElementType,
		private _name: string,
		system?: SystemType,
		private _campaignPath?: string,
		private _parentPath?: string,
		positionInParent?: number,
		attributes?: any[],
		relationships?: RelationshipInterface[],
		private _template?: string
	) {
		const id: IdInterface = {
			type: this._type,
		};

		if (system !== undefined && system !== SystemType.Agnostic) id.system = SystemType.Agnostic;
		if (this._campaignPath !== undefined) id.campaign = this._campaignPath;
		if (this._parentPath !== undefined) id.parent = this._parentPath;
		if (positionInParent !== undefined) id.positionInParent = positionInParent;

		if (this._campaignPath !== undefined) {
			this._campaign = this._api.get(this._campaignPath) as ElementInterface | undefined;
			if (this._campaign !== undefined) system = this._campaign.system ?? SystemType.Agnostic;
		}

		this._codeblock = {
			id: id,
		};

		if (attributes !== undefined) {
			this._codeblock.data = {};

			attributes.forEach((attribute: { name: string; value: string | boolean | number }) => {
				if (attribute.value) this._codeblock.data[attribute.name] = attribute.value;
			});
		}

		if (relationships !== undefined) {
			this._codeblock.relationships = [];

			relationships.forEach((relationship: RelationshipInterface) => {
				this._codeblock.relationships.push({
					type: relationship.type,
					path: relationship.path,
				});
			});
		}

		if (this._api.settings.enableTasks ?? true) {
			this._codeblock.tasks = [
				{
					id: uuidv4(),
					priority: 1,
					name: i18next.t("tasks.complete", { context: this._type }),
					description: i18next.t("tasks.complete", { context: this._type }) + " " + this._name,
					type: TaskType.Creation,
					status: TaskStatusType.Proposed,
				},
			];
		}

		const yamlService = new YamlService();
		this._rpgManagerCodeBlock = "\n```RpgManager4\n";
		this._rpgManagerCodeBlock += yamlService.stringify(this._codeblock);
		this._rpgManagerCodeBlock += "```\n";
	}

	async create(open: boolean): Promise<TFile | undefined> {
		let content = this._rpgManagerCodeBlock;
		if (this._template !== undefined) {
			const templateFile: TFile = this._app.vault.getAbstractFileByPath(this._template) as TFile;
			const templateContent = await this._app.vault.read(templateFile);

			content = templateContent.replace("```RpgManager4```", content).replace("```RpgManager4\n```", content);
		}

		const fileName = await this._generateFilePath();
		const newFile = await this._app.vault.create(fileName, content);

		const currentLeaf = this._app.workspace.getActiveViewOfType(MarkdownView);
		const leaf = this._app.workspace.getLeaf(currentLeaf != null);

		// open ? await leaf.openFile(newFile) : leaf.detach();
		if (open === true) await leaf.openFile(newFile);
		else leaf.detach();

		return newFile;
	}

	async createInCurrentFile(file: TFile): Promise<TFile> {
		const codeblockService = new RpgManagerCodeblockService(this._app, this._api, file);
		return codeblockService.addCodeBlock(this._codeblock);
	}

	private async _generateFilePath(): Promise<string> {
		let pathSeparator: string;
		try {
			pathSeparator = path.sep;
		} catch (e) {
			pathSeparator = "/";
		}

		// Get folder structure from settings, with fallback to defaults
		const folders = this._api.settings.folderStructure || {
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

		// Get folder order from settings, with fallback to default order
		const folderOrder = this._api.settings.folderOrder || [
			"adventures", "sessions", "npcs", "events", "locations", "factions",
			"clues", "pcs", "subplots", "objects", "monsters", "lore"
		];

		// Helper function to get folder name with order prefix
		const getFolderWithPrefix = (key: string): string => {
			const orderIndex = folderOrder.indexOf(key as any);
			const orderNumber = String(orderIndex + 1).padStart(2, "0");
			return `${orderNumber}. ${folders[key as keyof typeof folders]}`;
		};

		let response = this._api.settings.automaticMove ? (this._api.settings.campaignsFolder || i18next.t("settings.defaultCampaignsFolder")) : "";

		if (this._type === ElementType.Campaign) {
			response += pathSeparator + this._name;
			this._createFolder(response);

			return response + pathSeparator + this._name + ".md";
		} else if (this._campaignPath !== undefined && this._api.settings.automaticMove === false) {
			const campaign: ElementInterface = this._api.get(this._campaignPath) as ElementInterface;

			return campaign.file.parent.path + pathSeparator + this._name + ".md";
		} else if (this._campaignPath === undefined) {
			response = "Assets";
		} else {
			response += pathSeparator + this._campaign.name;
		}

		const parent: ElementInterface | undefined =
			this._parentPath !== undefined ? (this._api.get(this._parentPath) as ElementInterface) : undefined;

		switch (this._type) {

			case ElementType.Adventure:
				response += pathSeparator + getFolderWithPrefix("adventures") + pathSeparator + this._name;
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			// TODO: Should this be a different datatype such as LoreChapter to better separate?
			case ElementType.Chapter:
				var useLoreOrAdventure = parent.type === ElementType.Lore ? getFolderWithPrefix("lore") : getFolderWithPrefix("adventures");
				response += pathSeparator + useLoreOrAdventure + pathSeparator + parent.name + pathSeparator + "Chapters";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Session:
				response += pathSeparator + getFolderWithPrefix("sessions") + pathSeparator + this._name;
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Scene:
				response += pathSeparator + getFolderWithPrefix("sessions") + pathSeparator + parent.name + pathSeparator + "Scenes";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.NonPlayerCharacter:
				response += pathSeparator + getFolderWithPrefix("npcs");
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Event:
				response += pathSeparator + getFolderWithPrefix("events");
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Location:
				response += pathSeparator + getFolderWithPrefix("locations");
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Faction:
				response += pathSeparator + getFolderWithPrefix("factions");
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Clue:
				response += pathSeparator + getFolderWithPrefix("clues");
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.PlayerCharacter:
				response += pathSeparator + getFolderWithPrefix("pcs");
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Subplot:
				response += pathSeparator + getFolderWithPrefix("subplots");
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Object:
				response += pathSeparator + getFolderWithPrefix("objects");
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Monster:
				response += pathSeparator + getFolderWithPrefix("monsters");
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Lore:

				if (parent?.type === ElementType.Lore) {
					// Nest under parent lore by using parent's directory path
					// First ensure the base lore directory exists
					const baseLoreDir = response + pathSeparator + getFolderWithPrefix("lore");
					this._createFolder(baseLoreDir);

					const parentDir = parent.file.parent.path;
					response = parentDir + pathSeparator + parent?.file?.basename;
					this._createFolder(response);
					response += pathSeparator + this._name + ".md";
				} else {
					// Top-level lore - create as a folder under lore
					response += pathSeparator + getFolderWithPrefix("lore");
					this._createFolder(response);
					response += pathSeparator + this._name + ".md";
				}
				break;
		}

		return response;
	}

	private async _createFolder(fileName: string): Promise<void> {
		const fileOrFolder: TAbstractFile | null = this._app.vault.getAbstractFileByPath(fileName);

		if (fileOrFolder == null) {
			try {
				await this._app.vault.createFolder(fileName);
			} catch (e) {
				//no need to catch any error here
			}
		}
	}
}
