import {SearchWorkerInterface} from "../interfaces/SearchWorkerInterface";
import {App, fuzzySearch, prepareQuery, SearchResult, TFile} from "obsidian";
import {SearchResultInterface} from "../interfaces/SearchResultInterface";
import {AbstractSearchWorker} from "../abstracts/AbstractSearchWorker";

export class FuzzyFileSearchWorker extends AbstractSearchWorker implements SearchWorkerInterface {
	constructor(
		app: App,
	) {
		super(app);
	}

	public search(
		term: string
	): Array<SearchResultInterface> {
		const response: Array<SearchResultInterface> = [];

		const query = prepareQuery(term);

		const matches: Map<string, SearchResultInterface> = new Map<string, SearchResultInterface>();

		const files = this.app.vault.getMarkdownFiles();
		files.forEach((file: TFile) => {
			const metadata = this.app.metadataCache.getFileCache(file);
			if (metadata !== undefined && metadata?.frontmatter?.alias !== undefined && metadata.frontmatter.alias.length >0){
				metadata.frontmatter.alias.forEach((alias: string) => {
					const fuzzySearchResult = fuzzySearch(query, alias);
					if (fuzzySearchResult != null && fuzzySearchResult.matches != null && fuzzySearchResult.score < 0){
						matches.set(file.path, {
							title: alias,
							file: file,
							alias: alias,
							fancyTitle: this.setFancyName(alias, fuzzySearchResult, true),
							fancySubtitle: this.setFancyName(file.path, fuzzySearch(query, file.path), false),
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
						fancyTitle: this.setFancyName(file.basename, fuzzySearchResult, true),
						fancySubtitle: this.setFancyName(file.path, fuzzySearch(query, file.path), false),
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
}
