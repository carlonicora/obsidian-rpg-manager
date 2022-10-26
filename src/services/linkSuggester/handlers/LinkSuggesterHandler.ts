import {LinkSuggesterHandlerInterface} from "../interfaces/LinkSuggesterHandlerInterface";
import {LinkSuggesterTextAnalyserInterface} from "../interfaces/LinkSuggesterTextAnalyserInterface";
import {LinkSuggesterSearchResultPopUpInterface} from "../interfaces/LinkSuggesterSearchResultPopUpInterface";
import {App} from "obsidian";
import {LinkSuggesterTextAnalyser} from "../textAnalysers/LinkSuggesterTextAnalyser";
import {LinkSuggesterPopUp} from "../popUps/LinkSuggesterPopUp";
import {SearchResultInterface} from "../../search/interfaces/SearchResultInterface";
import {AbstractRpgManager} from "../../../core/abstracts/AbstractRpgManager";
import {SearchService} from "../../search/SearchService";
import {SearchType} from "../../search/enums/SearchType";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export class LinkSuggesterHandler extends AbstractRpgManager implements LinkSuggesterHandlerInterface {
	private _analyser: LinkSuggesterTextAnalyserInterface;
	private _displayer: LinkSuggesterSearchResultPopUpInterface;
	private _previousSearch: string|undefined;

	constructor(
		private _app: App,
		private _containerEl: HTMLInputElement|HTMLTextAreaElement,
		private _component: ModelInterface,
	) {
		super(app);

		this._containerEl.addEventListener('keyup', this._inputEvent.bind(this));
		this._analyser = new LinkSuggesterTextAnalyser();
		this._displayer = new LinkSuggesterPopUp(this._app, this);
	}

	private _inputEvent(
		evt: KeyboardEvent,
	): void {
		if (this._analyser.isInSearch(this._containerEl.value, this._containerEl.selectionStart)) {
			if (this._analyser.searchTerm !== this._previousSearch) {
				this._previousSearch = this._analyser.searchTerm;

				const getCaretCoordinates = require('./pixelFinder.js');
				const caret = getCaretCoordinates(this._containerEl);
				const x = this._offset(this._containerEl)

				const top: number = x.top + caret.top;
				const left: number = x.left + caret.left;

				this._displayer.fill(
					this.services.get(SearchService)?.search(this._analyser.searchTerm, SearchType.FuzzyElementSearch, this._component) ?? [],
					//this._searcher.search(this._analyser.searchTerm),
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
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
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
		this._containerEl.selectionStart = this._analyser.fullText.length;
		this._containerEl.focus();
	}

	public close(): void {
		this._previousSearch = undefined;
		this._displayer.clear();
		this._containerEl.removeEventListener('keyup', this._inputEvent);
	}
}
