import { YamlService } from "@/data/classes/YamlService";
import { ElementType } from "@/data/enums/ElementType";
import { App, CachedMetadata, SectionCache, TFile, parseYaml } from "obsidian";

interface DataInterface {
	file: TFile;
	metadata: {
		ID: any;
		data: any;
	};
}

export class UpdaterService {
	private _total = 0;
	private _current = 0;

	private _elementsMap: Map<string, DataInterface>;
	private _newElements: Map<TFile, any>;

	constructor(private _app: App, private _updateView: (total: number, current: number, process: string) => void) {
		this._elementsMap = new Map<string, DataInterface>();
		this._newElements = new Map<TFile, any>();
	}

	async updateVault(): Promise<void> {
		const allFiles: TFile[] = this._app.vault.getFiles();

		this._total = allFiles.length;
		this._updateView(this._total, this._current, "Reading files...");

		await Promise.all(
			allFiles.map(async (file: TFile) => {
				this._current++;
				this._updateView(this._total, this._current, "Reading files...");

				await this._readCodeblocks(file);
			})
		);

		this._total = this._elementsMap.size;
		this._current = 0;
		this._updateView(this._total, this._current, "Converting RPG Manager Elements...");

		await Promise.all(
			Array.from(this._elementsMap.entries()).map(async (value: [string, DataInterface]) => {
				this._current++;
				this._updateView(this._total, this._current, "Converting RPG Manager Elements...");

				const codeblock = {
					id: this._convertId(value[0], value[1]),
					data: this._convertData(value[0], value[1]),
					relationships: this._convertRelationships(value[0], value[1]),
					images: this._convertImages(value[0], value[1]),
				};

				if (codeblock.images.length === 0) delete codeblock.images;
				if (codeblock.relationships.length === 0) delete codeblock.relationships;

				this._newElements.set(value[1].file, codeblock);
			})
		);

		this._current = 0;
		this._updateView(this._total, this._current, "Updating files...");

		await Promise.all(
			Array.from(this._newElements.entries()).map(async (value: [TFile, any]) => {
				await this._replaceCodeblock(value[0], value[1]);
				this._current++;
				return this._updateView(this._total, this._current, "Updating files...");
			})
		);
	}

	private _convertId(id: string, data: DataInterface): any {
		const type = this._getType(data.metadata.ID.type);

		const idData: any = {
			type: type,
		};

		if (type !== ElementType.Campaign) {
			const campaignData = this._elementsMap.get(data.metadata.ID.campaignId);

			if (type === ElementType.Adventure || type === ElementType.Session || type === ElementType.Chapter) {
				const parentData = this._elementsMap.get(data.metadata.ID.parentId);

				if (parentData !== undefined) {
					idData.parent = parentData.file.path;
					idData.positionInParent = data.metadata.ID.positionInParent;
				}
			} else if (type === ElementType.Scene) {
				let parentData;
				if (data.metadata.data.data.sessionId !== undefined)
					parentData = this._elementsMap.get(data.metadata.data.data.sessionId);

				if (data.metadata.data.data.positionInSession !== undefined)
					idData.positionInParent = data.metadata.data.data.positionInSession;

				if (parentData === undefined) parentData = this._elementsMap.get(data.metadata.ID.parentId);

				if (parentData !== undefined) {
					idData.parent = parentData.file.path;
					if (idData.positionInParent === undefined) idData.positionInParent = data.metadata.ID.positionInParent;
				}
			}

			if (campaignData !== undefined) idData.campaign = campaignData.file.path;
		}

		return idData;
	}

	private _convertData(id: string, data: DataInterface): any {
		const response: any = {};

		const oldData: any = data.metadata.data.data;

		for (const key in oldData) {
			if (oldData.hasOwnProperty(key) && oldData[key]) {
				switch (key.toLocaleLowerCase()) {
					case "synopsis":
						if (response.description === undefined) {
							response.description = oldData[key];
						} else {
							response.description = oldData[key] + "\n\n" + response.description;
						}
						break;
					case "irl":
						response.sessiondate = oldData[key];
						break;
					case "abtstage":
						response.abtstage = (oldData[key] as string).toLowerCase();
						break;
					case "date":
						response.date = oldData[key];
						break;
					case "duration":
						response.duration = oldData[key];
						break;
					case "action":
						response.action = oldData[key];
						break;
					case "isactedupon":
						response.externalactions = oldData[key];
						break;
					case "scenetype":
						response.scenetype = oldData[key];
						break;
					case "storycirclestage":
						response.storycirclestage = (oldData[key] as string).toLowerCase();
						break;
					case "trigger":
						if (response.description === undefined) {
							response.description = oldData[key];
						} else {
							response.description += "\n\n" + oldData[key];
						}
						break;
					case "dob":
						response.dob = oldData[key];
						break;
					case "death":
						response.dod = oldData[key];
						break;
					case "pronoun":
						response.want = oldData[key];
						break;
					case "address":
						response.address = oldData[key];
						break;
					case "targetduration":
						response.targetDuration = oldData[key];
						break;
					case "images":
					case "sessionid":
					case "durations":
					case "positioninsession":
					case "completed":
					case "complete":
						break;
					default:
						response["FromV3-" + key] = oldData[key];
						break;
				}
			}
		}
		if (data.metadata.data?.plot !== undefined && data.metadata.data.plot?.storycircle !== undefined) {
			const storycircle = data.metadata.data.plot.storycircle;

			if (
				storycircle.you ||
				storycircle.need ||
				storycircle.go ||
				storycircle.search ||
				storycircle.find ||
				storycircle.take ||
				storycircle.return ||
				storycircle.change
			)
				response.storycircle = data.metadata.data.plot.storycircle;
		}

		if (data.metadata.data?.plot !== undefined && data.metadata.data.plot?.abt !== undefined) {
			const abt = data.metadata.data.plot.abt;

			if (abt.need || abt.and || abt.but || abt.therefore) {
				if (response.description === undefined) response.description = "";

				response.description += "\n\nNeed: " + abt.need;
				response.description += "\n\nAnd: " + abt.and;
				response.description += "\n\nBut: " + abt.but;
				response.description += "\n\nTherefore: " + abt.therefore;
			}
		}

		return response;
	}

	private _convertImages(id: string, data: DataInterface): any[] {
		const response: any[] = [];

		const images: any[] | undefined = data.metadata.data?.data?.images;

		if (images === undefined || !Array.isArray(images) || images.length === 0) return response;

		images.forEach((image: any) => {
			const newImage: any = {
				path: image.path,
			};

			if (image.description !== undefined) newImage.description = image.description;

			response.push(newImage);
		});

		return response;
	}

	private _convertRelationships(id: string, data: DataInterface): any[] {
		const response: any[] = [];

		const relationships: any[] | undefined = data.metadata.data?.relationships;

		if (relationships === undefined || !Array.isArray(relationships) || relationships.length === 0) return response;

		relationships.forEach((relationship: any) => {
			const newRelationship: any = {
				path: relationship.path,
				type: relationship.type,
			};

			if (relationship.description) newRelationship.description = relationship.description;

			response.push(newRelationship);
		});

		return response;
	}

	private _getType(typeId: number): string {
		switch (typeId) {
			case 1:
				return ElementType.Campaign;
			case 2:
				return ElementType.Adventure;
			case 4:
				return ElementType.Chapter;
			case 8:
				return ElementType.Scene;
			case 16:
				return ElementType.Session;
			case 32:
				return ElementType.PlayerCharacter;
			case 64:
				return ElementType.NonPlayerCharacter;
			case 128:
				return ElementType.Location;
			case 256:
				return ElementType.Event;
			case 512:
				return ElementType.Clue;
			case 1024:
				return ElementType.Faction;
			case 4096:
				return ElementType.Subplot;
		}
	}

	private async _replaceCodeblock(file: TFile, codeblock: any): Promise<void> {
		const metadata: CachedMetadata | null = this._app.metadataCache.getFileCache(file);

		if (metadata === null || metadata.sections == undefined || metadata.sections.length === 0) return;

		let content = await this._app.vault.read(file);
		const lines = content.split("\n");

		let codeblockData: SectionCache | undefined = undefined;

		const yamlService = new YamlService();

		for (let index = 0; index < metadata.sections.length; index++) {
			codeblockData = metadata.sections[index];

			let type = "";

			if (
				codeblockData !== undefined &&
				(lines[codeblockData.position.start.line] === "```RpgManagerData" ||
					lines[codeblockData.position.start.line] === "```RpgManagerID" ||
					lines[codeblockData.position.start.line] === "```RpgManager")
			) {
				switch (lines[codeblockData.position.start.line]) {
					case "```RpgManagerData":
						type = "data";
						break;
					case "```RpgManagerID":
						type = "ID";
						break;
					case "```RpgManager":
						type = "codeblock";
						break;
				}

				let codeblockContent = "";
				for (
					let lineIndex = codeblockData.position.start.line + 1;
					lineIndex < codeblockData.position.end.line;
					lineIndex++
				) {
					codeblockContent += lines[lineIndex] + "\n";
				}

				if (codeblockContent !== undefined) {
					switch (type) {
						case "data":
							content = content.replace(
								"```RpgManagerData\n" + codeblockContent,
								"\n```RpgManager4\n" + yamlService.stringify(codeblock)
							);
							break;
						case "ID":
							content = content.replace("```RpgManagerID\n" + codeblockContent + "```\n", "");
							content = content.replace("```RpgManagerID\n" + codeblockContent + "```", "");
							break;
						case "codeblock":
							content = content.replace("```RpgManager\n" + codeblockContent + "```\n", "");
							content = content.replace("```RpgManager\n" + codeblockContent + "```", "");
							break;
					}
				}

				content = content.replace(/\[\[.*?\|\]\]\n/g, "");
				content = content.replace(/\[\[.*?\|\]\]/g, "");
			}
		}

		await this._app.vault.modify(file, content);
	}

	private async _readCodeblocks(file: TFile): Promise<void> {
		const metadata: CachedMetadata | null = this._app.metadataCache.getFileCache(file);

		if (metadata === null || metadata.sections == undefined || metadata.sections.length === 0) return;

		const content = await this._app.vault.read(file);
		const lines = content.split("\n");

		let codeblockContent: string | undefined = undefined;
		let codeblockData: SectionCache | undefined = undefined;

		const data = {
			file: file,
			metadata: {
				ID: {},
				data: {},
			},
		};

		let id: string | undefined = undefined;

		for (let index = 0; index < metadata.sections.length; index++) {
			codeblockData = metadata.sections[index];

			let type: "ID" | "data" | undefined = undefined;

			if (
				codeblockData !== undefined &&
				(lines[codeblockData.position.start.line] === "```RpgManagerData" ||
					lines[codeblockData.position.start.line] === "```RpgManagerID")
			) {
				type = lines[codeblockData.position.start.line] === "```RpgManagerData" ? "data" : "ID";

				codeblockContent = "";
				for (
					let lineIndex = codeblockData.position.start.line + 1;
					lineIndex < codeblockData.position.end.line;
					lineIndex++
				) {
					if (type === "ID" && lines[lineIndex].trim().startsWith("id:")) {
						id = lines[lineIndex].trim().split(":")[1].trim().replaceAll('"', "");
					}
					codeblockContent += lines[lineIndex] + "\n";
				}

				if (codeblockContent !== undefined) {
					data.metadata[type] = (await parseYaml(codeblockContent)) ?? {};
				}
			}
		}

		if (id !== undefined) {
			this._elementsMap.set(id, data);
		}
	}
}
