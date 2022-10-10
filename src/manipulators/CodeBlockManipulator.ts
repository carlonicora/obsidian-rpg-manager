import {AbstractFactory} from "../factories/abstracts/AbstractFactory";
import {CodeBlockManipulatorInterface} from "./interfaces/CodeBlockManipulatorInterface";
import {CachedMetadata, MarkdownView, parseYaml, SectionCache, stringifyYaml, TFile} from "obsidian";
import {FileManipulator} from "./FileManipulator";
import {RelationshipInterface} from "../relationships/interfaces/RelationshipInterface";
import {
	ControllerMetadataRelationshipInterface
} from "../metadatas/controllers/ControllerMetadataRelationshipInterface";
import {FileManipulatorInterface} from "./interfaces/FileManipulatorInterface";
import {ComponentInterface} from "../databases/interfaces/ComponentInterface";
import {ControllerMetadataDataInterface} from "../metadatas/controllers/ControllerMetadataDataInterface";
import {RelationshipType} from "../relationships/enums/RelationshipType";
import {ComponentStage} from "../databases/components/enums/ComponentStage";

export class CodeBlockManipulator extends AbstractFactory implements CodeBlockManipulatorInterface {
	public async stopCurrentDuration(
		file: TFile,
	): Promise<void> {
		const fileEditor = new FileManipulator(this.app, file);
		if (!await fileEditor.read()) return;

		const metadata = await fileEditor.getCodeBlockMetadata();
		if (metadata === undefined || metadata.data.durations === undefined) return;

		const durations: Array<string> = metadata.data.durations;
		let endDurationAdded=false;

		for (let index=0; index<durations.length; index++){
			if (durations[index].indexOf('-') === -1){
				endDurationAdded = true;
				const end:number = Math.floor(Date.now()/1000);
				const start:number = +durations[index];

				durations[index] = durations[index] + '-' + end.toString();

				if (metadata.data.duration === undefined){
					metadata.data.duration = 0;
				}

				metadata.data.duration += (end - start);

				break;
			}
		}

		if (endDurationAdded) {
			await fileEditor.maybeReplaceCodeBlockMetadata(metadata);
		}
	}

	public async startNewDuration(
		file: TFile,
	): Promise<void> {
		const fileEditor = new FileManipulator(this.app, file);
		if (!await fileEditor.read()) return;

		let metadata = await fileEditor.getCodeBlockMetadata();
		if (metadata === undefined) {
			metadata = {
				data: {}
			};
		}

		if (metadata.data.durations === undefined) metadata.data.durations = [];
		const durations: Array<string> = metadata.data.durations;

		for (let index = 0; index < durations.length; index++) {
			if (durations[index].indexOf('-') === -1) {
				return;
			}
		}

		durations.push(Math.floor(Date.now()/1000).toString());
		await fileEditor.maybeReplaceCodeBlockMetadata(metadata);
	}

	public async updateInFile(
		file: TFile,
		identifier: string,
		value: string|boolean|number|undefined,
	): Promise<void> {
		const fileEditor = new FileManipulator(this.app, file);
		if (!await fileEditor.read()) return;

		const metadata = await fileEditor.getCodeBlockMetadata();

		this.updateYamlElement(
			metadata,
			identifier.split('.'),
			value,
		);

		await fileEditor.maybeReplaceCodeBlockMetadata(metadata);
	}

	public async update(
		identifier: string,
		value: string|boolean|number|undefined,
	): Promise<void> {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (activeView != null) {
			const editor = activeView.editor;
			const file = activeView.file;
			const cache = this.app.metadataCache.getFileCache(file);

			let stringYaml: any|undefined;
			for (let index=0; index<(cache?.sections?.length ?? 0); index++){
				stringYaml = (cache?.sections !== undefined ? cache.sections[index] : undefined);

				if (
					stringYaml !== undefined &&
					editor.getLine(stringYaml.position.start.line) === '```RpgManagerData'
				){
					if (stringYaml === undefined) continue;

					const start = {line: stringYaml.position.start.line +1, ch: 0};
					const end = {line: stringYaml.position.end.line, ch: 0};
					const range = editor.getRange(
						start,
						end,
					);
					const yaml = parseYaml(range) ?? {};

					this.updateYamlElement(
						yaml,
						identifier.split('.'),
						value,
					);

					editor.replaceRange(stringifyYaml(yaml), start, end)
					this.app.vault.modify(file, editor.getValue())
						.then(() => {
							this.database.readByPath(file.path)?.touch()
							this.app.workspace.trigger("rpgmanager:force-refresh-views");
						});


					break;
				}
			}
		}
	}

	private updateYamlElement(
		yaml: Partial<any>,
		key: Array<string>,
		value: string|number|boolean|undefined,
	): void {
		if (key == null || key.length === 0) return;

		const initialKeyPart: string|undefined = key.shift();
		if (initialKeyPart === undefined) return;

		if (yaml[initialKeyPart] === undefined) {
			yaml[initialKeyPart] = {};
		}

		if (key.length > 0) {
			return this.updateYamlElement(yaml[initialKeyPart], key, value);
		} else {
			yaml[initialKeyPart] = value;
		}
	}

	public async addOrUpdateRelationship(
		relationship: RelationshipInterface,
	): Promise<void> {
		return this._executeRelationshipChange(
			this._addOrUpdateRelationship.bind(this),
			relationship,
		)
	}

	public async removeRelationship(
		path: string,
	): Promise<void> {
		return this._executeRelationshipChange(
			this._removeRelationship.bind(this),
			path,
		)
	}

	private async _executeRelationshipChange(
		fn: any,
		variable: any,
	): Promise<void> {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (activeView != null) {
			const editor = activeView.editor;
			const file = activeView.file;
			const cache = this.app.metadataCache.getFileCache(file);

			let stringYaml: any|undefined;
			for (let index=0; index<(cache?.sections?.length ?? 0); index++){
				stringYaml = (cache?.sections !== undefined ? cache.sections[index] : undefined);

				if (
					stringYaml !== undefined &&
					editor.getLine(stringYaml.position.start.line) === '```RpgManagerData'
				){
					if (stringYaml === undefined) continue;

					const start = {line: stringYaml.position.start.line +1, ch: 0};
					const end = {line: stringYaml.position.end.line, ch: 0};
					const range = editor.getRange(
						start,
						end,
					);
					const yaml = parseYaml(range) ?? {};

					fn(yaml, variable);

					editor.replaceRange(stringifyYaml(yaml), start, end)
					this.app.vault.modify(file, editor.getValue())
						.then(() => {
							this.database.onSave(file);
							this.app.workspace.trigger("rpgmanager:force-refresh-views");
						});

					break;
				}
			}
		}
	}

	private _addOrUpdateRelationship(
		yaml: ControllerMetadataDataInterface,
		relationship: RelationshipInterface,
	): void {
		if (yaml.relationships === undefined) yaml.relationships = [];

		let found: number|undefined;
		for (let relationshipsIndex=0; relationshipsIndex<yaml.relationships.length; relationshipsIndex++){
			if (relationship.path === yaml.relationships[relationshipsIndex].path){
				found = relationshipsIndex;
				break;
			}
		}

		if (found !== undefined){
			yaml.relationships.splice(found, 1);
		}

		const metadataRelationship: ControllerMetadataRelationshipInterface = {
			type: this.factories.relationshipType.createReadableRelationshipType(relationship.type),
			path: relationship.path,
			description: relationship.description,
		}

		yaml.relationships.push(metadataRelationship);
	}

	private _removeRelationship(
		yaml: ControllerMetadataDataInterface,
		path: string,
	): void {
		if (yaml.relationships === undefined) return;

		let found: number|undefined;
		for (let relationshipsIndex=0; relationshipsIndex<yaml.relationships.length; relationshipsIndex++){
			if (path === yaml.relationships[relationshipsIndex].path){
				found = relationshipsIndex;
				break;
			}
		}

		if (found !== undefined){
			yaml.relationships.splice(found, 1);
		}
	}

	public selectData(
	): void {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (activeView == null) return;

		const editor = activeView.editor;
		const file = activeView.file;
		const cache: CachedMetadata|null = this.app.metadataCache.getFileCache(file);

		if (cache == null) return;

		cache.sections?.forEach((section: SectionCache) => {
			if (section.type === 'code' && editor.getLine(section.position.start.line) === '```RpgManagerData'){
				editor.setSelection({line: section.position.start.line + 1, ch: 0}, {line: section.position.end.line, ch: 0});
				editor.focus();
			}
		});
	}

	public async read(
		fileManipulator: FileManipulatorInterface,
		component: ComponentInterface,
	): Promise<ControllerMetadataDataInterface> {
		return this._addRelationshipsFromContent(
			fileManipulator.content,
			this._readMetadata(fileManipulator.content, fileManipulator.cachedFile),
			component,
		);
	}

	private _addRelationshipsFromContent(
		fileContent: string,
		metadata: ControllerMetadataDataInterface,
		component: ComponentInterface,
	): ControllerMetadataDataInterface {
		if (metadata.relationships == undefined) metadata.relationships = [];

		let content = fileContent;
		let indexOfRelationship: number = content.indexOf('[[');
		while (indexOfRelationship !== -1){
			content = content.substring(content.indexOf('[[') + 2);
			const endLinkIndex = content.indexOf(']]');
			if (endLinkIndex === -1) break;

			const nameAndAlias = content.substring(0, endLinkIndex);
			const aliasIndex = nameAndAlias.indexOf('|');
			let basename: string;
			if (aliasIndex === -1){
				basename = nameAndAlias;
			} else {
				basename = nameAndAlias.substring(0, aliasIndex);
			}

			let path: string|undefined = undefined;
			const allFiles = this.app.vault.getMarkdownFiles();
			for (let filesIndex=0; filesIndex<allFiles.length; filesIndex++){
				if (allFiles[filesIndex].basename === basename){
					path = allFiles[filesIndex].path;
					break;
				}
			}

			if (path !== undefined) {
				let relationshipAlreadyExists = false;
				for(let relationshipsIndex=0; relationshipsIndex<metadata.relationships.length; relationshipsIndex++){
					if (metadata.relationships[relationshipsIndex].path === path) {
						relationshipAlreadyExists = true;
						break;
					}
				}

				if (!relationshipAlreadyExists) {
					let relationship: RelationshipType | undefined = undefined;
					if (component.stage === ComponentStage.Run || component.stage === ComponentStage.Plot) {
						relationship = RelationshipType.Unidirectional;
					} else {
						relationship = RelationshipType.Bidirectional;
					}

					metadata.relationships?.push({
						type: this.factories.relationshipType.createReadableRelationshipType(relationship),
						path: path,
						isInContent: true,
					})
				}
			}

			indexOfRelationship = content.indexOf('[[');
		}

		return metadata;
	}

	private _readMetadata(
		fileContent: string,
		fileCacheMetadata: CachedMetadata,
	): ControllerMetadataDataInterface{
		let response: ControllerMetadataDataInterface = {
			plot: {},
			data: {},
			relationships: [],
		};

		const arrayContent: Array<string> = fileContent.split('\n');
		const sections: Array<SectionCache>|undefined = fileCacheMetadata.sections;

		if (sections !== undefined) {
			for (let index = 0; index < sections.length; index++) {
				const section: SectionCache | undefined = sections[index];
				if (section !== undefined) {
					if (section.type === 'code') {
						if (arrayContent[section.position.start.line] === '```RpgManagerData') {
							let codeBlockContent = '';
							for (let index = section.position.start.line + 1; index < arrayContent.length; index++) {
								if (arrayContent[index] === '```') break;
								if (arrayContent[index] !== '') codeBlockContent += arrayContent[index] + '\n';
							}
							try {
								const newCodeBlockContent: any = parseYaml(codeBlockContent);
								if (codeBlockContent !== '') response = {...response, ...newCodeBlockContent};
							} catch (e) {
								throw new Error('INVALID YAML')
							}
						}
					}
				}
			}
		}

		return response;
	}
}
