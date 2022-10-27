import {AbtStage} from "../enums/AbtStage";
import {StoryCircleStage} from "../enums/StoryCircleStage";

export interface PlotServiceInterface {
	getAbtStage(
		readableAbtStage: string,
	): AbtStage;

	getReadableAbtStage(
		type: AbtStage,
	): string;

	getReadableStoryCircleStage(
		type: StoryCircleStage,
	): string;
	
	getStoryCircleStage(
		readableStoryCircleStage: string,
	): StoryCircleStage;
}
