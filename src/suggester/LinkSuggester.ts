import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {App, fuzzySearch, prepareQuery, SearchResult, setIcon, TFile} from "obsidian";
import {SearchInterface} from "./interfaces/SearchInterface";
import {FuzzyLinkSearcher} from "./FuzzyLinkSearcher";
import {SearchResultInterface} from "./interfaces/SearchResultInterface";

export class LinkSuggester extends AbstractRpgManager{
	protected _inSearch: number|undefined = undefined;
	private _currentlySelectedSearchResult: number|undefined = undefined;
	private _eventListenerInitialised = false;
	private _searchTerm: string|undefined = undefined;
	private _results: Array<SearchResultInterface>|undefined;
	private _suggestionEl: HTMLDivElement;

	private _keyboardEventListener: EventListener;
	private _searcher: SearchInterface;
	
	constructor(
		app: App,
		private _containerEl: HTMLInputElement
	) {
		super(app);

		this._keyboardEventListener = (evt: KeyboardEvent) => this._handleKeyPress(evt);
		this._containerEl.addEventListener('keyup', this._analyseKeyUp.bind(this));
		this._searcher = new FuzzyLinkSearcher(this.app);
	}

	public unload(
	): void {
		this._removeSearchResults();
	}

	private _analyseKeyUp(
	): void {
		if (this._containerEl.selectionStart == null) return;
		if (this._containerEl.value.length < 2) return;

		if (this._inSearch === undefined){
			if (this._containerEl.value.substring(this._containerEl.selectionStart-2, 2) === '[[') {
				this._inSearch = 2;
				console.log('in search term position: 0')
			} else {
				return;
			}
		} else {
			console.log(this._containerEl.value[this._containerEl.selectionStart-1])
			console.log(this._containerEl.value[this._containerEl.selectionStart-2])
			if (
				this._containerEl.value[this._containerEl.selectionStart-1] === '[' &&
				this._containerEl.value[this._containerEl.selectionStart-2] !== '['
			) {
				console.log('analyseable: ' + this._containerEl.value.substring(this._containerEl.selectionStart));
				console.warn('not in search term')
				this._inSearch = undefined;
				return;
			} else {
				const endOfBracketsStart = this._containerEl.value.substring(0, this._containerEl.selectionStart).lastIndexOf('[[') + 2;
				this._inSearch = this._containerEl.selectionStart - endOfBracketsStart;
				console.log('in search term characters: ' + this._inSearch)
			}
		}

		console.log('text to analyse: ' + this._containerEl.value.substring(this._inSearch))
		if (this._searchTerm !== undefined && this._searchTerm === this._containerEl.value.substring(this._inSearch)) return;
		this._searchTerm = this._containerEl.value.substring(this._inSearch);

		this._results = this._searcher.search(this._searchTerm);
		if (this._results === undefined){
			this._removeSearchResults();
			return;
		}

		this._currentlySelectedSearchResult = 0;
		let suggestionContainerEl: HTMLDivElement|undefined = this._getSuggestionContainer();

		if (this._eventListenerInitialised === false) {
			this._eventListenerInitialised = true;
			document.addEventListener('keydown', this._keyboardEventListener);
		}

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

			suggestionItemEl.addEventListener('mouseover', () => {
				suggestionItemEl.addClass('is-selected');
				this._currentlySelectedSearchResult = index;
			});

			suggestionItemEl.addEventListener('mouseout', () => {
				suggestionItemEl.removeClass('is-selected')
			});

			const suggestionContentEl = suggestionItemEl.createDiv({cls: 'suggestion-content'});
			suggestionContentEl.createDiv({
				cls: 'suggestion-title',
				text: searchResult.title
			});
			const suggestionNoteEl = suggestionContentEl.createDiv({cls: 'suggestion-note'});

			const suggestionAux = suggestionItemEl.createDiv({cls: 'suggestion-aux'});

			if (searchResult.title !== searchResult.file.basename) {
				suggestionNoteEl.textContent = searchResult.file.path.substring(0, searchResult.file.path.lastIndexOf('/') + 1);
				const suggestionFlairEl = suggestionAux.createSpan({cls: 'suggestion-flair'})
				suggestionFlairEl.ariaLabel = 'Alias';
				setIcon(suggestionFlairEl, 'corner-up-right');
			} else {
				suggestionNoteEl.textContent = searchResult.file.path.slice(0, -3);
			}
		});

		(<HTMLDivElement>this._suggestionEl.childNodes[this._currentlySelectedSearchResult]).addClass('is-selected');

		document.body.append(suggestionContainerEl as Node);
		suggestionContainerEl.style.left = '455px';
		suggestionContainerEl.style.top = '457px';
	}

	private _handleKeyPress(evt: KeyboardEvent) {
		if (evt.key === 'ArrowUp' || evt.key === 'ArrowDown' || evt.key === 'Enter' || evt.key === 'Escape') {
			evt.preventDefault();
			switch (evt.key) {
				case "ArrowDown":
					if (this._currentlySelectedSearchResult === undefined) return;
					if (this._currentlySelectedSearchResult === this._results.length) return;
					(<HTMLDivElement>this._suggestionEl.childNodes[this._currentlySelectedSearchResult]).removeClass('is-selected');
					this._currentlySelectedSearchResult++;
					(<HTMLDivElement>this._suggestionEl.childNodes[this._currentlySelectedSearchResult]).addClass('is-selected');
					break;
				case "ArrowUp":
					if (this._currentlySelectedSearchResult === undefined) return;
					if (this._currentlySelectedSearchResult === 0) return;
					(<HTMLDivElement>this._suggestionEl.childNodes[this._currentlySelectedSearchResult]).removeClass('is-selected');
					this._currentlySelectedSearchResult--;
					(<HTMLDivElement>this._suggestionEl.childNodes[this._currentlySelectedSearchResult]).addClass('is-selected');
					break;
				case "Enter":
					if (this._currentlySelectedSearchResult === undefined) return;
					if (this._containerEl.selectionStart == null) return;

					const selectedResult = this._results[this._currentlySelectedSearchResult];

					const currentText = this._containerEl.value.substring(0, this._containerEl.selectionStart);
					const indexOfLastStart = currentText.lastIndexOf('[[');
					const replace = this._containerEl.value.substring(indexOfLastStart, this._containerEl.selectionStart - indexOfLastStart);

					if (selectedResult.title !== selectedResult.file.basename) {
						this._containerEl.value = this._containerEl.value.replace(replace, '[[' + selectedResult.file.basename + '|' + selectedResult.title + ']]');
					} else {
						this._containerEl.value = this._containerEl.value.replace(replace,'[[' + selectedResult.file.basename + ']]');
					}

					this._removeSearchResults();
					break;
				case "Escape":
					this._removeSearchResults();
					break;
			}
		}
	}
	
	private _getSuggestionContainer(
	): HTMLDivElement|undefined {
		const suggestionContainerElememts = document.getElementsByClassName('suggestion-container');
		if (suggestionContainerElememts.length === 0) return undefined;

		return suggestionContainerElememts[0] as HTMLDivElement;
	}



	private _removeSearchResults(
	): void {
		document.removeEventListener('keydown', this._keyboardEventListener);
		const suggestionContainer = this._getSuggestionContainer();
		if (suggestionContainer !== undefined) suggestionContainer.remove();
		this._eventListenerInitialised = false;
	}
}
