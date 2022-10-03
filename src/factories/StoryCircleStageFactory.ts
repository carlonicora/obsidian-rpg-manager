import {AbstractFactory} from "../abstracts/AbstractFactory";
import {StoryCircleStageFactoryInterface} from "../interfaces/factories/StoryCircleStageFactoryInterface";
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
		return StoryCircleStage[readableStoryCircleStage.toLowerCase() as keyof typeof StoryCircleStage];
	}

}
