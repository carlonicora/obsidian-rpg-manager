import {StoryCircleStage} from "../../../services/plotsServices/enums/StoryCircleStage";
import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";
import {SceneType} from "../../../services/analyserService/enums/SceneType";

export interface SceneDataInterface {
	get action(): string|undefined;
	get trigger(): string|undefined;
	get date(): DateInterface|undefined;
	get storyCircleStage(): StoryCircleStage|undefined;
	get sceneType(): SceneType|undefined;
	get isExciting(): boolean
}
