import {SearchResultInterface} from "../../search/interfaces/SearchResultInterface";

export interface LinkSuggesterHandlerInterface {
	confirmSelection(selectedResult: SearchResultInterface): void;
	close(): void;
}
