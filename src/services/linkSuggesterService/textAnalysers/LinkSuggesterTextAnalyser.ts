import {LinkSuggesterTextAnalyserInterface} from "../interfaces/LinkSuggesterTextAnalyserInterface";

export class LinkSuggesterTextAnalyser implements LinkSuggesterTextAnalyserInterface {
	public _cursorPosition: number;
	public fullText: string;
	public linkText?: string;
	public lengthBeforeStart: number
	public searchStartPosition?: number;
	public searchTerm: string;
	public alias?: string;
	public aliasSearch?: string;
	public isAlreadyClosed: boolean;

	constructor(
	) {
		this._cursorPosition = 0;
		this.fullText = '';
		this.searchTerm = '';
		this.aliasSearch = undefined;
		this.isAlreadyClosed = false;
		this.lengthBeforeStart = 0;
	}

	public replace(
		searchResult: string,
	): void {
		if (!this.isAlreadyClosed)
			searchResult += ']]';

		this.fullText = this.fullText.substring(0, this.searchStartPosition) +
			searchResult +
			this.fullText.substring(this._cursorPosition);
		this.searchStartPosition = undefined;
		this.isAlreadyClosed = false;
		this.aliasSearch = undefined;
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

		if (this.searchStartPosition === undefined && this.fullText.length < 2)
			return false;

		if (this.searchStartPosition === undefined){
			if (this._isSearchJustStarted) {
				this.searchStartPosition = this._cursorPosition;
			} else if (!this._isInExistingLink) {
				return false;
			}
		} else {
			if (this._isNotInSearchAnyLonger) {
				this.searchStartPosition = undefined;
				return false;
			}
		}

		if (this.searchStartPosition === undefined)
			return false;
		else
			this.lengthBeforeStart = this.searchStartPosition;

		this.searchTerm = this.fullText.substring(this.searchStartPosition, this._cursorPosition);

		const indexOfSeparator = this.searchTerm.indexOf('|');

		if (indexOfSeparator !== -1) {
			this.aliasSearch = this.searchTerm.substring(indexOfSeparator + 1);
			this.searchTerm = this.searchTerm.substring(0, indexOfSeparator);
		} else {
			this.aliasSearch = undefined;
		}

		return true;
	}

	private get _isSearchJustStarted(): boolean {
		return this.fullText.substring(this._cursorPosition - 2, this._cursorPosition) === '[[';
	}

	private get _isNotInSearchAnyLonger(): boolean {
		return this.fullText[this._cursorPosition - 1] === '[' && this.fullText[this._cursorPosition - 2] !== '[';
	}

	private get _isInExistingLink(): boolean {
		const beforeCursor = this.fullText.substring(0, this._cursorPosition - 1);
		const afterCursor = this.fullText.substring(this._cursorPosition);

		const lastOpeningIndexBeforeCursor = beforeCursor.lastIndexOf('[[');
		const lastClosingIndexBeforeCursor = beforeCursor.lastIndexOf(']]');

		if (lastOpeningIndexBeforeCursor === -1 || lastClosingIndexBeforeCursor > lastOpeningIndexBeforeCursor)
			return false;

		const firstOpeningIndexAfterCursor = afterCursor.indexOf('[[');
		const firstClosingIndexAfterCursor = afterCursor.indexOf(']]');

		if (firstClosingIndexAfterCursor === -1 || (firstOpeningIndexAfterCursor !== -1 && firstOpeningIndexAfterCursor < firstClosingIndexAfterCursor))
			return false;

		this.searchStartPosition = lastOpeningIndexBeforeCursor + 2;
		this.isAlreadyClosed = true;

		return true;
	}
}
