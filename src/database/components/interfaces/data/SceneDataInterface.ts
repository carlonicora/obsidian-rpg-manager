import {StoryCircleStage} from "../../../../enums/StoryCircleStage";
import {SceneType} from "../../../../enums/SceneType";

export interface SceneDataInterface {
	get action(): string|undefined;
	get trigger(): string|undefined;
	get date(): Date|undefined;
	get storycircleStage(): StoryCircleStage|undefined;
	get sceneType(): SceneType|undefined;
	get isActedUpon(): boolean|undefined;
}
