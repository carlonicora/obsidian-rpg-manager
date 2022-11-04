import {AbtStage} from "../enums/AbtStage";
import {StoryCircleStage} from "../enums/StoryCircleStage";
import {PlotView} from "../views/PlotView";

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

	getView(
	): PlotView;
}
