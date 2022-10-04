import {StoryCircleStage} from "../../../../plots/enums/StoryCircleStage";
import {SceneType} from "../../../enums/SceneType";

export interface SceneDataInterface {
	get action(): string|undefined;
	get trigger(): string|undefined;
	get date(): Date|undefined;
	get storyCircleStage(): StoryCircleStage|undefined;
	get sceneType(): SceneType|undefined;
	get isExciting(): boolean
}
