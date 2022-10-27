import {PlotsInterface} from "../oldInterfaces/PlotsInterface";
import {PlotsMetadataInterface} from "../oldInterfaces/PlotsMetadataInterface";
import {AbstractModel} from "../../../managers/modelsManager/abstracts/AbstractModel";
import {AbtInterface} from "../oldInterfaces/AbtInterface";
import {AbtPlot} from "./AbtPlot";
import {StoryCircleInterface} from "../oldInterfaces/StoryCircleInterface";
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
