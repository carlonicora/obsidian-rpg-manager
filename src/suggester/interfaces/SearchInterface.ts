import {SearchResultInterface} from "./SearchResultInterface";

export interface SearchInterface {
	search(
		term: string,
	):  Array<SearchResultInterface>|undefined;
}
