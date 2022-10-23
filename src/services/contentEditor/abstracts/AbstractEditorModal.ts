import {AbstractModal} from "../../../modals/abstracts/AbstractModal";
import {LinkSuggesterHandlerInterface} from "../../../linkSuggester/interfaces/LinkSuggesterHandlerInterface";
import {App} from "obsidian";
import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";
import {EditableContentType} from "../enums/EditableContentType";

export abstract class AbstractEditorModal extends AbstractModal {
	protected contentEditorEl: HTMLTextAreaElement|HTMLInputElement;
	protected contentValue: string;
	protected contentEditorContainerEl: HTMLDivElement;
	protected contentEditorButtonContainerEl: HTMLDivElement;

	protected autocompletionHelper: LinkSuggesterHandlerInterface;

	constructor(
		app: App,
		protected component: ComponentInterface,
		protected editableContentType: EditableContentType|undefined,
		protected editableField: string,
		protected isLongText: boolean,
	) {
		super(app);

		if (this.editableContentType !== undefined) {
			const contentValue = this.factories.editableContentValue.read(this.component, this.editableContentType);
			if (contentValue != null)
				this.contentValue = contentValue.toString()
					.replaceAll('\\"', '"')
					.replaceAll('\\n', '\n');
			else
				this.contentValue = '';

		}
	}

	onClose() {
		if (this.autocompletionHelper !== undefined)
			this.autocompletionHelper.close();

		this.rpgmContainerEl.empty();

		super.onClose();
	}

	onOpen() {
		super.onOpen();
		this.contentEditorContainerEl = this.rpgmContainerEl.createDiv({cls: 'rpgm-content-editor'});
		this.contentEditorButtonContainerEl = this.rpgmContainerEl.createDiv({cls: 'rpgm-content-editor-button'});

		const contentEditorButtonEl: HTMLButtonElement = this.contentEditorButtonContainerEl.createEl('button', {text: 'Save'});
		contentEditorButtonEl.addEventListener('click', this.saveContent.bind(this));
	}

	protected addElements(
		contentEl: HTMLDivElement,
	): void {
		if (this.isLongText) {
			this.contentEditorEl = contentEl.createEl('textarea', {cls: 'rpgm-content-editor-input'});
		} else {
			this.contentEditorEl = contentEl.createEl('input', {cls: 'rpgm-content-editor-input'});
			this.contentEditorEl.type = 'text';
		}

		if (this.isLongText)
			this.contentEditorEl.textContent = this.contentValue;
		else
			this.contentEditorEl.value = this.contentValue;

		this.contentEditorEl.selectionStart = this.contentValue.length;
	}

	protected async saveContent(
	): Promise<void> {
		const value = this.contentEditorEl.value
			.replaceAll('"', '\\"')
			.replaceAll('\n', '\\n');
		this.manipulators.codeblock.update(
			this.editableField,
			value,
		);

		this.close();
	}
}
