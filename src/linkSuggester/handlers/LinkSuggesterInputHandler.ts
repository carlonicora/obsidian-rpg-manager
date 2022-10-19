import {LinkSuggesterHandlerInterface} from "../interfaces/LinkSuggesterHandlerInterface";
import {LinkSuggesterTextAnalyserInterface} from "../interfaces/LinkSuggesterTextAnalyserInterface";
import {SearchInterface} from "../../search/interfaces/SearchInterface";
import {LinkSuggesterSearchResultPopUpInterface} from "../interfaces/LinkSuggesterSearchResultPopUpInterface";
import {App} from "obsidian";
import {LinkSuggesterInputTextAnalyser} from "../textAnalysers/LinkSuggesterInputTextAnalyser";
import {FuzzyFileSearch} from "../../search/FuzzyFileSearch";
import {LinkSuggesterPopUp} from "../popUps/LinkSuggesterPopUp";
import {SearchResultInterface} from "../../search/interfaces/SearchResultInterface";

export class LinkSuggesterInputHandler implements LinkSuggesterHandlerInterface {
	private _analyser: LinkSuggesterTextAnalyserInterface;
	private _searcher: SearchInterface;
	private _displayer: LinkSuggesterSearchResultPopUpInterface;
	private _previousSearch: string|undefined;

	constructor(
		private _app: App,
		private _containerEl: HTMLInputElement,
	) {
		this._containerEl.addEventListener('keyup', this._inputEvent.bind(this));
		this._analyser = new LinkSuggesterInputTextAnalyser();
		this._searcher = new FuzzyFileSearch(this._app);
		this._displayer = new LinkSuggesterPopUp(this._app, this);
	}

	private _inputEvent(
		evt: KeyboardEvent,
	): void {
		if (this._analyser.isInSearch(this._containerEl.value, this._containerEl.selectionStart)) {
			if (this._analyser.searchTerm !== this._previousSearch) {
				this._previousSearch = this._analyser.searchTerm;
				this._displayer.fill(this._searcher.search(this._analyser.searchTerm), 200, 200);
			}
		} else {
			this._displayer.clear();
		}
	}

	public async confirmSelection(
		result: SearchResultInterface,
	): Promise<void> {
		if (result.alias !== undefined) {
			this._analyser.replace(result.file.basename + '|' + result.alias);
		} else {
			this._analyser.replace(result.file.basename);
		}
		this._containerEl.value = this._analyser.fullText
		this._containerEl.focus();
	}

	public close(): void {
		this._previousSearch = undefined;
		this._displayer.clear();
		this._containerEl.removeEventListener('keyup', this._inputEvent);
	}
}
