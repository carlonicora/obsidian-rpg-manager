import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {App, fuzzySearch, prepareQuery, SearchResult, setIcon, TFile} from "obsidian";
import {SearchInterface} from "./interfaces/SearchInterface";
import {FuzzyLinkSearcher} from "./searchers/FuzzyLinkSearcher";
import {SearchResultInterface} from "./interfaces/SearchResultInterface";
import {LinkSuggesterInterface} from "./interfaces/LinkSuggesterInterface";
import {TextAnalyserInterface} from "./interfaces/TextAnalyserInterface";
import {InputTextAnalyser} from "./textAnalysers/InputTextAnalyser";
import {TextStatusInterface} from "./interfaces/TextStatusInterface";
import {KeyboardEventManager} from "./eventManagers/KeyboardEventManager";

export class InputLinkSuggester extends AbstractRpgManager implements LinkSuggesterInterface{
	protected _inSearch: number|undefined = undefined;
	private _currentlySelectedSearchResult: number|undefined = undefined;
	private _eventListenerInitialised = false;
	private _searchTerm: string|undefined = undefined;
	private _results: Array<SearchResultInterface>|undefined;
	private _suggestionEl: HTMLDivElement;


	private _searcher: SearchInterface;
	private _textAnalyser: TextAnalyserInterface;
	private _textStatus: TextStatusInterface;
	private _eventManager: KeyboardEventManager;
	
	constructor(
		app: App,
		private _containerEl: HTMLInputElement
	) {
		super(app);

		this._containerEl.addEventListener('keyup', this._analyseKeyUp.bind(this));
		this._searcher = new FuzzyLinkSearcher(this.app);
		this._textAnalyser = new InputTextAnalyser();
		this._textStatus = {
			positionInSearch: undefined,
			cursorPosition: 0,
			linkText: undefined,
			fullText: '',
		};
	}

	public unload(
	): void {
		this._removeSearchResults();
	}

	private _analyseKeyUp(
	): void {
		this._textAnalyser.analyse(this._containerEl, this._textStatus);

		if (this._textStatus.searchTerm === undefined){
			this._removeSearchResults();
			return;
		}

		this._results = this._searcher.search(this._textStatus.searchTerm);
		if (this._results === undefined){
			this._removeSearchResults();
			return;
		}

		this._currentlySelectedSearchResult = 0;
		let suggestionContainerEl: HTMLDivElement|undefined = this._getSuggestionContainer();

		if (this._eventListenerInitialised === false) {
			this._eventListenerInitialised = true;
			document.addEventListener('keydown', this._eventManager.listener);
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
