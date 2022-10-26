import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {EditableContentType} from "../enums/EditableContentType";

export interface EditableContentValueFactoryInterface {
	read(
		component: ModelInterface,
		type: EditableContentType,
	): string|boolean|number|undefined;

	readRelatedPlot(
		component: ModelInterface,
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
