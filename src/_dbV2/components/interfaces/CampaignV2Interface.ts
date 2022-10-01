import {ComponentV2Interface} from "../../interfaces/ComponentV2Interface";
import {AbtPlotInterface} from "../../../_plots/interfaces/AbtPlotInterface";

export interface CampaignV2Interface extends ComponentV2Interface {
	get date(): Date|undefined;
	get abtPlot(): AbtPlotInterface;
	get folder(): string;
}
