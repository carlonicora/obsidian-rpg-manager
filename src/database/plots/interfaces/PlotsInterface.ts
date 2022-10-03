import {AbtInterface} from "./AbtInterface";
import {StoryCircleInterface} from "./StoryCircleInterface";

export interface PlotsInterface {
	get abt(): AbtInterface;
	get storyCircle(): StoryCircleInterface;
}
