import {AbstractComponentV2} from "../abstracts/AbstractComponentV2";
import {ComponentStage} from "./enums/ComponentStage";
import {AbtPlotInterface} from "../../_plots/interfaces/AbtPlotInterface";
import {StoryCirclePlotInterface} from "../../_plots/interfaces/StoryCirclePlotInterface";
import {AbtPlot} from "../../_plots/AbtPlot";
import {StoryCirclePlot} from "../../_plots/StoryCirclePlot";
import {SubplotV2Interface} from "./interfaces/SubplotV2Interface";
import {SubplotMetadataInterface} from "../interfaces/metadatas/SubplotMetadataInterface";

export class SubplotV2 extends AbstractComponentV2 implements SubplotV2Interface {
	protected metadata: SubplotMetadataInterface;
	public stage: ComponentStage = ComponentStage.Plot;

	public get abtPlot(): AbtPlotInterface {
		return new AbtPlot(this.metadata.abt);
	}

	public get storyCirclePlot(): StoryCirclePlotInterface {
		return new StoryCirclePlot(this.metadata.storyCircle);
	}
}
