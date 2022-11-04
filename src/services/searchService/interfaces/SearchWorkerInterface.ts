import {SearchResultInterface} from "./SearchResultInterface";

export interface SearchWorkerInterface {
	search(
		term: string,
	): Array<SearchResultInterface>;
}
