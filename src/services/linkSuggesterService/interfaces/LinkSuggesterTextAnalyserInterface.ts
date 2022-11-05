export interface LinkSuggesterTextAnalyserInterface {
	searchTerm: string;
	linkText?: string;
	fullText: string;
	alias?: string;
	aliasSearch?: string;
	searchStartPosition?: number;
	isAlreadyClosed: boolean;

	isInSearch(fullText: string, cursorPosition: number|null): boolean;
	replace(searchResult: string): void;
}
