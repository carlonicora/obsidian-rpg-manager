import {AbstractModal} from "./abstracts/AbstractModal";
import {App} from "obsidian";
import {LinkSuggesterHandler} from "../linkSuggester/handlers/LinkSuggesterHandler";
import {LinkSuggesterHandlerInterface} from "../linkSuggester/interfaces/LinkSuggesterHandlerInterface";

export class EditorModal extends AbstractModal {
	private _inputEl: HTMLInputElement;
	private _autocompletionInputHelper: LinkSuggesterHandlerInterface;
	private _autocompletionTextAreaHelper: LinkSuggesterHandlerInterface;

	constructor(
		app: App,
	) {
		super(app);
	}

	onClose() {
		super.onClose();
		this._autocompletionInputHelper.close();
		this.rpgmContainerEl.empty();
	}

	onOpen() {
		super.onOpen();


		this.rpgmContainerEl.createDiv({text: 'Input'});
		this._inputEl = this.rpgmContainerEl.createEl('input', {type: 'text'});
		this._autocompletionInputHelper = new LinkSuggesterHandler(this.app, this._inputEl);

		this.rpgmContainerEl.createDiv({text: 'Text area'});
		const textAreaEl: HTMLTextAreaElement = this.rpgmContainerEl.createEl('textarea');
		this._autocompletionTextAreaHelper = new LinkSuggesterHandler(this.app, textAreaEl);
	}
}
