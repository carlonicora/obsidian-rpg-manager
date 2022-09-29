import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {FileEditorInterface} from "../interfaces/dataManipulation/FileEditorInterface";
import {App, CachedMetadata, parseYaml, stringifyYaml, TFile} from "obsidian";

export class FileEditor extends AbstractRpgManager implements FileEditorInterface {
	private fileContent: string;
	private cachedFile: CachedMetadata;

	constructor(
		app: App,
		private file: TFile,
		fileContent: string|undefined=undefined,
	) {
		super(app);

		if (fileContent !== undefined) this.fileContent = fileContent;
	}

	public get arrayContent(
	): Array<string> {
		return this.fileContent.split('\n');
	}

	public get content(
	): string {
		return this.fileContent;
	}

	public getCodeBloksMetadata(
	): Array<any>{
		const response: Array<any> = [];

		const arrayContent: Array<string> = this.arrayContent;

		for (let index = 0; index < (this.cachedFile.sections?.length ?? 0); index++) {
			const section = (this.cachedFile.sections !== undefined ? this.cachedFile.sections[index] : undefined);
			if (section !== undefined) {
				if (section.type === 'code') {
					if (arrayContent[section.position.start.line] === '```RpgManager') {
						let codeBlockContent = '';
						for (let index = section.position.start.line + 2; index < arrayContent.length; index++) {
							if (arrayContent[index] === '```') break;
							if (arrayContent[index] !== '') codeBlockContent += arrayContent[index] + '\n';
						}
						if (codeBlockContent !== '') response.push(parseYaml(codeBlockContent));
					}
				}
			}
		}

		return response;
	}

	public getCodeBlockMetadata(
		codeBlockIdentifier: string,
		requestString = false,
	): any|undefined {
		const arrayContent: Array<string> = this.arrayContent;

		for (let index=0; index<(this.cachedFile.sections?.length ?? 0); index++) {
			const section = (this.cachedFile.sections !== undefined ? this.cachedFile.sections[index] : undefined);
			if (section !== undefined) {
				if (section.type === 'code'){
					if (arrayContent[section.position.start.line] === '```RpgManager' && arrayContent[section.position.start.line+1] === codeBlockIdentifier){
						let codeBlockContent = '';
						for (let index=section.position.start.line+2; index<arrayContent.length; index++){
							if (arrayContent[index] === '```') break;
							codeBlockContent += arrayContent[index] + '\n';
						}

						if (codeBlockContent !== '') {
							if (!requestString) return parseYaml(codeBlockContent);
							return codeBlockContent;
						}
					}
				}
			}
		}

		return undefined;
	}

	public async maybeReplaceCodeBlockMetadata(
		codeBlockIdentifier: string,
		newMetadata: any,
	): Promise<void> {
		const arrayContent: Array<string> = this.arrayContent;

		const newArrayContent: Array<string> = [];
		let inCorrectCodeBlock = false;
		for (let index=0; index<arrayContent.length; index++) {
			if (inCorrectCodeBlock){
				if (arrayContent[index] === '```'){
					inCorrectCodeBlock = false;
					const newCodeBlock = stringifyYaml(newMetadata);
					const newCodeBlockArray = newCodeBlock.split('\n');
					newArrayContent.push(...newCodeBlockArray);
					newArrayContent.push('```');
				}
			} else {
				newArrayContent.push(arrayContent[index]);
				if (arrayContent[index] === '```RpgManager' && arrayContent[index+1] === codeBlockIdentifier) {
					inCorrectCodeBlock = true;
					newArrayContent.push(arrayContent[index+1]);
				}
			}
		}

		const newContent: string = newArrayContent.join('\n');
		if (newContent !== this.fileContent){
			await this.app.vault.modify(this.file, newContent);
			this.database.onSave(this.file);
		}
	}

	public async maybeReplace(
		content: string,
		newContent: string,
	): Promise<void> {
		return Promise.resolve(undefined);
	}

	public async maybeWrite(
		newContent: string,
	): Promise<void> {
		return Promise.resolve(undefined);
	}

	public async read(
	): Promise<boolean> {
		const cache: CachedMetadata|null = await this.app.metadataCache.getFileCache(this.file);
		if (cache === null) return false;

		this.cachedFile = cache;

		if (this.fileContent === undefined) this.fileContent = await this.app.vault.read(this.file);

		return true;
	}
}
