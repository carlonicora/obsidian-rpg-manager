import {AbstractModel} from "../../../managers/modelsManager/abstracts/AbstractModel";
import {PlotStoryCircleInterface} from "../interfaces/PlotStoryCircleInterface";
import {StoryCircleMetadataInterface} from "../interfaces/StoryCircleMetadataInterface";
import {StoryCircleInterface} from "../interfaces/StoryCircleInterface";
import {StoryCirclePlot} from "./StoryCirclePlot";

export class PlotsStoryCircleOnly extends AbstractModel implements PlotStoryCircleInterface {
	protected metadata: StoryCircleMetadataInterface|any;

	public get storyCircle(): StoryCircleInterface {
		return new StoryCirclePlot(this.metadata);
	}
}
