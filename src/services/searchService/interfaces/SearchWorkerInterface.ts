import {SearchResultInterface} from "./SearchResultInterface";

export interface SearchWorkerInterface {
	search(
		term: string,
		searchOnlyAliases?: string,
	): Array<SearchResultInterface>;
}
