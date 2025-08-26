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

		let response = this._api.settings.automaticMove ? "Campaigns" : "";

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
				response += pathSeparator + "01. Adventures" + pathSeparator + this._name;
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			// TODO: Should this be a different datatype such as LoreChapter to better separate?
			case ElementType.Chapter:
				var useLoreOrAdventure = parent.type === ElementType.Lore ? "12. Lore" : "01. Adventures";
				response += pathSeparator + useLoreOrAdventure + pathSeparator + parent.name + pathSeparator + "Chapters";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Session:
				response += pathSeparator + "02. Sessions" + pathSeparator + this._name;
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Scene:
				response += pathSeparator + "02. Sessions" + pathSeparator + parent.name + pathSeparator + "Scenes";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.NonPlayerCharacter:
				response += pathSeparator + "03. Non Player Characters";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Event:
				response += pathSeparator + "04. Events";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Location:
				response += pathSeparator + "05. Locations";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Faction:
				response += pathSeparator + "06. Factions";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Clue:
				response += pathSeparator + "07. Clues";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.PlayerCharacter:
				response += pathSeparator + "08. Player Characters";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Subplot:
				response += pathSeparator + "09. Subplots";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Object:
				response += pathSeparator + "10. Objects";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Monster:
				response += pathSeparator + "11. Monsters";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
				break;
			case ElementType.Lore:
				response += pathSeparator + "12. Lore";
				this._createFolder(response);
				response += pathSeparator + this._name + ".md";
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
