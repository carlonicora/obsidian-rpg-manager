import {AbstractComponent} from "../components/abstracts/AbstractComponent";
import {PlotAbtInterface} from "./interfaces/PlotAbtInterface";
import {AbtInterface} from "./interfaces/AbtInterface";
import {AbtPlotMetadataInterface} from "./interfaces/AbtPlotMetadataInterface";
import {AbtPlot} from "./AbtPlot";

export class PlotsAbtOnly extends AbstractComponent implements PlotAbtInterface {
	protected metadata: AbtPlotMetadataInterface|any;

	public get abt(): AbtInterface{
		return new AbtPlot(this.metadata);
	}
}
