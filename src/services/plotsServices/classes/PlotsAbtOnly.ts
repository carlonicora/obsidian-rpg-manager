import {AbstractModel} from "../../../managers/modelsManager/abstracts/AbstractModel";
import {PlotAbtInterface} from "../oldInterfaces/PlotAbtInterface";
import {AbtInterface} from "../oldInterfaces/AbtInterface";
import {AbtPlotMetadataInterface} from "../oldInterfaces/AbtPlotMetadataInterface";
import {AbtPlot} from "./AbtPlot";

export class PlotsAbtOnly extends AbstractModel implements PlotAbtInterface {
	protected metadata: AbtPlotMetadataInterface|any;

	public get abt(): AbtInterface{
		return new AbtPlot(this.metadata);
	}
}
