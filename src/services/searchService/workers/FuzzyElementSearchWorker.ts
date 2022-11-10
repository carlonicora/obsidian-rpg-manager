import {SearchWorkerInterface} from "../interfaces/SearchWorkerInterface";
import {Component, fuzzySearch, prepareQuery} from "obsidian";
import {SearchResultInterface} from "../interfaces/SearchResultInterface";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {AbstractSearchWorker} from "../abstracts/AbstractSearchWorker";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {ComponentType} from "../../../core/enums/ComponentType";

export class FuzzyElementSearchWorker extends AbstractSearchWorker implements SearchWorkerInterface {
	constructor(
		private _api: RpgManagerApiInterface,
		private _element: ModelInterface,
		private _type?: ComponentType,
	) {
		super();
	}

	public search(
		term: string,
		searchOnlyAliases?: string,
	): Array<SearchResultInterface> {
		const response: Array<SearchResultInterface> = [];

		let query = prepareQuery(term);

		const matches: Map<string, SearchResultInterface> = new Map<string, SearchResultInterface>();

		if (searchOnlyAliases === undefined) {
			this._api.database.read(
				(element: ModelInterface) =>
					element.id.campaignId === this._element.id.campaignId &&
					(this._type !== undefined ? element.id.type === this._type : true)
			).forEach((element: ModelInterface) => {
				if (element.alias.length > 0) {
					element.alias.forEach((alias: string) => {
						const fuzzySearchResult = fuzzySearch(query, alias);
						if (fuzzySearchResult != null && fuzzySearchResult.matches != null && fuzzySearchResult.score < 0) {
							matches.set(element.file.path + alias, {
								title: alias,
								file: element.file,
								alias: alias,
								fancyTitle: this.setFancyName(alias, fuzzySearchResult, true),
								fancySubtitle: this.setFancyName(element.file.path, fuzzySearch(query, element.file.path), false),
								resultScoring: fuzzySearchResult,
							});
						}
					});
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
			});
		} else {
			query = prepareQuery(searchOnlyAliases);
			const element = this._api.database.readByBaseName(term);

			if (element === undefined)
				return [];

			element.alias.forEach((alias: string) => {
				const fuzzySearchResult = fuzzySearch(query, alias);
				matches.set(element.file.path + alias, {
					title: alias,
					file: element.file,
					alias: alias,
					fancyTitle: this.setFancyName(alias, fuzzySearchResult, true),
					fancySubtitle: this.setFancyName(element.file.basename, null, false),
					resultScoring: fuzzySearchResult,
				});
			});
		}

		if (matches.size === 0)
			return [];

		matches.forEach((value: SearchResultInterface) => {
			response.push(value);
		});

		response.sort((a: SearchResultInterface, b: SearchResultInterface) => b.resultScoring.score - a.resultScoring.score);

		return  response;
	}
}
