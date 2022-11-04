import {LinkSuggesterTextAnalyserInterface} from "../interfaces/LinkSuggesterTextAnalyserInterface";

export class LinkSuggesterTextAnalyser implements LinkSuggesterTextAnalyserInterface {
	public _cursorPosition: number;
	public fullText: string;
	public linkText?: string;
	public _searchStartPosition?: number;
	public searchTerm: string;
	public alias?: string;

	constructor(
	) {
		this._cursorPosition = 0;
		this.fullText = '';
		this.searchTerm = '';
	}

	public replace(
		searchResult: string,
	): void {
		this.fullText = this.fullText.substring(0, this._searchStartPosition) +
			searchResult +
			']]' +
			this.fullText.substring(this._cursorPosition);
		this._searchStartPosition = undefined;
		this.searchTerm = '';
	}

	public isInSearch(
		fullText: string,
		cursorPosition: number|null,
	): boolean {
		this.fullText = fullText;
		this._cursorPosition = cursorPosition == null ? 0 : cursorPosition;

		if (this._cursorPosition == null)
			return false;

		if (this._searchStartPosition === undefined && this.fullText.length < 2)
			return false;

		if (this._searchStartPosition === undefined){
			if (this._isSearchJustStarted) {
				this._searchStartPosition = this._cursorPosition;
			} else {
				return false;
			}
		} else {
			if (this._isNotInSearchAnyLonger) {
				this._searchStartPosition = undefined;
				return false;
			}
		}

		this.searchTerm = this.fullText.substring(this._searchStartPosition, this._cursorPosition);

		return true;
	}

	private get _isSearchJustStarted(): boolean {
		return this.fullText.substring(this._cursorPosition - 2, this._cursorPosition) === '[[';
	}

	private get _isNotInSearchAnyLonger(): boolean {
		return this.fullText[this._cursorPosition - 1] === '[' && this.fullText[this._cursorPosition - 2] !== '[';
	}
}
