import {AbstractComponentV2} from "../abstracts/AbstractComponentV2";
import {AdventureV2Interface} from "./interfaces/AdventureV2Interface";
import {ComponentStage} from "./enums/ComponentStage";
import {AbtPlotInterface} from "../../_plots/interfaces/AbtPlotInterface";
import {StoryCirclePlotInterface} from "../../_plots/interfaces/StoryCirclePlotInterface";
import {AbtPlot} from "../../_plots/AbtPlot";
import {AdventureMetadataInterface} from "../metadatas/interfaces/AdventureMetadataInterface";
import {StoryCirclePlot} from "../../_plots/StoryCirclePlot";

export class AdventureV2 extends AbstractComponentV2 implements AdventureV2Interface {
	protected metadata: AdventureMetadataInterface;
	public stage: ComponentStage = ComponentStage.Plot;

	public get abtPlot(): AbtPlotInterface {
		return new AbtPlot(this.metadata.abt);
	}

	public get storyCirclePlot(): StoryCirclePlotInterface {
		return new StoryCirclePlot(this.metadata.storyCircle);
	}
}
