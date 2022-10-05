import {AbstractFactory} from "../factories/abstracts/AbstractFactory";
import {CodeBlockManipulatorInterface} from "./interfaces/CodeBlockManipulatorInterface";
import {MarkdownView, parseYaml, stringifyYaml, TFile} from "obsidian";
import {FileManipulator} from "./FileManipulator";
import {RelationshipInterface} from "../relationships/interfaces/RelationshipInterface";
import {ControllerMetadataInterface} from "../metadatas/controllers/ControllerMetadataInterface";
import {
	ControllerMetadataRelationshipInterface
} from "../metadatas/controllers/ControllerMetadataRelationshipInterface";

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
					editor.getLine(stringYaml.position.start.line) === '```RpgManager'
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
					editor.getLine(stringYaml.position.start.line) === '```RpgManager'
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
		yaml: ControllerMetadataInterface,
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
			isInContent: relationship.isInContent,
		}

		yaml.relationships.push(metadataRelationship);
	}

	private _removeRelationship(
		yaml: ControllerMetadataInterface,
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
}
