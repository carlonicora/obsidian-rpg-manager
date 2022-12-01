import {StoryCircleStage} from "../../../services/plotsService/enums/StoryCircleStage";
import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";
import {SceneType} from "../../../services/analyserService/enums/SceneType";
import {SceneFeedbackInterface} from "./SceneFeedbackInterface";

export interface SceneDataInterface {
	get action(): string|undefined;
	get feedback(): SceneFeedbackInterface|undefined;
	get trigger(): string|undefined;
	get date(): DateInterface|undefined;
	get storyCircleStage(): StoryCircleStage|undefined;
	get sceneType(): SceneType|undefined;
	get isExciting(): boolean
}
