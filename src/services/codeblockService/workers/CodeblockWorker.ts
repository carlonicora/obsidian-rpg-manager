import {CodeblockWorkerInterface} from "../interfaces/CodeblockWorkerInterface";
import {CodeblockDomainInterface} from "../interfaces/CodeblockDomainInterface";
import {YamlHelper} from "../../../core/helpers/YamlHelper";
import {App, CachedMetadata, Editor, EditorPosition, MarkdownView, parseYaml, SectionCache, TFile} from "obsidian";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export class CodeblockWorker implements CodeblockWorkerInterface {
	constructor(
		private _app: App,
		private _api: RpgManagerApiInterface,
	) {
	}

	public async updateContent(
		domain: CodeblockDomainInterface,
	): Promise<boolean> {
		if (domain.editor !== undefined){
			await domain.editor.replaceRange(YamlHelper.stringify(domain.codeblock), domain.codeblockStart, domain.codeblockEnd);
			this._app.vault.modify(domain.file, domain.editor.getValue())
				.then(() => {
					this._api.database.readByPath(domain.file.path)?.touch();
					this._app.workspace.trigger("rpgmanager:refresh-views");
				});
			return true;
		} else {
			//TODO: Add this part
			return true;
		}
	}

	public async readContent(
		codeblockName: string = 'RpgManagerData',
		file?: TFile,
	): Promise<CodeblockDomainInterface|undefined> {
		let editor: Editor|undefined = undefined;
		let cache: CachedMetadata|null = null;
		let codeblock: any;
		let codeblockContent: string|undefined = undefined;
		let codeblockStart: EditorPosition|undefined = undefined;
		let codeblockEnd: EditorPosition|undefined = undefined;

		if (file === undefined){
			const activeView: MarkdownView|null = await app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView == undefined)
				return undefined;

			editor = await activeView.editor;
			const file: TFile = await activeView.file;
			cache = await this._app.metadataCache.getFileCache(file);

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
			//TODO: Add this part
		}

		if (cache == undefined || file === undefined || codeblockContent === undefined || codeblockStart === undefined || codeblockEnd === undefined)
			return undefined;

		const response: CodeblockDomainInterface = {
			editor: editor,
			file: file,
			cache: cache,
			codeblock: codeblock,
			codeblockStart: codeblockStart,
			codeblockEnd: codeblockEnd,
			codeblockContent: codeblockContent,
		}

		return response;
	}
}
