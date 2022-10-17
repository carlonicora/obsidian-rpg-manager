import {SearchResult, TFile} from "obsidian";

export interface SearchResultInterface {
	title: string,
	file: TFile,
	result?: SearchResult,
}
