import {SearchWorkerInterface} from "../interfaces/SearchWorkerInterface";
import {App, fuzzySearch, prepareQuery, SearchResult, TFile} from "obsidian";
import {SearchResultInterface} from "../interfaces/SearchResultInterface";
import {AbstractRpgManager} from "../../../abstracts/AbstractRpgManager";
import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";
import {element} from "svelte/internal";

export class FuzzyElementSearchWorker extends AbstractRpgManager implements SearchWorkerInterface {
	constructor(
		app: App,
		private _element: ComponentInterface,
	) {
		super(app);
	}

	public search(
		term: string,
	): Array<SearchResultInterface> {
		const response: Array<SearchResultInterface> = [];

		const query = prepareQuery(term);

		const matches: Map<string, SearchResultInterface> = new Map<string, SearchResultInterface>();


		this.database.read(
			(element: ComponentInterface) =>
				element.id.campaignId === this._element.id.campaignId
		).forEach((element: ComponentInterface) => {
			if (element.alias.length > 0){
				element.alias.forEach((alias: string) => {
					const fuzzySearchResult = fuzzySearch(query, alias);
					if (fuzzySearchResult != null && fuzzySearchResult.matches != null && fuzzySearchResult.score < 0){
						matches.set(element.file.path, {
							title: alias,
							file: element.file,
							alias: alias,
							fancyTitle: this._setFancyName(alias, fuzzySearchResult, true),
							fancySubtitle: this._setFancyName(element.file.path, fuzzySearch(query, element.file.path), false),
							resultScoring: fuzzySearchResult,
						});
					}
				})
			}

			if (!matches.has(element.file.path)) {
				const fuzzySearchResult = fuzzySearch(query, element.file.basename);
				if (fuzzySearchResult != null && fuzzySearchResult.matches !== null && fuzzySearchResult.score < 0) {
					matches.set(element.file.path, {
						title: element.file.basename,
						file: element.file,
						fancyTitle: this._setFancyName(element.file.basename, fuzzySearchResult, true),
						fancySubtitle: this._setFancyName(element.file.path, fuzzySearch(query, element.file.path), false),
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
