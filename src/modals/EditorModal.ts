import {AbstractModal} from "./abstracts/AbstractModal";
import {App} from "obsidian";
import {LinkSuggesterInputHandler} from "../linkSuggester/handlers/LinkSuggesterInputHandler";
import {LinkSuggesterHandlerInterface} from "../linkSuggester/interfaces/LinkSuggesterHandlerInterface";

export class EditorModal extends AbstractModal {
	private _inputEl: HTMLInputElement;
	private _autocompletionHelper: LinkSuggesterHandlerInterface;

	constructor(
		app: App,
	) {
		super(app);
	}

	onClose() {
		super.onClose();
		this._autocompletionHelper.close();
		this.rpgmContainerEl.empty();
	}

	onOpen() {
		super.onOpen();

		this._inputEl = this.rpgmContainerEl.createEl('input', {type: 'text'});
		this._autocompletionHelper = new LinkSuggesterInputHandler(this.app, this._inputEl);
	}
}
