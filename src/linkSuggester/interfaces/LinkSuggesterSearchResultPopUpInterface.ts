import {SearchResultInterface} from "../../services/search/interfaces/SearchResultInterface";

export interface LinkSuggesterSearchResultPopUpInterface {
	fill(results: Array<SearchResultInterface>, top: number, left: number): void;
	clear(): void;
}
