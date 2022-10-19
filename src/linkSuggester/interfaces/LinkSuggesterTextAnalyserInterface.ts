export interface LinkSuggesterTextAnalyserInterface {
	searchTerm: string;
	linkText?: string;
	fullText: string;
	alias?: string;

	isInSearch(fullText: string, cursorPosition: number|null): boolean;
	replace(searchResult: string): void;
}
