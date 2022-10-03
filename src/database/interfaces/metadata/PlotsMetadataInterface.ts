import {AbtMetadataInterface} from "./AbtMetadataInterface";
import {StoryCircleMetadataInterface} from "./StoryCircleMetadataInterface";

export interface PlotsMetadataInterface {
	plot?: {
		abt?: AbtMetadataInterface;
		storycircle?: StoryCircleMetadataInterface;
	}
}
