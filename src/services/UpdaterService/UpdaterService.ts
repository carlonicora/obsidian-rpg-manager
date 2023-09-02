import { ElementType } from "@/data/enums/ElementType";
import { CachedMetadata, SectionCache, TFile, parseYaml } from "obsidian";

interface DataInterface {
	file: TFile;
	metadata: {
		ID: any;
		data: any;
	};
}

export class UpdaterService {
	private _process = "";
	private _total = 0;
	private _current = 0;

	private _elementsMap: Map<string, DataInterface>;
	private _newElements: Map<TFile, any>;

	constructor(private _updateView: (total: number, current: number, process: string) => void) {
		this._elementsMap = new Map<string, DataInterface>();
		this._newElements = new Map<TFile, any>();
	}

	async updateVault(): Promise<void> {
		const allFiles: TFile[] = app.vault.getFiles();

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

				this._newElements.set(value[1].file, codeblock);
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
				if (data.metadata.data.sessionId !== undefined)
					parentData = this._elementsMap.get(data.metadata.data.sessionId);

				if (parentData === undefined) parentData = this._elementsMap.get(data.metadata.ID.parentId);

				if (parentData !== undefined) {
					idData.parent = parentData.file.path;
					idData.positionInParent = data.metadata.ID.positionInParent;
				}
			}

			if (campaignData !== undefined) idData.campaign = campaignData.file.path;
		}

		return idData;
	}

	private _convertData(id: string, data: DataInterface): any {
		const response: any = {};

		for (const key in data.metadata.data) {
			if (data.metadata.data.hasOwnProperty(key)) {
				switch (key.toLocaleLowerCase()) {
					case "synopsis":
					case "action":
						response.description = data.metadata.data[key];
						break;
					case "irl":
						response.sessiondate = data.metadata.data[key];
						break;
					case "abtstage":
						response.abtstage = data.metadata.data[key];
						break;
					case "date":
						response.date = data.metadata.data[key];
						break;
					case "duration":
						response.duration = data.metadata.data[key];
						break;
				}
			}
		}

		return response;
	}

	private _convertImages(id: string, data: DataInterface): any[] {
		const response: any[] = [];

		if (data.metadata.data.images === undefined || data.metadata.data.images.length === 0) return response;

		data.metadata.data.images.forEach((image: any) => {
			const newImage: any = {
				path: image.path,
			};

			if (image.description !== undefined) newImage.description = image.description;

			response.push(newImage);
		});

		return response;
	}

	private _convertRelationships(id: string, data: DataInterface): any[] {
		return [];
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

	private async _readCodeblocks(file: TFile): Promise<void> {
		const metadata: CachedMetadata | null = app.metadataCache.getFileCache(file);

		if (metadata === null || metadata.sections == undefined || metadata.sections.length === 0) return;

		const content = await app.vault.read(file);
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
