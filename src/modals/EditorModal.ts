import {AbstractModal} from "./abstracts/AbstractModal";
import {App} from "obsidian";
import {InputLinkSuggester} from "../suggester/InputLinkSuggester";
import {LinkSuggesterInterface} from "../suggester/interfaces/LinkSuggesterInterface";



export class EditorModal extends AbstractModal {
	private _inputEl: HTMLInputElement;
	private _autocompletionHelper: LinkSuggesterInterface;

	constructor(
		app: App,
	) {
		super(app);
	}

	onClose() {
		super.onClose();
		this.rpgmContainerEl.empty();

		app.workspace.editorSuggest.suggests
	}

	onOpen() {
		super.onOpen();

		this._inputEl = this.rpgmContainerEl.createEl('input', {type: 'text'});
		this._autocompletionHelper = new InputLinkSuggester(this.app, this._inputEl);
	}
}
