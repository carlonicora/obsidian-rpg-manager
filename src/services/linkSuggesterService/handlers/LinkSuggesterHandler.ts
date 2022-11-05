import {LinkSuggesterHandlerInterface} from "../interfaces/LinkSuggesterHandlerInterface";
import {LinkSuggesterTextAnalyserInterface} from "../interfaces/LinkSuggesterTextAnalyserInterface";
import {LinkSuggesterSearchResultPopUpInterface} from "../interfaces/LinkSuggesterSearchResultPopUpInterface";
import {LinkSuggesterTextAnalyser} from "../textAnalysers/LinkSuggesterTextAnalyser";
import {LinkSuggesterPopUp} from "../popUps/LinkSuggesterPopUp";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {SearchService} from "../../searchService/SearchService";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {SearchType} from "../../searchService/enums/SearchType";
import {SearchResultInterface} from "../../searchService/interfaces/SearchResultInterface";

export class LinkSuggesterHandler implements LinkSuggesterHandlerInterface {
	private _analyser: LinkSuggesterTextAnalyserInterface;
	private _displayer: LinkSuggesterSearchResultPopUpInterface;
	private _previousSearch?: string;
	private _previousAlias?: string;

	constructor(
		private _api: RpgManagerApiInterface,
		private _containerEl: HTMLInputElement|HTMLTextAreaElement,
		private _component: ModelInterface,
	) {
		this._containerEl.addEventListener('keyup', this._inputEvent.bind(this));
		this._containerEl.addEventListener('keydown', this._textStyleEvent.bind(this));
		this._analyser = new LinkSuggesterTextAnalyser();
		this._displayer = new LinkSuggesterPopUp(this._api, this);
	}

	private _textStyleEvent(
		evt: KeyboardEvent,
	): void {
		if (this._containerEl.selectionStart == undefined || this._containerEl.selectionEnd == undefined)
			return;

		if (this._containerEl.selectionStart === this._containerEl.selectionEnd)
			return;

		if ((evt.metaKey || evt.ctrlKey) && evt.key === 'b')
			this._containerEl.value = this._containerEl.value.substring(0, this._containerEl.selectionStart) +
				'**' +
				this._containerEl.value.substring(this._containerEl.selectionStart, this._containerEl.selectionEnd) +
				'**' +
				this._containerEl.value.substring(this._containerEl.selectionEnd);

		if ((evt.metaKey || evt.ctrlKey) && evt.key === 'i')
			this._containerEl.value = this._containerEl.value.substring(0, this._containerEl.selectionStart) +
				'*' +
				this._containerEl.value.substring(this._containerEl.selectionStart, this._containerEl.selectionEnd) +
				'*' +
				this._containerEl.value.substring(this._containerEl.selectionEnd);
	}

	private _inputEvent(
		evt: KeyboardEvent,
	): void {
		if (this._analyser.isInSearch(this._containerEl.value, this._containerEl.selectionStart)) {
			if (this._analyser.searchTerm !== this._previousSearch || this._analyser.aliasSearch !== this._previousAlias) {
				this._previousSearch = this._analyser.searchTerm;
				this._previousAlias = this._analyser.aliasSearch;

				const getCaretCoordinates = require('./pixelFinder.js');
				const caret = getCaretCoordinates(this._containerEl);
				const x = this._offset(this._containerEl);

				const top: number = x.top + caret.top;
				const left: number = x.left + caret.left;

				this._displayer.fill(
					this._api.service(SearchService).search(this._analyser.searchTerm, SearchType.FuzzyElementSearch, this._component, this._analyser.aliasSearch) ?? [],
					top,
					left,
				);
			}
		} else {
			this._displayer.clear();
		}
	}

	private _offset(el: HTMLInputElement|HTMLTextAreaElement) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}


	public async confirmSelection(
		result: SearchResultInterface,
		position: number,
	): Promise<void> {
		if (result.alias !== undefined)
			this._analyser.replace(result.file.basename + '|' + result.alias);
		else
			this._analyser.replace(result.file.basename);

		this._containerEl.value = this._analyser.fullText;
		this._containerEl.selectionStart = (this._analyser.searchStartPosition ?? 0) + position + 2;
		this._containerEl.selectionEnd = this._containerEl.selectionStart;
		this._containerEl.focus();
	}

	public close(): void {
		this._previousSearch = undefined;
		this._previousAlias = undefined;
		this._displayer.clear();
		this._containerEl.removeEventListener('keyup', this._inputEvent);
	}
}
