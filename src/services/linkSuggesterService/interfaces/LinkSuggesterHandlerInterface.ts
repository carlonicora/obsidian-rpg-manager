import {SearchResultInterface} from "../../searchService/interfaces/SearchResultInterface";

export interface LinkSuggesterHandlerInterface {
	confirmSelection(selectedResult: SearchResultInterface, position: number): void;
	close(): void;
}
