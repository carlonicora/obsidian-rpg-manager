import {TextAnalyserInterface} from "../interfaces/TextAnalyserInterface";
import {TextStatusInterface} from "../interfaces/TextStatusInterface";

export class InputTextAnalyser implements TextAnalyserInterface {
	analyse(
		containerEl: HTMLInputElement,
		status: TextStatusInterface,
	): void {
		status.cursorPosition = containerEl.selectionStart ?? 0;
		status.fullText = containerEl.value;

		if (status.cursorPosition == null) return;
		if (status.positionInSearch === undefined && status.fullText.length < 2) return;

		if (status.positionInSearch === undefined){
			if (this._isSearchJustStarted(status)) {
				status.positionInSearch = 2;
			} else {
				return;
			}
		} else {
			if (this._isNotInSearchAnyLonger(status)) {
				status.positionInSearch = undefined;
				return;
			} else {
				const endOfBracketsStart = status.fullText.substring(0, status.cursorPosition).lastIndexOf('[[') + 2;
				status.positionInSearch = status.cursorPosition - endOfBracketsStart;
			}
		}

		if (status.searchTerm !== undefined !== undefined && status.searchTerm === status.fullText.substring(status.positionInSearch)) return;
		status.searchTerm = status.fullText.substring(status.positionInSearch);
	}

	private _isSearchJustStarted(
		status: TextStatusInterface,
	): boolean {
		return status.fullText.substring(status.cursorPosition - 2, 2) === '[[';
	}

	private _isNotInSearchAnyLonger(
		status: TextStatusInterface,
	): boolean {
		return status.fullText[status.cursorPosition - 1] === '[' && status.fullText[status.cursorPosition - 2] !== '['
	}
}
