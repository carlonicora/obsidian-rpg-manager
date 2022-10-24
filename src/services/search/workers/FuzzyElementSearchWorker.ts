import {SearchWorkerInterface} from "../interfaces/SearchWorkerInterface";
import {App, fuzzySearch, prepareQuery, SearchResult, TFile} from "obsidian";
import {SearchResultInterface} from "../interfaces/SearchResultInterface";
import {AbstractRpgManager} from "../../../core/abstracts/AbstractRpgManager";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {AbstractSearchWorker} from "../abstracts/AbstractSearchWorker";

export class FuzzyElementSearchWorker extends AbstractSearchWorker implements SearchWorkerInterface {
	constructor(
		app: App,
		private _element: ComponentModelInterface,
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
			(element: ComponentModelInterface) =>
				element.id.campaignId === this._element.id.campaignId
		).forEach((element: ComponentModelInterface) => {
			if (element.alias.length > 0){
				element.alias.forEach((alias: string) => {
					const fuzzySearchResult = fuzzySearch(query, alias);
					if (fuzzySearchResult != null && fuzzySearchResult.matches != null && fuzzySearchResult.score < 0){
						matches.set(element.file.path + alias, {
							title: alias,
							file: element.file,
							alias: alias,
							fancyTitle: this.setFancyName(alias, fuzzySearchResult, true),
							fancySubtitle: this.setFancyName(element.file.path, fuzzySearch(query, element.file.path), false),
							resultScoring: fuzzySearchResult,
						});
					}
				})
			}

			const fuzzySearchResult = fuzzySearch(query, element.file.basename);
			if (fuzzySearchResult != null && fuzzySearchResult.matches !== null && fuzzySearchResult.score < 0) {
				matches.set(element.file.path, {
					title: element.file.basename,
					file: element.file,
					fancyTitle: this.setFancyName(element.file.basename, fuzzySearchResult, true),
					fancySubtitle: this.setFancyName(element.file.path, fuzzySearch(query, element.file.path), false),
					resultScoring: fuzzySearchResult,
				});
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
}
