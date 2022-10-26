import {PlotsInterface} from "./interfaces/PlotsInterface";
import {PlotsMetadataInterface} from "./interfaces/PlotsMetadataInterface";
import {AbstractModel} from "../../api/modelsManager/abstracts/AbstractModel";
import {AbtInterface} from "./interfaces/AbtInterface";
import {AbtPlot} from "./AbtPlot";
import {StoryCircleInterface} from "./interfaces/StoryCircleInterface";
import {StoryCirclePlot} from "./StoryCirclePlot";

export class Plots extends AbstractModel implements PlotsInterface {
	protected metadata: PlotsMetadataInterface|any;

	public get abt(): AbtInterface {
		return new AbtPlot(this.metadata);
	}

	public get storyCircle(): StoryCircleInterface {
		return new StoryCirclePlot(this.metadata);
	}
}
