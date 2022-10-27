import {EditableContentType} from "../enums/EditableContentType";
import {AbstractModal} from "../../../managers/modalsManager/abstracts/AbstractModal";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {LinkSuggesterHandlerInterface} from "../../linkSuggesterService/interfaces/LinkSuggesterHandlerInterface";
import {CodeblockService} from "../../codeblockService/CodeblockService";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {ContentEditorServiceInterface} from "../interfaces/ContentEditorServiceInterface";

export abstract class AbstractEditorModal extends AbstractModal {
	protected contentEditorEl: HTMLTextAreaElement|HTMLInputElement;
	protected contentValue: string;
	protected contentEditorContainerEl: HTMLDivElement;
	protected contentEditorButtonContainerEl: HTMLDivElement;

	protected autocompletionHelper: LinkSuggesterHandlerInterface;

	constructor(
		api: RpgManagerApiInterface,
		protected contentEditor: ContentEditorServiceInterface,
		protected component: ModelInterface,
		protected editableContentType: EditableContentType|undefined,
		protected editableField: string,
		protected isLongText: boolean,
	) {
		super(api);

		if (this.editableContentType !== undefined) {
			const contentValue = this.contentEditor.read(this.component, this.editableContentType);
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

		this.api.service(CodeblockService).addOrUpdate(
			this.editableField,
			value,
		);

		this.close();
	}
}
