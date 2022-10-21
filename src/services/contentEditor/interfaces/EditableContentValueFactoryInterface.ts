import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";
import {EditableContentType} from "../enums/EditableContentType";

export interface EditableContentValueFactoryInterface {
	read(
		component: ComponentInterface,
		type: EditableContentType,
	): string|boolean|number|undefined;

	readRelatedPlot(
		component: ComponentInterface,
		type: EditableContentType.StoryCircleYou |
			EditableContentType.StoryCircleNeed |
			EditableContentType.StoryCircleGo |
			EditableContentType.StoryCircleSearch |
			EditableContentType.StoryCircleFind |
			EditableContentType.StoryCircleTake |
			EditableContentType.StoryCircleReturn |
			EditableContentType.StoryCircleChange,
	): string;
}
