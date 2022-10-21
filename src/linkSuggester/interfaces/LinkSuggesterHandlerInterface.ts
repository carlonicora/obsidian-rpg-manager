import {SearchResultInterface} from "../../services/search/interfaces/SearchResultInterface";

export interface LinkSuggesterHandlerInterface {
	confirmSelection(selectedResult: SearchResultInterface): void;
	close(): void;
}
