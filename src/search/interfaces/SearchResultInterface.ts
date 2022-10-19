import {SearchResult, TFile} from "obsidian";

export interface SearchResultInterface {
	title: string,
	file: TFile,
	result?: SearchResult,
	alias?: string,
	fancyTitle?: HTMLDivElement,
	fancySubtitle?: HTMLDivElement,
	resultScoring?: any,
}
