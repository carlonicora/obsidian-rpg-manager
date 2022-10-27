import {AbstractModel} from "../../../managers/modelsManager/abstracts/AbstractModel";
import {PlotStoryCircleInterface} from "../oldInterfaces/PlotStoryCircleInterface";
import {StoryCircleMetadataInterface} from "../oldInterfaces/StoryCircleMetadataInterface";
import {StoryCircleInterface} from "../oldInterfaces/StoryCircleInterface";
import {StoryCirclePlot} from "./StoryCirclePlot";

export class PlotsStoryCircleOnly extends AbstractModel implements PlotStoryCircleInterface {
	protected metadata: StoryCircleMetadataInterface|any;

	public get storyCircle(): StoryCircleInterface {
		return new StoryCirclePlot(this.metadata);
	}
}
