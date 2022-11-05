import {SearchWorkerInterface} from "../interfaces/SearchWorkerInterface";
import {fuzzySearch, prepareQuery, TFile} from "obsidian";
import {SearchResultInterface} from "../interfaces/SearchResultInterface";
import {AbstractSearchWorker} from "../abstracts/AbstractSearchWorker";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export class FuzzyFileSearchWorker extends AbstractSearchWorker implements SearchWorkerInterface {
	constructor(
		private _api: RpgManagerApiInterface,
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
			const files = this._api.app.vault.getMarkdownFiles();
			files.forEach((file: TFile) => {
				const metadata = this._api.app.metadataCache.getFileCache(file);
				if (metadata !== undefined && metadata?.frontmatter?.alias !== undefined && metadata.frontmatter.alias.length > 0) {
					metadata.frontmatter.alias.forEach((alias: string) => {
						const fuzzySearchResult = fuzzySearch(query, alias);
						if (fuzzySearchResult != null && fuzzySearchResult.matches != null && fuzzySearchResult.score < 0) {
							matches.set(file.path + alias, {
								title: alias,
								file: file,
								alias: alias,
								fancyTitle: this.setFancyName(alias, fuzzySearchResult, true),
								fancySubtitle: this.setFancyName(file.path, fuzzySearch(query, file.path), false),
								resultScoring: fuzzySearchResult,
							});
						}
					});
				}

				const fuzzySearchResult = fuzzySearch(query, file.basename);
				if (fuzzySearchResult != null && fuzzySearchResult.matches !== null && fuzzySearchResult.score < 0) {
					matches.set(file.path, {
						title: file.basename,
						file: file,
						fancyTitle: this.setFancyName(file.basename, fuzzySearchResult, true),
						fancySubtitle: this.setFancyName(file.path, fuzzySearch(query, file.path), false),
						resultScoring: fuzzySearchResult,
					});

				}
			});
		} else {
			query = prepareQuery(searchOnlyAliases);
			const files = this._api.app.vault.getMarkdownFiles().filter((file: TFile) => file.basename === term);

			if (files.length === 0)
				return [];

			const metadata = this._api.app.metadataCache.getFileCache(files[0]);
			if (metadata !== undefined && metadata?.frontmatter?.alias !== undefined && metadata.frontmatter.alias.length > 0) {
				metadata.frontmatter.alias.forEach((alias: string) => {
					const fuzzySearchResult = fuzzySearch(query, alias);
					matches.set(files[0].path + alias, {
						title: alias,
						file: files[0],
						alias: alias,
						fancyTitle: this.setFancyName(alias, fuzzySearchResult, true),
						fancySubtitle: this.setFancyName(files[0].basename, null, false),
						resultScoring: fuzzySearchResult,
					});
				});
			}
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
