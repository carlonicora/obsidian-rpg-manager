import {AbstractFactory} from "../../../core/abstracts/AbstractFactory";
import {EditableContentFactoryInterface} from "../interfaces/EditableContentFactoryInterface";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {ContentEditorModal} from "../modals/ContentEditorModal";
import {EditableContentType} from "../enums/EditableContentType";
import {StoryCircleContentEditorModal} from "../modals/StoryCircleContentEditorModal";
import {RelationshipInterface} from "../../relationshipsService/interfaces/RelationshipInterface";
import {RelationshipEditorModal} from "../modals/RelationshipEditorModal";

export class EditableContentFactory extends AbstractFactory implements EditableContentFactoryInterface {
	public async open(
		component: ModelInterface,
		editableField: string,
	): Promise<boolean> {
		const type: EditableContentType|undefined = await this.factories.editableContentField.create(editableField);

		switch(type){
			case EditableContentType.Synopsis:
			case EditableContentType.Goals:
			case EditableContentType.Action:
			case EditableContentType.Trigger:
			case EditableContentType.AbtNeed:
			case EditableContentType.AbtAnd:
			case EditableContentType.AbtBut:
			case EditableContentType.AbtTherefore:
				new ContentEditorModal(this.app, component, type, editableField, true).open();
				return true;
				break;
			case EditableContentType.Address:
			case EditableContentType.Url:
				new ContentEditorModal(this.app, component, type, editableField, false).open();
				return true;
				break;
			case EditableContentType.StoryCircleYou:
			case EditableContentType.StoryCircleNeed:
			case EditableContentType.StoryCircleGo:
			case EditableContentType.StoryCircleSearch:
			case EditableContentType.StoryCircleFind:
			case EditableContentType.StoryCircleTake:
			case EditableContentType.StoryCircleReturn:
			case EditableContentType.StoryCircleChange:
				new StoryCircleContentEditorModal(this.app, component, type, editableField, this.factories.editableContentValue.readRelatedPlot(component, type)).open();
				break;
			default:
				const relatedComponent = component.getRelationships().filter((relationship: RelationshipInterface) =>
					relationship.path === editableField
				);

				if (relatedComponent.length !== 1)
					return false;

				new RelationshipEditorModal(this.app, component, editableField, relatedComponent[0]).open();

				break;
		}

		return false;
	}
}
