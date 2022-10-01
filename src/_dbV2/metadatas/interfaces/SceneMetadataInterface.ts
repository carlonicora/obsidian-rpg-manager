import {SceneType} from "../../../enums/SceneType";
import {StoryCircleStage} from "../../../enums/StoryCircleStage";
import {ComponentMetadataInterface} from "./ComponentMetadataInterface";

export interface SceneMetadataInterface extends ComponentMetadataInterface{
	sessionId?: number | undefined;
	action?: string | undefined;
	date?: string | undefined;
	sceneType?: SceneType | undefined;
	isActedUpon?: boolean | undefined;
	duration?: number | undefined;
	durations?: Array<string> | undefined;
	storyCircleStage?: StoryCircleStage | undefined;
}
