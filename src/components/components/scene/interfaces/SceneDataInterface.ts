import {StoryCircleStage} from "../../../../plots/enums/StoryCircleStage";
import {SceneType} from "../../../enums/SceneType";
import {DateInterface} from "../../../../services/date/interfaces/DateInterface";

export interface SceneDataInterface {
	get action(): string|undefined;
	get trigger(): string|undefined;
	get date(): DateInterface|undefined;
	get storyCircleStage(): StoryCircleStage|undefined;
	get sceneType(): SceneType|undefined;
	get isExciting(): boolean
}
