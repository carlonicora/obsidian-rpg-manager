import {PlotInterface} from "./PlotInterface";

export interface AbtPlotInterface extends PlotInterface{
	get need(): string;
	get and(): string;
	get but(): string;
	get therefore(): string;
}
