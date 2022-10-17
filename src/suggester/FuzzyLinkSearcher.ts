import {App, fuzzySearch, prepareQuery, TFile} from "obsidian";
import {SearchResultInterface} from "./interfaces/SearchResultInterface";
import {SearchInterface} from "./interfaces/SearchInterface";

export class FuzzyLinkSearcher implements SearchInterface{
	constructor(
		private _app: App,
	) {
	}

	public search(
		term: string,
	):  Array<SearchResultInterface>|undefined {
		let response: Array<SearchResultInterface> = [];

		const query = prepareQuery(term);

		const files = this._app.vault.getMarkdownFiles();

		files.forEach((file: TFile) => {
			const metadata = this._app.metadataCache.getFileCache(file);
			if (metadata !== undefined && metadata?.frontmatter?.alias !== undefined && metadata.frontmatter.alias.length >0){
				metadata.frontmatter.alias.forEach((alias: string) => {
					if (term !== undefined && alias.toLowerCase().startsWith(term.toLowerCase())){
						response.push({title: alias, file: file});
					}
				})
			}

			const fuzzySearchResult = fuzzySearch(query, file.basename);
			if (fuzzySearchResult != null && fuzzySearchResult.matches !== null){
				response.push({title: file.basename, file: file, result: fuzzySearchResult});
			}
		})

		if (response.length === 0)
			return undefined;

		response.sort((a: SearchResultInterface, b: SearchResultInterface) => {
			if (a.result === undefined && b.result !== undefined) return -1;
			if (a.result !== undefined && b.result === undefined) return 1;
			if (a.result === undefined && b.result === undefined) return 0;
			if (a.result !== undefined && b.result !== undefined) {
				if (a.result?.score !== undefined && b.result?.score === undefined) return -1;
				if (a.result?.score === undefined && b.result?.score !== undefined) return 1;
				return a.result.score - b.result.score
			}
			return 0;
		});

		return  response;
	}
}
