import {App} from "obsidian";
import {LinkSuggesterHandler} from "../../linkSuggester/handlers/LinkSuggesterHandler";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {EditableContentType} from "../enums/EditableContentType";
import {AbstractEditorModal} from "../abstracts/AbstractEditorModal";

export class ContentEditorModal extends AbstractEditorModal {
	constructor(
		app: App,
		component: ModelInterface,
		editableContentType: EditableContentType,
		editableField: string,
		isLongText: boolean,
	) {
		super(app, component, editableContentType, editableField, isLongText);

		let title = '';
		switch (this.editableContentType){
			case EditableContentType.AbtNeed:
				title = 'Need';
				break;
			case EditableContentType.AbtAnd:
				title = 'And';
				break;
			case EditableContentType.AbtBut:
				title = 'But';
				break;
			case EditableContentType.AbtTherefore:
				title = 'Therefore';
				break;
			default:
				if (this.editableContentType !== undefined)
					title = EditableContentType[this.editableContentType];

				break
		}

		this.title = 'Edit the ' + title + ' for ' + this.component.file.basename;
	}

	onOpen() {
		super.onOpen();

		this.addElements(this.contentEditorContainerEl);
		this.autocompletionHelper = new LinkSuggesterHandler(this.app, this.contentEditorEl, this.component);
	}
}
