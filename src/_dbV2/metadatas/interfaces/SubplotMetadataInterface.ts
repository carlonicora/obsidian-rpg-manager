import {AbtPlotMetadataInterface} from "./AbtPlotMetadataInterface";
import {StoryCircleMetadataInterface} from "./StoryCircleMetadataInterface";
import {ComponentMetadataInterface} from "./ComponentMetadataInterface";

export interface SubplotMetadataInterface extends ComponentMetadataInterface{
	abt?: AbtPlotMetadataInterface | undefined;
	storyCircle?: StoryCircleMetadataInterface | undefined;
}
