import {ElementDataInterface} from "../../interfaces/ElementDataInterface";
import {StoryCircleStage} from "../../../../services/plotsServices/enums/StoryCircleStage";

export interface StoryCircleStageElementDataInterface extends ElementDataInterface {
	values: StoryCircleStage|undefined,
}
