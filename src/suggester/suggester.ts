import {SearchResult, TFile} from "obsidian";

export interface SearchResultInterface {
	title: string,
	file: TFile,
	result?: SearchResult,
}

export interface TextStatusInterface {
	positionInSearch?: number,
	cursorPosition: number,
	linkText?: string,
	fullText: string,
	searchTerm?: string,
}

export interface TextAnalyserInterface{
	analyse(status: TextStatusInterface): void;
}

export interface InputHandlerInterface {
	/** handles the input keypress **/
	new(container: HTMLInputElement): InputHandler;
	confirmSelection(result: SearchResultInterface): Promise<void>;
	cancelSearch(): Promise<void>;
}

export interface ResultDisplayer{
	/** displays the results **/
	fill(results: Array<SearchResultInterface>, left: number, top: number): void;
	hide(): void;
	moveUp(): void;
	moveDown(): void;
	select(): SearchResultInterface;
}

export interface KeyboardEventListenerInterface{
	new(handler: InputHandlerInterface, displayer: ResultDisplayer):KeyboardEventListenerInterface;
	/** handles the document keypress **/
	listener: EventListener;
}

export interface QueryInterface{
	search(term: string): Array<SearchResultInterface>;
}
