import {AbstractEditorModal} from "../abstracts/AbstractEditorModal";
import {App} from "obsidian";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {LinkSuggesterHandler} from "../../linkSuggester/handlers/LinkSuggesterHandler";
import {RelationshipInterface} from "../../relationships/interfaces/RelationshipInterface";
import {RelationshipType} from "../../relationships/enums/RelationshipType";

export class RelationshipEditorModal extends AbstractEditorModal {
	constructor(
		app: App,
		component: ComponentModelInterface,
		editableField: string,
		private _relationship: RelationshipInterface,
	) {
		super(app, component, undefined, editableField, true);

		this.contentValue = (this._relationship.description ?? '').replaceAll('\\"', '"');

		if (this._relationship.type === RelationshipType.Unidirectional || this._relationship.type === RelationshipType.Child)
			this.title = 'Edit the relationship ' + this.component.file.basename + ' has with ' + this._relationship.component?.file.basename;
		else
			this.title = 'Edit the relationship between ' + this.component.file.basename + ' and ' + this._relationship.component?.file.basename;

	}

	onOpen() {
		super.onOpen();

		this.addElements(this.contentEditorContainerEl);
		this.autocompletionHelper = new LinkSuggesterHandler(this.app, this.contentEditorEl, this.component);
	}

	protected async saveContent(
	): Promise<void> {
		this._relationship.description = this.contentEditorEl.value.replaceAll('"', '\\"');

		this.manipulators.codeblock.addOrUpdateRelationship(
			this._relationship,
		);

		this.close();
	}
}
