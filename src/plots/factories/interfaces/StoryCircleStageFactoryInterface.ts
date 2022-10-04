import {StoryCircleStage} from "../../enums/StoryCircleStage";

export interface StoryCircleStageFactoryInterface {
	createStoryCircleStage(
		readableStoryCircleStage: string,
	): StoryCircleStage;

	createReadableStoryCircleStage(
		type: StoryCircleStage,
	): string;
}
