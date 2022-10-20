import {SearchInterface} from "./interfaces/SearchInterface";
import {App, fuzzySearch, prepareQuery, SearchResult, TFile} from "obsidian";
import {SearchResultInterface} from "./interfaces/SearchResultInterface";

export class FuzzyFileSearch implements SearchInterface {
	constructor(
		private _app: App,
	) {
	}

	public search(
		term: string
	): Array<SearchResultInterface> {
		const response: Array<SearchResultInterface> = [];

		const query = prepareQuery(term);

		const matches: Map<string, SearchResultInterface> = new Map<string, SearchResultInterface>();

		const files = this._app.vault.getMarkdownFiles();
		files.forEach((file: TFile) => {
			const metadata = this._app.metadataCache.getFileCache(file);
			if (metadata !== undefined && metadata?.frontmatter?.alias !== undefined && metadata.frontmatter.alias.length >0){
				metadata.frontmatter.alias.forEach((alias: string) => {
					const fuzzySearchResult = fuzzySearch(query, alias);
					if (fuzzySearchResult != null && fuzzySearchResult.matches != null && fuzzySearchResult.score < 0){
						matches.set(file.path, {
							title: alias,
							file: file,
							alias: alias,
							fancyTitle: this._setFancyName(alias, fuzzySearchResult, true),
							fancySubtitle: this._setFancyName(file.path, fuzzySearch(query, file.path), false),
							resultScoring: fuzzySearchResult,
						});
					}
				})
			}

			if (!matches.has(file.path)) {
				const fuzzySearchResult = fuzzySearch(query, file.basename);
				if (fuzzySearchResult != null && fuzzySearchResult.matches !== null && fuzzySearchResult.score < 0) {
					matches.set(file.path, {
						title: file.basename,
						file: file,
						fancyTitle: this._setFancyName(file.basename, fuzzySearchResult, true),
						fancySubtitle: this._setFancyName(file.path, fuzzySearch(query, file.path), false),
						resultScoring: fuzzySearchResult,
					});

				}
			}
		})

		if (matches.size === 0)
			return [];

		matches.forEach((value: SearchResultInterface) => {
			response.push(value);
		});

		response.sort((a: SearchResultInterface, b: SearchResultInterface) => b.resultScoring.score - a.resultScoring.score);

		return  response;
	}

	private _setFancyName(
		text: string,
		fuzzySearchResult: SearchResult|null,
		isTitle = true,
	): HTMLDivElement {
		const response = document.createElement('div');
		response.addClass(isTitle ? 'suggestion-title' : 'suggestion-note');

		if (fuzzySearchResult == null || fuzzySearchResult.matches == null) {
			response.textContent = text;
			return response;
		}

		let currentTextIndex = 0;
		for(let index=0; index<fuzzySearchResult.matches.length; index++){
			const matchingPart: Array<number> = fuzzySearchResult.matches[index];
			const start = matchingPart[0];
			const end = matchingPart[1];

			if (start > currentTextIndex)
				response.appendChild(document.createTextNode(text.substring(currentTextIndex, start)));

			const responseSpanEl = document.createElement('span');
			responseSpanEl.addClass('suggestion-highlight');
			responseSpanEl.textContent = text.substring(start, end);
			response.appendChild(responseSpanEl as Node)

			currentTextIndex = end;
		}

		if (text.length > currentTextIndex)
			response.appendChild(document.createTextNode(text.substring(currentTextIndex)));

		return response;
	}
}
