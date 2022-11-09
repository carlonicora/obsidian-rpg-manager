import {LinkSuggesterHandlerInterface} from "../interfaces/LinkSuggesterHandlerInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {LinkSuggesterPopUp} from "../popUps/LinkSuggesterPopUp";
import {LinkSuggesterSearchResultPopUpInterface} from "../interfaces/LinkSuggesterSearchResultPopUpInterface";
import {SearchService} from "../../searchService/SearchService";
import {SearchType} from "../../searchService/enums/SearchType";
import {SearchResultInterface} from "../../searchService/interfaces/SearchResultInterface";

export class SimplifiedLinkSuggestionHandler implements LinkSuggesterHandlerInterface {
	private _displayer: LinkSuggesterSearchResultPopUpInterface;

	private _previousSearch: string;

	constructor(
		private _api: RpgManagerApiInterface,
		private _containerEl: HTMLInputElement|HTMLTextAreaElement,
		private _component: ModelInterface,
	) {
		this._containerEl.addEventListener('keyup', this._inputEvent.bind(this));
		this._displayer = new LinkSuggesterPopUp(this._api, this);
	}

	close(
	): void {
		this._displayer.clear();
		this._containerEl.removeEventListener('keyup', this._inputEvent);
	}

	confirmSelection(
		selectedResult: SearchResultInterface,
		position: number,
	): void {
		this._containerEl.value = selectedResult.file.basename;
		this._containerEl.blur();
	}

	private _inputEvent(
		evt: KeyboardEvent,
	): void {
		if (this._containerEl.value === this._previousSearch)
			return;

		if (this._containerEl.value === '') {
			this._displayer.clear();
			return;
		}

		this._previousSearch = this._containerEl.value;

		this._displayer.fill(
			this._api.service(SearchService).search(this._containerEl.value, SearchType.FuzzyElementSearch, this._component) ?? [],
			this._containerEl.getBoundingClientRect().top + this._containerEl.offsetHeight,
			this._containerEl.getBoundingClientRect().left,
		);
	}

}
