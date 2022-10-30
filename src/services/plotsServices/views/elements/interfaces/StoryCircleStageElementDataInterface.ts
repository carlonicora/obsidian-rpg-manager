import {ElementDataInterface} from "../../../../../managers/viewsManager/interfaces/ElementDataInterface";
import {StoryCircleStage} from "../../../enums/StoryCircleStage";

export interface StoryCircleStageElementDataInterface extends ElementDataInterface {
	values: StoryCircleStage|undefined,
}
