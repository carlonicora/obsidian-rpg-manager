import {ComponentV2Interface} from "../../interfaces/ComponentV2Interface";
import {AbtPlotInterface} from "../../../_plots/interfaces/AbtPlotInterface";
import {StoryCirclePlotInterface} from "../../../_plots/interfaces/StoryCirclePlotInterface";

export interface SubplotV2Interface extends ComponentV2Interface {
	get abtPlot(): AbtPlotInterface;
	get storyCirclePlot(): StoryCirclePlotInterface;
}
