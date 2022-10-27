import {AbstractEditorModal} from "../abstracts/AbstractEditorModal";
import {RelationshipInterface} from "../../relationshipsService/interfaces/RelationshipInterface";
import {RelationshipType} from "../../relationshipsService/enums/RelationshipType";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {CodeblockService} from "../../codeblockService/CodeblockService";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {LinkSuggesterService} from "../../linkSuggesterService/LinkSuggesterService";

export class RelationshipEditorModal extends AbstractEditorModal {
	constructor(
		api: RpgManagerApiInterface,
		component: ModelInterface,
		editableField: string,
		private _relationship: RelationshipInterface,
	) {
		super(api, component, undefined, editableField, true);

		this.contentValue = (this._relationship.description ?? '').replaceAll('\\"', '"');

		if (this._relationship.type === RelationshipType.Unidirectional || this._relationship.type === RelationshipType.Child)
			this.title = 'Edit the relationship ' + this.component.file.basename + ' has with ' + this._relationship.component?.file.basename;
		else
			this.title = 'Edit the relationship between ' + this.component.file.basename + ' and ' + this._relationship.component?.file.basename;

	}

	onOpen() {
		super.onOpen();

		this.addElements(this.contentEditorContainerEl);
		this.autocompletionHelper = this.api.service(LinkSuggesterService).createHandler(this.contentEditorEl, this.component);
	}

	protected async saveContent(
	): Promise<void> {
		this._relationship.description = this.contentEditorEl.value.replaceAll('"', '\\"');

		this.api.service(CodeblockService).addOrUpdateRelationship(
			this._relationship,
		);

		this.close();
	}
}
