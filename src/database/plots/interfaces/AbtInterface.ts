import {PlotInterface} from "./PlotInterface";

export interface AbtInterface extends PlotInterface{
	get need(): string;
	get and(): string;
	get but(): string;
	get therefore(): string;
}
