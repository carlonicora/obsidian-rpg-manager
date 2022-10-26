import {AbstractFactory} from "../../../../REFACTOR/abstracts/AbstractFactory";
import {StoryCircleStageFactoryInterface} from "./interfaces/StoryCircleStageFactoryInterface";
import {StoryCircleStage} from "../enums/StoryCircleStage";

export class StoryCircleStageFactory extends AbstractFactory implements StoryCircleStageFactoryInterface {
	createReadableStoryCircleStage(
		type: StoryCircleStage,
	): string {
		return StoryCircleStage[type].toString().toLowerCase();
	}

	createStoryCircleStage(
		readableStoryCircleStage: string,
	): StoryCircleStage {
		readableStoryCircleStage = readableStoryCircleStage[0].toUpperCase() + readableStoryCircleStage.substring(1).toLowerCase();
		return StoryCircleStage[readableStoryCircleStage as keyof typeof StoryCircleStage];
	}

}
