import {AbstractComponent} from "../abstracts/AbstractComponent";
import {PlotStoryCircleInterface} from "./interfaces/PlotStoryCircleInterface";
import {StoryCircleMetadataInterface} from "../interfaces/metadata/StoryCircleMetadataInterface";
import {StoryCircleInterface} from "./interfaces/StoryCircleInterface";
import {StoryCirclePlot} from "./StoryCirclePlot";

export class PlotsStoryCircleOnly extends AbstractComponent implements PlotStoryCircleInterface {
	protected metadata: StoryCircleMetadataInterface|any;

	public get storyCircle(): StoryCircleInterface {
		return new StoryCirclePlot(this.metadata);
	}
}
