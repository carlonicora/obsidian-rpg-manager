import {CodeblockWorkerInterface} from "../interfaces/CodeblockWorkerInterface";
import {CodeblockDomainInterface} from "../interfaces/CodeblockDomainInterface";
import {
	CachedMetadata,
	Editor,
	EditorPosition,
	MarkdownView,
	parseYaml,
	SectionCache,
	TFile,
	WorkspaceLeaf
} from "obsidian";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {YamlService} from "../../yamlService/YamlService";
import {FileManipulatorService} from "../../fileManipulatorService/FileManipulatorService";

export class CodeblockWorker implements CodeblockWorkerInterface {
	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public async readContent(
		file?: TFile,
		codeblockName = 'RpgManagerData',
	): Promise<CodeblockDomainInterface|undefined> {
		let editor: Editor|undefined = undefined;
		let cache: CachedMetadata|null = null;
		let codeblock: any;
		let codeblockContent: string|undefined = undefined;
		let codeblockStart: EditorPosition|undefined = undefined;
		let codeblockEnd: EditorPosition|undefined = undefined;
		let fileContent: string|undefined = undefined;

		if (file === undefined){
			const activeView: MarkdownView|null = await this._api.app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView == undefined)
				return undefined;

			editor = await activeView.editor;
			file = await activeView.file;
			fileContent = await this._api.app.vault.read(file);
			cache = await this._api.app.metadataCache.getFileCache(file);

			if (cache == undefined)
				return undefined;

			let codeblockData: SectionCache|undefined = undefined;
			for (let index=0; index<(cache?.sections?.length ?? 0); index++){
				codeblockData = await (cache?.sections !== undefined ? cache.sections[index] : undefined);
				if (codeblockData !== undefined && editor.getLine(codeblockData.position.start.line) === '```' + codeblockName){
					codeblockStart = {line: codeblockData.position.start.line + 1, ch: 0};
					codeblockEnd = {line: codeblockData.position.end.line, ch: 0};
					codeblockContent = await editor.getRange(codeblockStart, codeblockEnd);
					codeblock = await parseYaml(codeblockContent) ?? {};

					break;
				}
			}
		} else {
			fileContent = await this._api.app.vault.read(file);
			const fileContentLines = fileContent.split('\n');
			cache = await this._api.app.metadataCache.getFileCache(file);

			if (cache == undefined)
				return undefined;

			let codeblockData: SectionCache|undefined = undefined;
			for (let index=0; index<(cache?.sections?.length ?? 0); index++) {
				codeblockData = await (cache?.sections !== undefined ? cache.sections[index] : undefined);
				if (codeblockData !== undefined && fileContentLines[codeblockData.position.start.line] === '```' + codeblockName){
					codeblockStart = {line: codeblockData.position.start.line + 1, ch: 0};
					codeblockEnd = {line: codeblockData.position.end.line, ch: 0};

					codeblockContent = '';
					for (let lineIndex=codeblockData.position.start.line+1; lineIndex<codeblockData.position.end.line; lineIndex++){
						codeblockContent += fileContentLines[lineIndex] + '\n';
					}

					if (codeblockContent === undefined)
						return undefined;

					codeblock = await parseYaml(codeblockContent) ?? {};
					break;
				}
			}
		}

		if (
			cache == undefined ||
			file === undefined ||
			fileContent === undefined ||
			codeblockContent === undefined ||
			codeblockStart === undefined ||
			codeblockEnd === undefined
		)
			return undefined;

		const response: CodeblockDomainInterface = {
			editor: editor,
			file: file,
			originalFileContent: fileContent,
			cache: cache,
			codeblock: codeblock,
			codeblockStart: codeblockStart,
			codeblockEnd: codeblockEnd,
			codeblockContent: codeblockContent,
			originalCodeblockContent: codeblockContent,
		};

		return response;
	}

	public async tryReadOpenContent(
		file: TFile,
		codeblockName?: string,
	): Promise<CodeblockDomainInterface|undefined> {
		let editor: Editor|undefined = undefined;
		let cache: CachedMetadata|null = null;
		let codeblock: any;
		let codeblockContent: string|undefined = undefined;
		let codeblockStart: EditorPosition|undefined = undefined;
		let codeblockEnd: EditorPosition|undefined = undefined;

		const activeViews: MarkdownView[] = [];

		this._api.app.workspace.iterateRootLeaves((leaf: WorkspaceLeaf) => {
			try {
				if ((<MarkdownView>leaf.view).file === file)
					activeViews.push(<MarkdownView>leaf.view);

			} catch (e) {
				//no need to catch, just avoid error
			}
		});

		if (activeViews.length === 0)
			return undefined;

		const activeView: MarkdownView = activeViews[0];
		editor = await activeView.editor;
		file = await activeView.file;
		const fileContent: string = await this._api.app.vault.read(file);
		cache = await this._api.app.metadataCache.getFileCache(file);

		if (cache == undefined)
			return undefined;

		let codeblockData: SectionCache|undefined = undefined;
		for (let index=0; index<(cache?.sections?.length ?? 0); index++){
			codeblockData = await (cache?.sections !== undefined ? cache.sections[index] : undefined);
			if (codeblockData !== undefined && editor.getLine(codeblockData.position.start.line) === '```' + codeblockName){
				codeblockStart = {line: codeblockData.position.start.line + 1, ch: 0};
				codeblockEnd = {line: codeblockData.position.end.line, ch: 0};
				codeblockContent = await editor.getRange(codeblockStart, codeblockEnd);
				codeblock = await parseYaml(codeblockContent) ?? {};

				break;
			}
		}

		if (
			cache == undefined ||
			file === undefined ||
			fileContent === undefined ||
			codeblockContent === undefined ||
			codeblockStart === undefined ||
			codeblockEnd === undefined
		)
			return undefined;

		const response: CodeblockDomainInterface = {
			editor: editor,
			file: file,
			originalFileContent: fileContent,
			cache: cache,
			codeblock: codeblock,
			codeblockStart: codeblockStart,
			codeblockEnd: codeblockEnd,
			codeblockContent: codeblockContent,
			originalCodeblockContent: codeblockContent,
		};

		return response;
	}

	public async updateContent(
		domain: CodeblockDomainInterface,
	): Promise<boolean> {
		if (domain.editor !== undefined){
			await domain.editor.replaceRange(this._api.service(YamlService).stringify(domain.codeblock), domain.codeblockStart, domain.codeblockEnd);
			await this._api.app.vault.modify(domain.file, domain.editor.getValue())
				.then(() => {
					this._api.database.readByPath(domain.file.path)?.touch();
					this._api.app.workspace.trigger("rpgmanager:refresh-views");
				});
			return true;
		} else {
			const newContent = await domain.originalFileContent.replace(domain.originalCodeblockContent, domain.codeblockContent);
			await this._api.service(FileManipulatorService).maybeWrite(domain.file, newContent);

			return true;
		}
	}
}
