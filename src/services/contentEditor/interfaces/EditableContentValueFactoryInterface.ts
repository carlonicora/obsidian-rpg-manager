import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {EditableContentType} from "../enums/EditableContentType";

export interface EditableContentValueFactoryInterface {
	read(
		component: ComponentModelInterface,
		type: EditableContentType,
	): string|boolean|number|undefined;

	readRelatedPlot(
		component: ComponentModelInterface,
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
