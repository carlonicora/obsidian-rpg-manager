import {PlotsInterface} from "./interfaces/PlotsInterface";
import {PlotsMetadataInterface} from "../metadatas/PlotsMetadataInterface";
import {AbstractComponent} from "../databases/abstracts/AbstractComponent";
import {AbtInterface} from "./interfaces/AbtInterface";
import {AbtPlot} from "./AbtPlot";
import {StoryCircleInterface} from "./interfaces/StoryCircleInterface";
import {StoryCirclePlot} from "./StoryCirclePlot";

export class Plots extends AbstractComponent implements PlotsInterface {
	protected metadata: PlotsMetadataInterface|any;

	public get abt(): AbtInterface {
		return new AbtPlot(this.metadata);
	}

	public get storyCircle(): StoryCircleInterface {
		return new StoryCirclePlot(this.metadata);
	}
}
