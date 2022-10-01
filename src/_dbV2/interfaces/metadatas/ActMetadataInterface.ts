import {ComponentMetadataInterface} from "./ComponentMetadataInterface";
import {AbtPlotMetadataInterface} from "./AbtPlotMetadataInterface";
import {StoryCircleMetadataInterface} from "./StoryCircleMetadataInterface";
import {AbtStage} from "../../../enums/AbtStage";

export interface ActMetadataInterface extends ComponentMetadataInterface{
	abt?: AbtPlotMetadataInterface | undefined;
	storyCircle?: StoryCircleMetadataInterface | undefined;
	abtStage?: AbtStage | undefined;
}
