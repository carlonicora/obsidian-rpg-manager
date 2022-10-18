import {SearchResultInterface} from "../interfaces/SearchResultInterface";
import {SearchInterface} from "../interfaces/SearchInterface";
import {App} from "obsidian";
import {FuzzyLinkSearcher} from "../searchers/FuzzyLinkSearcher";
import {KeyboardEventManager} from "../eventManagers/KeyboardEventManager";

export class LinkSuggesterResult {
	private _eventListenerInitialised = false;
	private _currentlySelectedSearchResult: number|undefined = undefined;
	private _results: Array<SearchResultInterface>|undefined;
	private _searcher: SearchInterface;

	private _eventManager: KeyboardEventManager;

	private _suggestionEl: HTMLDivElement;

	constructor(
		private _app: App,
	) {
		this._searcher = new FuzzyLinkSearcher(this._app);
		this._eventManager = new KeyboardEventManager();
	}

	public cancel(
	): void {
		this._removeSearchResults();
	}

	public async search(
		term: string
	): Promise<void> {
		this._results = this._searcher.search(term);

		if (this._results === undefined){
			this._removeSearchResults();
			return;
		}
	}

	private _removeSearchResults(
	): void {
		if (this._eventListenerInitialised) {
			document.removeEventListener('keydown', this._eventManager.listener);
			this._eventListenerInitialised = false;
		}

		const suggestionContainer = this._getSuggestionContainer();
		if (suggestionContainer !== undefined)
			suggestionContainer.remove();

	}
}
