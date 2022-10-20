import {AbstractModal} from "../../../modals/abstracts/AbstractModal";
import {App} from "obsidian";
import {LinkSuggesterHandler} from "../../../linkSuggester/handlers/LinkSuggesterHandler";
import {LinkSuggesterHandlerInterface} from "../../../linkSuggester/interfaces/LinkSuggesterHandlerInterface";
import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";
import {EditableContentType} from "../enums/EditableContentType";

export class ContentEditorModal extends AbstractModal {
	private _inputEl: HTMLInputElement;
	private _autocompletionHelper: LinkSuggesterHandlerInterface;
	private _contentEditorEl: HTMLTextAreaElement;

	constructor(
		app: App,
		private _component: ComponentInterface,
		private _editableContentType: EditableContentType,
		private _editableField: string,
	) {
		super(app);

		this.title = 'Edit the ' + EditableContentType[this._editableContentType] + ' for ' + this._component.file.basename;
	}

	onClose() {
		super.onClose();
		this._autocompletionHelper.close();
		this.rpgmContainerEl.empty();
	}

	onOpen() {
		super.onOpen();

		const contentValue = this.factories.editableContentValue.read(this._component, this._editableContentType);

		const contentEditorContainerEl: HTMLDivElement = this.rpgmContainerEl.createDiv({cls: 'rpgm-content-editor'});
		this._contentEditorEl = contentEditorContainerEl.createEl('textarea', {cls: 'rpgm-content-editor-input'});
		if (contentValue !== undefined) {
			const contentTextualValue: string = contentValue.toString().replaceAll('\"', '"');
			this._contentEditorEl.textContent = contentTextualValue;
			this._contentEditorEl.selectionStart = contentTextualValue.length;
		}

		this._autocompletionHelper = new LinkSuggesterHandler(this.app, this._contentEditorEl);

		const contentEditorButtonContainerEl: HTMLDivElement = this.rpgmContainerEl.createDiv({cls: 'rpgm-content-editor-button'});
		const contentEditorButtonEl: HTMLButtonElement = contentEditorButtonContainerEl.createEl('button', {text: 'Save'});
		contentEditorButtonEl.addEventListener('click', this._saveContent.bind(this));
	}

	private async _saveContent(
	): Promise<void> {
		const value = this._contentEditorEl.value.replaceAll('"', '\"');
		this.manipulators.codeblock.update(
			this._editableField,
			this._contentEditorEl.value,
		);

		this.close();
	}
}
