import {App, fuzzySearch, prepareQuery, SearchResult, setIcon, TFile} from "obsidian";

export interface SearchResultInterface {
	title: string,
	file: TFile,
	result?: SearchResult,
}

export interface TextAnalyserInterface {
	positionInSearch?: number;
	cursorPosition: number;
	searchTerm: string;
	linkText?: string;
	fullText: string;

	isInSearch(fullText: string, cursorPosition: number|null): boolean;
}

export interface QueryInterface{
	search(term: string): Array<SearchResultInterface>;
}

export interface ResultSearchDisplayerInterface{
	fill(results: Array<SearchResultInterface>, top: number, left: number): void;
	clear(): void;
}

export interface ResultDisplayerInterface{
	hide(): void;
	moveUp(): void;
	moveDown(): void;
	select(): void;
}

export interface ElementHandlerInterface {
	confirmSelection(selectedResult: SearchResultInterface): void;
}

export interface EventListenerInterface{
	listener: EventListener;
}

export class InputTextAnalyser implements TextAnalyserInterface {
	public cursorPosition: number;
	public fullText: string;
	public linkText?: string;
	public positionInSearch?: number;
	public searchTerm: string;

	constructor(
	) {
		this.cursorPosition = 0;
		this.fullText = '';
		this.searchTerm = '';
	}

	public isInSearch(
		fullText: string,
		cursorPosition: number|null,
	): boolean {
		this.fullText = fullText;
		this.cursorPosition = cursorPosition == null ? 0 : cursorPosition;

		if (this.cursorPosition == null)
			return false;

		if (this.positionInSearch === undefined && this.fullText.length < 2)
			return false;

		if (this.positionInSearch === undefined){
			if (this._isSearchJustStarted) {
				this.positionInSearch = 2;
			} else {
				return false;
			}
		} else {
			if (this._isNotInSearchAnyLonger) {
				this.positionInSearch = undefined;
				return false;
			} else {
				const endOfBracketsStart = this.fullText.substring(0, this.cursorPosition).lastIndexOf('[[') + 2;
				this.positionInSearch = this.cursorPosition - endOfBracketsStart;
			}
		}

		if (this.searchTerm !== undefined !== undefined && this.searchTerm === this.fullText.substring(this.positionInSearch))
			return false;

		this.searchTerm = this.fullText.substring(this.positionInSearch);

		return false;
	}

	private get _isSearchJustStarted(): boolean {
		return this.fullText.substring(this.cursorPosition - 2, 2) === '[[';
	}

	private get _isNotInSearchAnyLonger(): boolean {
		return this.fullText[this.cursorPosition - 1] === '[' && this.fullText[this.cursorPosition - 2] !== '['
	}
}

export class FuzzyQuery implements QueryInterface {
	constructor(
		private _app: App,
	) {
	}

	public search(
		term: string
	): Array<SearchResultInterface> {
		const response: Array<SearchResultInterface> = [];

		const query = prepareQuery(term);

		const files = this._app.vault.getMarkdownFiles();

		files.forEach((file: TFile) => {
			const metadata = this._app.metadataCache.getFileCache(file);
			if (metadata !== undefined && metadata?.frontmatter?.alias !== undefined && metadata.frontmatter.alias.length >0){
				metadata.frontmatter.alias.forEach((alias: string) => {
					if (term !== undefined && alias.toLowerCase().startsWith(term.toLowerCase())){
						response.push({title: alias, file: file});
					}
				})
			}

			const fuzzySearchResult = fuzzySearch(query, file.basename);
			if (fuzzySearchResult != null && fuzzySearchResult.matches !== null){
				response.push({title: file.basename, file: file, result: fuzzySearchResult});
			}
		})

		if (response.length === 0)
			return [];

		response.sort((a: SearchResultInterface, b: SearchResultInterface) => {
			if (a.result === undefined && b.result !== undefined) return -1;
			if (a.result !== undefined && b.result === undefined) return 1;
			if (a.result === undefined && b.result === undefined) return 0;
			if (a.result !== undefined && b.result !== undefined) {
				if (a.result?.score !== undefined && b.result?.score === undefined) return -1;
				if (a.result?.score === undefined && b.result?.score !== undefined) return 1;
				return b.result.score - a.result.score
			}
			return 0;
		});

		return  response;
	}
}

export class KeyboardEventListener implements EventListenerInterface {
	public listener: EventListener;

	constructor(
		private _app: App,
		private _handler: ResultDisplayerInterface,
	) {
		this.listener = (evt: KeyboardEvent) => this._handleKeyPress(evt);
	}

	private _handleKeyPress(
		evt: KeyboardEvent
	): void {
		console.log(evt.key);
		if (evt.key === 'ArrowUp' || evt.key === 'ArrowDown' || evt.key === 'Enter' || evt.key === 'Escape') {
			evt.preventDefault();
			console.log(evt.key);
		}
	}
}

export class ResultDisplayer implements ResultSearchDisplayerInterface, ResultDisplayerInterface {
	private _results: Array<SearchResultInterface>;
	private _currentIndex: number;
	private _keyboardListener: EventListenerInterface;
	private _isListeningToKeyboard: boolean;
	private _suggestionEl: HTMLDivElement;

	constructor(
		private _app: App,
		private _handler: ElementHandlerInterface,
	) {
		this._keyboardListener = new KeyboardEventListener(this._app, this);
		this._isListeningToKeyboard = false;
	}

	public fill(
		results: Array<SearchResultInterface>,
		top: number,
		left: number,
	): void {
		if (results.length === 0) {
			this.hide();
			return;
		}

		if (!this._isListeningToKeyboard) {
			document.addEventListener('keydown', this._keyboardListener.listener)
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

			suggestionItemEl.addEventListener('mouseover', () => {
				suggestionItemEl.addClass('is-selected');
				this._currentIndex = index;
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

		(<HTMLDivElement>this._suggestionEl.childNodes[this._currentIndex]).addClass('is-selected');

		document.body.append(suggestionContainerEl as Node);
		suggestionContainerEl.style.left = '455px';
		suggestionContainerEl.style.top = '457px';
	}

	clear(): void {
		this._currentIndex = 0;
		this._results = [];
		this.hide();
	}

	public hide(
	): void {
		if (this._isListeningToKeyboard) {
			document.removeEventListener('keydown', this._keyboardListener.listener)
			this._isListeningToKeyboard = false;
		}

		const suggestionContainer = this._getSuggestionContainer();
		if (suggestionContainer !== undefined)
			suggestionContainer.remove();
	}

	public moveUp(
	): void {
		if (this._currentIndex === 0)
			return;

		this._currentIndex--;
	}

	public moveDown(
	): void {
		if (this._results.length === 0)
			return;

		if (this._currentIndex === this._results.length -1)
			return;

		this._currentIndex++;
	}

	public select(
	): void {
		if (this._currentIndex >= this._results.length)
			return;

		const selectedResult = this._results[this._currentIndex];

		if (selectedResult === undefined)
			return;

		if (this._isListeningToKeyboard) {
			document.removeEventListener('keydown', this._keyboardListener.listener)
			this._isListeningToKeyboard = false;
		}

		this._handler.confirmSelection(selectedResult);
	}

	private _getSuggestionContainer(
	): HTMLDivElement|undefined {
		const suggestionContainerElememts = document.getElementsByClassName('suggestion-container');
		if (suggestionContainerElememts.length === 0) return undefined;

		return suggestionContainerElememts[0] as HTMLDivElement;
	}
}

export class InputHandler implements ElementHandlerInterface {
	private _analyser: TextAnalyserInterface;
	private _searcher: QueryInterface;
	private _displayer: ResultSearchDisplayerInterface;

	constructor(
		private _app: App,
		private _containerEl: HTMLInputElement,
	) {
		this._containerEl.addEventListener('keyup', this._inputEvent.bind(this));
		this._analyser = new InputTextAnalyser();
		this._searcher = new FuzzyQuery(this._app);
		this._displayer = new ResultDisplayer(this._app, this);
	}

	private _inputEvent(
		evt: KeyboardEvent,
	): void {
		if (this._analyser.isInSearch(this._containerEl.value, this._containerEl.selectionStart)) {
			//TODO find the location of the element
			this._displayer.fill(this._searcher.search(this._analyser.searchTerm), 200, 200);
		} else {
			this._displayer.clear();
		}
	}

	public async confirmSelection(
		result: SearchResultInterface,
	): Promise<void> {
		//update the input value
	}
}
