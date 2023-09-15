import { ElementType } from "@/data/enums/ElementType";
import {
	App,
	CachedMetadata,
	Editor,
	EditorPosition,
	MarkdownView,
	SectionCache,
	TFile,
	WorkspaceLeaf,
	parseYaml,
} from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { RelationshipType } from "src/data/enums/RelationshipType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RelationshipInterface } from "src/data/interfaces/RelationshipInterface";
import { RelationshipFactory } from "src/factories/RelationshipFactory";
import { YamlService } from "../data/classes/YamlService";
import { EditorPositionService } from "./EditorPositionService";
import { TaskInterface } from "./taskService/interfaces/TaskInterface";

export class RpgManagerCodeblockService {
	private _fileContent: string | undefined = undefined;
	private _fileContentLines: string[] = undefined;
	private _metadata: CachedMetadata | null | undefined = undefined;
	private _codeblockContent: string | undefined = undefined;

	constructor(private _app: App, private _api: RpgManagerInterface, private _file: TFile) {}

	private async _readMetadata(): Promise<void> {
		if (this._metadata !== undefined) return;

		this._fileContent = await this._app.vault.read(this._file);
		this._fileContentLines = this._fileContent.split("\n");
		this._metadata = this._app.metadataCache.getFileCache(this._file);
	}

	get metadata(): CachedMetadata | undefined {
		return this._metadata ?? undefined;
	}

	private async _modifyFileContent(content: string): Promise<void> {
		let activeLeaf: WorkspaceLeaf | undefined;

		for (const leaf of this._app.workspace.getLeavesOfType("markdown")) {
			if ((leaf.view as MarkdownView).file === this._file) {
				activeLeaf = leaf;
			}
		}

		if (activeLeaf) {
			const markdownView: MarkdownView = activeLeaf.view as MarkdownView;
			const editor: Editor = markdownView.editor;
			const cursorPosition: EditorPosition = editor.getCursor();
			const scrollInfo: { top: number; left: number } = editor.getScrollInfo();
			EditorPositionService.setEditorPosition(this._file.path, editor, cursorPosition, scrollInfo);
		}

		this._app.vault.modify(this._file, content);
	}

	async update(values: any): Promise<void> {
		const codeblock = await this.readCodeblock();
		if (codeblock === undefined) return;

		if (codeblock.data == undefined) codeblock.data = {};
		if (codeblock.relationships == undefined) codeblock.relationships = [];
		if (codeblock.images == undefined) codeblock.images = [];
		if (codeblock.tasks == undefined) codeblock.tasks = [];

		if (values.data !== undefined) {
			Object.keys(values.data).forEach((key: string) => {
				codeblock.data[key] = values.data[key];
			});
		}

		if (values.relationships !== undefined) {
			values.relationships.forEach((relationship: RelationshipInterface) => {
				const existingRelationship: RelationshipInterface | undefined = codeblock.relationships.find(
					(existingRelationship: RelationshipInterface) => existingRelationship.path === relationship.path
				);
				if (existingRelationship === undefined) {
					codeblock.relationships.push({
						type: relationship.type,
						path: relationship.path,
					});
				} else {
					existingRelationship.type = relationship.type;
				}
			});
		}

		if (values.images !== undefined) {
			values.images.forEach((image: any) => {
				const existingImage: any | undefined = codeblock.images.find(
					(existingImage: any) => existingImage.path === image.path
				);
				if (existingImage === undefined) {
					codeblock.images.push({
						path: image.path,
						caption: image.caption,
					});
				} else {
					existingImage.caption = image.caption;
				}
			});
		}

		if (values.tasks !== undefined) {
			values.tasks.forEach((task: any) => {
				const existingTask: any | undefined = codeblock.tasks.find((existingTask: any) => existingTask.id === task.id);
				if (existingTask === undefined) {
					codeblock.tasks.push({
						id: task.id,
						priority: task.priority,
						name: task.name,
						description: task.description,
						complete: task.complete,
					});
				} else {
					existingTask.priority = task.priority;
					existingTask.name = task.name;
					existingTask.description = task.description;
					existingTask.complete = task.complete;
				}
			});
		}

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async updateRelationshipInContent(relationships: RelationshipInterface[]): Promise<void> {
		await this._readMetadata();
		if (this._metadata === null) return undefined;

		const element = this._api.get(this._file.path) as ElementInterface;

		if (element.type === ElementType.Campaign) return;

		const relationshipsNotInContent = relationships.filter(
			(relationship: RelationshipInterface) =>
				relationship.component !== undefined ||
				(relationship.isInContent === false && relationship.isAlsoInContent !== true)
		);
		if (relationshipsNotInContent.length === 0) return;

		const relationshipsToAdd: string[] = relationshipsNotInContent.map((relationship: RelationshipInterface) => {
			if (relationship.component === undefined) return undefined;
			return "[[" + relationship.component.path + "|]]";
		});

		relationshipsToAdd.filter((relationship: string | undefined) => relationship !== undefined);

		const toAdd: string = relationshipsToAdd.join("\n");

		const relationshipsAddedToContent: string[] = this._fileContentLines.filter(
			(line: string) => line.startsWith("[[") && line.endsWith("|]]")
		);

		const toRemove: string = relationshipsAddedToContent.join("\n");

		if (toRemove === toAdd) return;

		const fileContent = this._fileContent;
		if (toRemove !== toAdd) {
			if (toRemove === "") {
				this._fileContentLines.push(...relationshipsToAdd);
				this._fileContent = this._fileContentLines.join("\n");
			} else {
				this._fileContent.replace(toRemove, toAdd);
			}
		}

		if (fileContent !== this._fileContent) this._modifyFileContent(this._fileContent);
	}

	async readCodeblock(): Promise<any | undefined> {
		await this._readMetadata();
		if (this._metadata === null) return undefined;

		let codeblockContent: string | undefined = undefined;
		let codeblockData: SectionCache | undefined = undefined;

		for (let index = 0; index < (this._metadata?.sections?.length ?? 0); index++) {
			codeblockData = this._metadata?.sections !== undefined ? this._metadata.sections[index] : undefined;
			if (
				codeblockData !== undefined &&
				this._fileContentLines[codeblockData.position.start.line] === "```RpgManager4"
			) {
				codeblockContent = "";
				for (
					let lineIndex = codeblockData.position.start.line + 1;
					lineIndex < codeblockData.position.end.line;
					lineIndex++
				) {
					codeblockContent += this._fileContentLines[lineIndex] + "\n";
				}

				if (codeblockContent === undefined) return undefined;

				this._codeblockContent = codeblockContent;

				return (await parseYaml(codeblockContent)) ?? {};
			}
		}

		return undefined;
	}

	async addCodeBlock(rpgManagerCodeblock: any): Promise<TFile | undefined> {
		await this._readMetadata();
		if (this._metadata === null) return undefined;

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(rpgManagerCodeblock);
		const codeblockContentLines: string[] = codeblockContent.split("\n");
		codeblockContentLines.pop();

		let newContent: string[] = [];
		if (this._metadata.frontmatter === undefined) {
			newContent = ["", "```RpgManager4", ...codeblockContentLines, "```", "", ...this._fileContentLines];
		} else {
			let frontmatterStarted = false;
			let frontmatterEnded = false;
			let codeblockAdded = false;

			this._fileContentLines.forEach((line: string) => {
				if (line === "---") {
					if (frontmatterStarted) {
						frontmatterEnded = true;
					} else {
						frontmatterStarted = true;
					}
				}

				newContent.push(line);

				if (frontmatterStarted && frontmatterEnded && !codeblockAdded) {
					newContent.push("", "```RpgManager4", ...codeblockContentLines, "```", "");
					codeblockAdded = true;
				}
			});
		}

		this._modifyFileContent(newContent.join("\n"));

		return this._file;
	}

	async updateImage(path: string, caption: string): Promise<void> {
		const codeblock = await this.readCodeblock();
		if (codeblock === undefined || codeblock.images === undefined) return;

		const image = codeblock.images.find((image: any) => image.path === path);
		image.caption = caption;

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async addOrUpdateAttribute(attribute: AttributeInterface): Promise<void> {
		const codeblock = await this.readCodeblock();

		let existingAttribute: any = undefined;
		if (codeblock.attributes == undefined) {
			codeblock.attributes = [];
		} else {
			existingAttribute = codeblock.attributes.find((att: any) => att.id === attribute.id);
		}

		if (existingAttribute === undefined) {
			existingAttribute = attribute;
			codeblock.attributes.push(existingAttribute);
		} else {
			existingAttribute.customName = attribute.customName;
			existingAttribute.type = attribute.type;
			existingAttribute.customTypes = attribute.customTypes;
			if (attribute.options) existingAttribute.options = attribute.options;
		}

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async updateRelationship(relationship: RelationshipInterface): Promise<void> {
		const codeblock = await this.readCodeblock();

		let existingRelationship: any = undefined;
		if (codeblock.relationships == undefined) {
			codeblock.relationships = [];
		} else {
			existingRelationship = codeblock.relationships.find((rel: any) => rel.path === relationship.path);
		}

		if (existingRelationship === undefined) {
			existingRelationship = {
				type: relationship.type,
				path: relationship.path,
				description: relationship.description,
			};
			codeblock.relationships.push(existingRelationship);
		} else {
			existingRelationship.type = relationship.type;
			existingRelationship.description = relationship.description;
		}

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async updateCodeblockDataList(attributes: any[]): Promise<void> {
		const codeblock = await this.readCodeblock();
		if (codeblock === undefined) return;

		if (codeblock.data == undefined) codeblock.data = {};

		attributes.forEach((attribute: { name: string; value?: string | boolean | number | [] | any }) => {
			if (attribute.value !== undefined) {
				codeblock.data[attribute.name] = attribute.value;
			} else {
				delete codeblock.data[attribute.name];
			}
		});

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async updateCodeblockSubData(names: string[], value: any | undefined): Promise<void> {
		const codeblock = await this.readCodeblock();
		if (codeblock === undefined) return;

		if (codeblock.data == undefined) codeblock.data = {};

		let subData: any = codeblock.data;
		names.forEach((name: string, index: number) => {
			if (index === names.length - 1) {
				if (value !== undefined) {
					subData[name] = value;
				} else {
					delete subData[name];
				}
			} else {
				if (subData[name] === undefined) subData[name] = {};
				subData = subData[name];
			}
		});

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async updateCodeblockData(name: string, value: any | undefined): Promise<void> {
		return this.updateCodeblockDataList([{ name, value }]);
	}

	async updateCodeblockId(name: string, value: any | undefined): Promise<void> {
		return this.updateCodeblockIdList([{ name, value }]);
	}

	async updateCodeblockIdList(ids: any[]): Promise<void> {
		const codeblock = await this.readCodeblock();
		if (codeblock === undefined) return;

		ids.forEach((id: { name: string; value: string | boolean | number }) => {
			if (id.value !== undefined) {
				codeblock.id[id.name] = id.value;
			} else {
				delete codeblock.data[id.name];
			}
		});

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async updateRelationshipsPaths(toFile: TFile, oldPath: string): Promise<void> {
		await this.readCodeblock();

		if (this._codeblockContent.indexOf(oldPath) === -1) return;

		const oldBaseName = oldPath.split("/").pop().substring(0, oldPath.split("/").pop().lastIndexOf("."));

		let newCodeblockContent = this._codeblockContent.replaceAll(oldPath, toFile.path);
		if (oldBaseName !== toFile.basename && newCodeblockContent.indexOf("|" + oldBaseName) !== -1)
			newCodeblockContent = newCodeblockContent.replaceAll("|" + oldBaseName, "|" + toFile.basename);

		const content = this._fileContent.replace(this._codeblockContent, newCodeblockContent);

		//content = content.replaceAll("[[" + oldPath + "|]]", "[[" + toFile.path + "|]]");

		this._modifyFileContent(content);
	}

	async addImage(path: string, caption: string): Promise<void> {
		return this.addImages([{ path: path, caption: caption }]);
	}

	async addImages(images: { path: string; caption: string }[]): Promise<void> {
		const codeblock = await this.readCodeblock();
		if (codeblock.images == undefined) codeblock.images = [];

		images.forEach((image: { path: string; caption: string }) => {
			codeblock.images.push(image);
		});

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async addRelationship(relationship: RelationshipInterface): Promise<void> {
		const codeblock = await this.readCodeblock();
		if (codeblock.relationships == undefined) codeblock.relationships = [];

		const minimalRelationship: any = {
			type: relationship.type,
			path: relationship.path,
		};

		codeblock.relationships.push(minimalRelationship);

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async addOrUpdateTask(task: TaskInterface): Promise<void> {
		const codeblock = await this.readCodeblock();
		if (codeblock.tasks == undefined) codeblock.tasks = [];

		const existingTaskIndex = codeblock.tasks.findIndex((existingTask: any) => existingTask.id === task.id);
		if (existingTaskIndex !== -1) {
			codeblock.tasks[existingTaskIndex] = task.prepare();
		} else {
			codeblock.tasks.push(task.prepare());
		}

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async deleteTask(task: TaskInterface): Promise<void> {
		const codeblock = await this.readCodeblock();
		if (codeblock.tasks == undefined || codeblock.tasks.length === 0) return;

		const existingTaskIndex = codeblock.tasks.findIndex((existingTask: any) => existingTask.id === task.id);
		if (existingTaskIndex !== -1) {
			codeblock.tasks.splice(existingTaskIndex, 1);
		}

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async addRelationships(relationships: RelationshipInterface[]): Promise<void> {
		const codeblock = await this.readCodeblock();
		if (codeblock.relationships == undefined) codeblock.relationships = [];

		relationships.forEach((relationship: RelationshipInterface) => {
			const foundRelationship: RelationshipInterface | undefined = codeblock.relationships.find(
				(foundRelationship: RelationshipInterface) => foundRelationship.path === relationship.path
			);
			if (foundRelationship !== undefined) return;

			const minimalRelationship: any = {
				type: relationship.type,
				path: relationship.path,
			};
			codeblock.relationships.push(minimalRelationship);
		});

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async removeRelationship(element: ElementInterface, relatedElement: ElementInterface): Promise<void> {
		const codeblock = await this.readCodeblock();
		if (codeblock.relationships === undefined || codeblock.relationships.length === 0) return;

		codeblock.relationships = codeblock.relationships.filter(
			(minimalRelationship: any) => minimalRelationship.path !== relatedElement.file.path
		);

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		relatedElement.relationships = relatedElement.relationships.filter(
			(relationship: RelationshipInterface) => relationship.path !== element.file.path
		);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async removeImage(path: string): Promise<void> {
		const codeblock = await this.readCodeblock();
		if (codeblock === undefined || codeblock.images === undefined) return;

		codeblock.images = codeblock.images.filter((image: any) => image.path !== path);

		const yamlService: YamlService = new YamlService();
		const codeblockContent: string = yamlService.stringify(codeblock);

		this._modifyFileContent(this._fileContent.replace(this._codeblockContent, codeblockContent));
	}

	async readInContentRelationships(): Promise<RelationshipInterface[]> {
		await this.readCodeblock();

		const response: RelationshipInterface[] = [];

		const yamlService = new YamlService();
		const codeblockStringWithoutRelationships = parseYaml(this._codeblockContent);
		codeblockStringWithoutRelationships.relationships = [];
		const codeblockWithoutRelationships = yamlService.stringify(codeblockStringWithoutRelationships);
		response.push(...this._getRelationshipsFromContent(codeblockWithoutRelationships, true));

		const additionalRelationships = this._getRelationshipsFromContent(
			this._fileContent.replace(this._codeblockContent, ""),
			false
		);
		additionalRelationships.forEach((relationship: RelationshipInterface) => {
			const existingRelationship: RelationshipInterface | undefined = response.find(
				(existingRelationship: RelationshipInterface) => existingRelationship.path === relationship.path
			);
			if (existingRelationship === undefined) {
				response.push(relationship);
			} else {
				if (!existingRelationship.isAlsoInContent) existingRelationship.isAlsoInContent = true;
			}
		});

		return response;
	}

	private _getRelationshipsFromContent(content: string, isInCodeblock: boolean): RelationshipInterface[] {
		const response: RelationshipInterface[] = [];

		if (isInCodeblock) {
			const regex = /"([^"]+\.md)"/g;
			let match;

			while ((match = regex.exec(content)) !== null) {
				response.push(RelationshipFactory.createFromCodeblock(RelationshipType.Bidirectional, match[1]));
			}
		}

		let indexOfRelationship: number = content.indexOf("[[");

		while (indexOfRelationship !== -1) {
			content = content.substring(content.indexOf("[[") + 2);
			const endLinkIndex = content.indexOf("]]");
			if (endLinkIndex === -1) break;

			const nameAndAlias = content.substring(0, endLinkIndex);

			const aliasIndex = nameAndAlias.indexOf("|");
			let basename: string | undefined = undefined;
			let skipHiddenLink = false;

			if (aliasIndex === -1) {
				basename = nameAndAlias;
			} else {
				if (nameAndAlias.substring(aliasIndex) === "|") {
					skipHiddenLink = true;
				} else {
					basename = nameAndAlias.substring(0, aliasIndex);
				}
			}

			if (!skipHiddenLink && basename !== undefined) {
				const matchingFile: TFile | undefined = this._app.vault
					.getFiles()
					.find((file) => file.basename === basename || file.path === basename);

				if (
					matchingFile !== undefined &&
					response.find((relationship: RelationshipInterface) => relationship.path === matchingFile.path) === undefined
				) {
					if (isInCodeblock) {
						response.push(RelationshipFactory.createFromCodeblock(RelationshipType.Bidirectional, matchingFile.path));
					} else {
						response.push(RelationshipFactory.createFromContent(RelationshipType.Bidirectional, matchingFile.path));
					}
				}
			}

			indexOfRelationship = content.indexOf("[[");
		}

		return response;
	}
}
