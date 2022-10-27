import {SearchResultInterface} from "../../searchService/interfaces/SearchResultInterface";

export interface LinkSuggesterHandlerInterface {
	confirmSelection(selectedResult: SearchResultInterface): void;
	close(): void;
}
