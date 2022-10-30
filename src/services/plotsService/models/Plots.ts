import {PlotsInterface} from "../interfaces/PlotsInterface";
import {PlotsMetadataInterface} from "../interfaces/PlotsMetadataInterface";
import {AbstractModel} from "../../../managers/modelsManager/abstracts/AbstractModel";
import {AbtInterface} from "../interfaces/AbtInterface";
import {AbtPlot} from "../plots/AbtPlot";
import {StoryCircleInterface} from "../interfaces/StoryCircleInterface";
import {StoryCirclePlot} from "../plots/StoryCirclePlot";

export abstract class Plots extends AbstractModel implements PlotsInterface {
	protected metadata: PlotsMetadataInterface|any;

	public get abt(): AbtInterface {
		return new AbtPlot(this.metadata);
	}

	public get storyCircle(): StoryCircleInterface {
		return new StoryCirclePlot(this.metadata);
	}
}
