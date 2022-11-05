import {LinkSuggesterSearchResultPopUpInterface} from "../interfaces/LinkSuggesterSearchResultPopUpInterface";
import {LinkSuggesterPopUpInterface} from "../interfaces/LinkSuggesterPopUpInterface";
import {LinkSuggesterEventListenerInterface} from "../interfaces/LinkSuggesterEventListenerInterface";
import {setIcon} from "obsidian";
import {LinkSuggesterHandlerInterface} from "../interfaces/LinkSuggesterHandlerInterface";
import {LinkSuggesterKeyboardEventListener} from "../eventListeners/LinkSuggesterKeyboardEventListener";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {SearchResultInterface} from "../../searchService/interfaces/SearchResultInterface";

export class LinkSuggesterPopUp implements LinkSuggesterSearchResultPopUpInterface, LinkSuggesterPopUpInterface {
	private _results: Array<SearchResultInterface>;
	private _currentIndex: number;
	private _keyboardListener: LinkSuggesterEventListenerInterface;
	private _isListeningToKeyboard: boolean;
	private _suggestionEl: HTMLDivElement;

	private _mouseOverIndex: number|undefined = undefined;

	constructor(
		private _api: RpgManagerApiInterface,
		private _handler: LinkSuggesterHandlerInterface,
	) {
		this._keyboardListener = new LinkSuggesterKeyboardEventListener(this._api, this);
		this._isListeningToKeyboard = false;
	}

	public fill(
		results: Array<SearchResultInterface>,
		top: number,
		left: number,
	): void {
		this._results = results;

		if (this._results.length === 0) {
			this.hide();
			return;
		}

		if (!this._isListeningToKeyboard) {
			document.addEventListener('keydown', this._keyboardListener.listener);
			this._isListeningToKeyboard = true;
		}

		let suggestionContainerEl: HTMLDivElement|undefined = this._getSuggestionContainer();
		if (suggestionContainerEl === undefined) {
			suggestionContainerEl = document.createElement('div');
			suggestionContainerEl.addClass('suggestion-container');
			this._suggestionEl = suggestionContainerEl.createDiv({cls: 'suggestion'});
		} else {
			this._suggestionEl = suggestionContainerEl.childNodes[0] as HTMLDivElement;
			this._suggestionEl.empty();
		}

		this._results.forEach((searchResult: SearchResultInterface, index:number) => {
			const suggestionItemEl = this._suggestionEl.createDiv({cls: 'suggestion-item mod-complex'});

			suggestionItemEl.addEventListener('mouseenter', () => {
				if (this._mouseOverIndex !== index) {
					suggestionItemEl.addClass('is-selected');
					(<HTMLDivElement>this._suggestionEl.childNodes[this._currentIndex]).removeClass('is-selected');
					this._mouseOverIndex = index;
					this._currentIndex = index;
				}
			});

			suggestionItemEl.addEventListener('mouseout', () => {
				suggestionItemEl.removeClass('is-selected');
				(<HTMLDivElement>this._suggestionEl.childNodes[this._currentIndex]).addClass('is-selected');
			});

			suggestionItemEl.addEventListener('click', () => {
				this._currentIndex = index;
				this.select(false);
			});

			const suggestionContentEl = suggestionItemEl.createDiv({cls: 'suggestion-content'});
			if (searchResult.fancyTitle !== undefined) {
				suggestionContentEl.appendChild(searchResult.fancyTitle);
			} else {
				suggestionContentEl.createDiv({
					cls: 'suggestion-title',
					text: searchResult.title
				});
			}

			if (searchResult.fancySubtitle !== undefined){
				suggestionContentEl.appendChild(searchResult.fancySubtitle);
			} else {
				const suggestionNoteEl = suggestionContentEl.createDiv({cls: 'suggestion-note'});
				if (searchResult.alias !== undefined) {
					suggestionNoteEl.textContent = searchResult.file.path.slice(0, -3);
				} else {
					const indexOfSubfolder = searchResult.file.path.lastIndexOf('/');
					if (indexOfSubfolder !== -1)
						suggestionNoteEl.textContent = searchResult.file.path.substring(0, indexOfSubfolder + 1);
				}
			}

			const suggestionAux = suggestionItemEl.createDiv({cls: 'suggestion-aux'});

			if (searchResult.alias !== undefined) {
				const suggestionFlairEl = suggestionAux.createSpan({cls: 'suggestion-flair'});
				suggestionFlairEl.ariaLabel = 'Alias';
				setIcon(suggestionFlairEl, 'corner-up-right');
			}

		});

		document.body.append(suggestionContainerEl as Node);
		suggestionContainerEl.style.left = left + 'px';
		suggestionContainerEl.style.top = top - suggestionContainerEl.clientHeight + 'px';

		(<HTMLDivElement>this._suggestionEl.childNodes[this._currentIndex]).addClass('is-selected');
	}

	clear(): void {
		this._currentIndex = 0;
		this._results = [];
		this.hide();
	}

	public hide(
	): void {
		if (this._isListeningToKeyboard) {
			document.removeEventListener('keydown', this._keyboardListener.listener);
			this._isListeningToKeyboard = false;
		}

		const suggestionContainer = this._getSuggestionContainer();
		if (suggestionContainer !== undefined)
			suggestionContainer.remove();
	}

	public async moveUp(
	): Promise<void> {
		if (this._currentIndex === 0)
			return;

		(<HTMLDivElement>this._suggestionEl.childNodes[this._currentIndex]).removeClass('is-selected');
		this._currentIndex--;
		(<HTMLDivElement>this._suggestionEl.childNodes[this._currentIndex]).addClass('is-selected');

		this._ensureSelectedItemVisibility();
	}

	public async moveDown(
	): Promise<void> {
		if (this._results.length === 0)
			return;

		if (this._currentIndex === this._results.length -1)
			return;

		(<HTMLDivElement>this._suggestionEl.childNodes[this._currentIndex]).removeClass('is-selected');
		this._currentIndex++;
		(<HTMLDivElement>this._suggestionEl.childNodes[this._currentIndex]).addClass('is-selected');

		this._ensureSelectedItemVisibility();
	}

	private _ensureSelectedItemVisibility(
	): void {
		this._getVisibleHeight((<HTMLDivElement>this._suggestionEl.childNodes[this._currentIndex]));
	}

	private _getVisibleHeight(element: HTMLDivElement){
		const scrollTop: number = this._suggestionEl.scrollTop;
		const scrollBot: number = scrollTop + this._suggestionEl.clientHeight;

		const containerRect = this._suggestionEl.getBoundingClientRect();
		const eleRect = element.getBoundingClientRect();
		const rect: any = {};
		rect.top = eleRect.top - containerRect.top,
			rect.right = eleRect.right - containerRect.right,
			rect.bottom = eleRect.bottom - containerRect.bottom,
			rect.left = eleRect.left - containerRect.left;
		const eleTop = rect.top + scrollTop;
		const eleBot = eleTop + element.offsetHeight;

		if (scrollBot < eleBot) {
			this._suggestionEl.scrollTop = eleTop - (scrollBot - scrollTop) + element.clientHeight;
		} else if (eleTop < scrollTop){
			this._suggestionEl.scrollTop = eleTop;
		}
	}

	public select(
		stayInside: boolean,
	): void {
		if (this._currentIndex >= this._results.length)
			return;

		const selectedResult = this._results[this._currentIndex];

		if (selectedResult === undefined)
			return;

		if (this._isListeningToKeyboard) {
			document.removeEventListener('keydown', this._keyboardListener.listener);
			this._isListeningToKeyboard = false;
		}

		let position: number = selectedResult.file.basename.length;

		if (selectedResult.alias === selectedResult.title)
			position += selectedResult.alias.length +1;

		if (!stayInside)
			position += 2;

		this._handler.confirmSelection(selectedResult, position);
		this.hide();
	}

	private _getSuggestionContainer(
	): HTMLDivElement|undefined {
		const suggestionContainerElememts = document.getElementsByClassName('suggestion-container');
		if (suggestionContainerElememts.length === 0) return undefined;

		return suggestionContainerElememts[0] as HTMLDivElement;
	}
}
