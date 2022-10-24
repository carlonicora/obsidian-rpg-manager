import {AbstractFactory} from "../../../core/abstracts/AbstractFactory";
import {EditableContentTypeFactoryInterface} from "../interfaces/EditableContentTypeFactoryInterface";
import {EditableContentType} from "../enums/EditableContentType";

export class EditableContentTypeFactory extends AbstractFactory implements EditableContentTypeFactoryInterface {
	public create(
		editableField: string,
	): EditableContentType|undefined {
		switch (editableField.toLowerCase()){
			case 'data.synopsis':
				return EditableContentType.Synopsis;
				break;
			case 'data.goals':
				return EditableContentType.Goals;
				break;
			case 'data.address':
				return EditableContentType.Address;
				break;
			case 'data.action':
				return EditableContentType.Action;
				break;
			case 'data.trigger':
				return EditableContentType.Trigger;
				break;
			case 'data.url':
				return EditableContentType.Url;
				break;
			case 'plot.abt.need':
				return EditableContentType.AbtNeed;
				break;
			case 'plot.abt.and':
				return EditableContentType.AbtAnd;
				break;
			case 'plot.abt.but':
				return EditableContentType.AbtBut;
				break;
			case 'plot.abt.therefore':
				return EditableContentType.AbtTherefore;
				break;
			case 'plot.storycircle.you':
				return EditableContentType.StoryCircleYou;
				break;
			case 'plot.storycircle.need':
				return EditableContentType.StoryCircleNeed;
				break;
			case 'plot.storycircle.go':
				return EditableContentType.StoryCircleGo;
				break;
			case 'plot.storycircle.search':
				return EditableContentType.StoryCircleSearch;
				break;
			case 'plot.storycircle.find':
				return EditableContentType.StoryCircleFind;
				break;
			case 'plot.storycircle.take':
				return EditableContentType.StoryCircleTake;
				break;
			case 'plot.storycircle.return':
				return EditableContentType.StoryCircleReturn;
				break;
			case 'plot.storycircle.change':
				return EditableContentType.StoryCircleChange;
				break;
		}

		return undefined;
	}
}
