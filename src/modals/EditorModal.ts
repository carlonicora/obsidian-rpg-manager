import {AbstractModal} from "./abstracts/AbstractModal";
import {App} from "obsidian";
import {ElementHandlerInterface, InputHandler} from "../suggester/suggester";

export class EditorModal extends AbstractModal {
	private _inputEl: HTMLInputElement;
	private _autocompletionHelper: ElementHandlerInterface;

	constructor(
		app: App,
	) {
		super(app);
	}

	onClose() {
		super.onClose();
		this.rpgmContainerEl.empty();
	}

	onOpen() {
		super.onOpen();

		this._inputEl = this.rpgmContainerEl.createEl('input', {type: 'text'});
		this._autocompletionHelper = new InputHandler(this.app, this._inputEl);
	}
}
