import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {FileManipulatorInterface} from "./interfaces/FileManipulatorInterface";
import {App, CachedMetadata, parseYaml, TFile} from "obsidian";
import {FilePatternPositionInterface} from "./interfaces/FilePatternPositionInterface";
import {YamlHelper} from "../helpers/YamlHelper";

export class FileManipulator extends AbstractRpgManager implements FileManipulatorInterface {
	private _fileContent: string;
	public cachedFile: CachedMetadata;

	constructor(
		app: App,
		public file: TFile,
		fileContent: string|undefined=undefined,
	) {
		super(app);

		if (fileContent !== undefined) this._fileContent = fileContent;
	}

	public get arrayContent(
	): string[] {
		return this._fileContent.split('\n');
	}

	public get content(
	): string {
		return this._fileContent;
	}

	public getCodeBlockMetadata(
		requestString = false,
	): any|undefined {
		const arrayContent: string[] = this.arrayContent;

		for (let index=0; index<(this.cachedFile.sections?.length ?? 0); index++) {
			const section = (this.cachedFile.sections !== undefined ? this.cachedFile.sections[index] : undefined);
			if (section !== undefined) {
				if (section.type === 'code'){
					if (arrayContent[section.position.start.line] === '```RpgManagerData'){
						let codeBlockContent = '';
						for (let index=section.position.start.line+1; index<arrayContent.length; index++){
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
		newMetadata: any,
	): Promise<void> {
		const arrayContent: string[] = this.arrayContent;

		const newArrayContent: string[] = [];
		let inCorrectCodeBlock = false;
		let correctBlockProcessed = false;
		for (let index=0; index<arrayContent.length; index++) {
			if (inCorrectCodeBlock){
				if (arrayContent[index] === '```'){
					correctBlockProcessed = true;
					inCorrectCodeBlock = false;
					const newCodeBlock = YamlHelper.stringify(newMetadata);
					const newCodeBlockArray = newCodeBlock.split('\n');
					newArrayContent.push(...newCodeBlockArray);
					newArrayContent.push('```');
				}
			} else {
				newArrayContent.push(arrayContent[index]);
				if (!correctBlockProcessed && arrayContent[index] === '```RpgManagerData') {
					inCorrectCodeBlock = true;
				}
			}
		}

		const newContent: string = newArrayContent.join('\n');
		if (newContent !== this._fileContent){
			await this.app.vault.modify(this.file, newContent);

			await this.database.onSave(this.file)
				.then(() => {
					this.factories.runningTimeManager.updateMedianTimes();
					this.database.readByPath(this.file.path)?.touch();
					this.app.workspace.trigger("rpgmanager:force-refresh-views");``
				});
		}
	}

	public async maybeWrite(
		newContent: string,
	): Promise<boolean> {
		if (newContent === this.content)
			return false;

		return this.app.vault.modify(this.file, newContent)
			.then(() => {
				this.database.onSave(this.file);
				return true;
			});
	}

	public async read(
	): Promise<boolean> {
		const cache: CachedMetadata|null = await this.app.metadataCache.getFileCache(this.file);
		if (cache === null) return false;

		this.cachedFile = cache;

		if (this._fileContent === undefined) this._fileContent = await this.app.vault.read(this.file);

		return true;
	}

	public patternPosition(
		pattern: string[],
	): FilePatternPositionInterface|undefined {
		const arrayContent: string[] = this.arrayContent;

		let startLine: number|undefined = undefined;
		let endLine: number|undefined = undefined;
		let isPartialStart: boolean|undefined = undefined;
		let isPartialEnd: boolean|undefined = undefined;

		let analysedLine = 0;
		for (let index=0; index<arrayContent.length; index++){
			const line = arrayContent[index];
			let isMatching = false;
			if (analysedLine === 0 && pattern.length === 1){
				isMatching = line === pattern[0];
				if (isMatching){
					startLine = index;
					isPartialStart = false;
				}
			} else if (analysedLine === 0){
				isMatching = line.endsWith(pattern[0]);

				if (isMatching){
					startLine = index;
					isPartialStart = line !== pattern[0];
				}
			} else if (analysedLine === pattern.length -1){
				isMatching = line.startsWith(pattern[pattern.length-1]);

				if (isMatching){
					endLine = index;
					isPartialEnd = line !== pattern[pattern.length-1];
				}
			} else {
				isMatching = line === pattern[analysedLine];
			}

			if (isMatching){
				analysedLine++;
				if (startLine !== undefined && endLine !== undefined && isPartialStart !== undefined && isPartialEnd !== undefined){
					return {
						partialEnd: isPartialEnd,
						partialStart: isPartialStart,
						start: startLine,
						end: endLine + 1,
						content: pattern,
					}
				}
			} else if (analysedLine !== 0) {
				analysedLine = 0;
				startLine = undefined
				endLine = undefined;
				isPartialStart = undefined;
				isPartialEnd = undefined;
			}
		}

		return undefined;
	}

	public async replacePattern(
		patternPosition: FilePatternPositionInterface,
		content: string[],
	): Promise<void> {
		const arrayContent: string[] = this.arrayContent;

		if (patternPosition.partialStart){
			arrayContent[patternPosition.start].replace(patternPosition.content[0], content[0]);
			patternPosition.start++;
		}

		if (patternPosition.partialEnd){
			arrayContent[patternPosition.end].replace(arrayContent[patternPosition.end], content[content.length -1]);
			content.splice(content.length -1, 1);
			patternPosition.end--;
		}

		arrayContent.splice(patternPosition.start, patternPosition.end - patternPosition.start, ...content);

		this.maybeWrite(arrayContent.join('\n'));
	}
}
