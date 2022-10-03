import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CodeBlockEditorInterface} from "../interfaces/dataManipulation/CodeBlockEditorInterface";
import {MarkdownView, parseYaml, stringifyYaml, TFile} from "obsidian";
import {FileEditor} from "./FileEditor";

export class CodeBlockEditor extends AbstractFactory implements CodeBlockEditorInterface {
	public async stopCurrentDuration(
		file: TFile,
	): Promise<void> {
		const fileEditor = new FileEditor(this.app, file);
		if (!await fileEditor.read()) return;

		const metadata = await fileEditor.getCodeBlockMetadata('sceneNavigation');
		if (metadata === undefined || metadata.durations === undefined) return;

		const durations: Array<string> = metadata.durations;
		let endDurationAdded=false;

		for (let index=0; index<durations.length; index++){
			if (durations[index].indexOf('-') === -1){
				endDurationAdded = true;
				const end:number = Math.floor(Date.now()/1000);
				const start:number = +durations[index];

				durations[index] = durations[index] + '-' + end.toString();

				if (metadata.duration === undefined){
					metadata.duration = 0;
				}

				metadata.duration += (end - start);

				break;
			}
		}

		if (endDurationAdded) {
			await fileEditor.maybeReplaceCodeBlockMetadata('sceneNavigation', metadata);
		}
	}

	public async startNewDuration(
		file: TFile,
	): Promise<void> {
		const fileEditor = new FileEditor(this.app, file);
		if (!await fileEditor.read()) return;

		let metadata = await fileEditor.getCodeBlockMetadata('sceneNavigation');
		if (metadata === undefined) {
			metadata = {};
		}

		if (metadata.durations === undefined) metadata.durations = [];
		const durations: Array<string> = metadata.durations;

		for (let index = 0; index < durations.length; index++) {
			if (durations[index].indexOf('-') === -1) {
				return;
			}
		}

		durations.push(Math.floor(Date.now()/1000).toString());
		await fileEditor.maybeReplaceCodeBlockMetadata('sceneNavigation', metadata);
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

					await editor.replaceRange(stringifyYaml(yaml), start, end);

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
}
