import {EditableContentType} from "../enums/EditableContentType";
import {AbstractEditorModal} from "../abstracts/AbstractEditorModal";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {LinkSuggesterService} from "../../linkSuggesterService/LinkSuggesterService";
import {ContentEditorServiceInterface} from "../interfaces/ContentEditorServiceInterface";

export class ContentEditorModal extends AbstractEditorModal {
	constructor(
		api: RpgManagerApiInterface,
		contentEditor: ContentEditorServiceInterface,
		component: ModelInterface,
		editableContentType: EditableContentType,
		editableField: string,
		isLongText: boolean,
	) {
		super(api, contentEditor, component, editableContentType, editableField, isLongText);

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

				break;
		}

		this.title = 'Edit the ' + title + ' for ' + this.component.file.basename;
	}

	onOpen() {
		super.onOpen();

		this.addElements(this.contentEditorContainerEl);
		this.autocompletionHelper = this.api.service(LinkSuggesterService).createHandler(this.contentEditorEl, this.component);
	}
}
