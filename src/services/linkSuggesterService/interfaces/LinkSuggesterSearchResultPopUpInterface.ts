import {SearchResultInterface} from "../../searchService/interfaces/SearchResultInterface";

export interface LinkSuggesterSearchResultPopUpInterface {
	fill(results: Array<SearchResultInterface>, top: number, left: number): void;
	clear(): void;
}
