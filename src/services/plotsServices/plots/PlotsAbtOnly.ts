import {AbstractModel} from "../../../managers/modelsManager/abstracts/AbstractModel";
import {PlotAbtInterface} from "../interfaces/PlotAbtInterface";
import {AbtInterface} from "../interfaces/AbtInterface";
import {AbtPlotMetadataInterface} from "../interfaces/AbtPlotMetadataInterface";
import {AbtPlot} from "./AbtPlot";

export class PlotsAbtOnly extends AbstractModel implements PlotAbtInterface {
	protected metadata: AbtPlotMetadataInterface|any;

	public get abt(): AbtInterface{
		return new AbtPlot(this.metadata);
	}
}
