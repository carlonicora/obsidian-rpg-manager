import {PlotInterface} from "./PlotInterface";

export interface StoryCircleInterface extends PlotInterface{
	get you(): string;
	get need(): string;
	get go(): string;
	get search(): string;
	get find(): string;
	get take(): string;
	get return(): string;
	get change(): string;
}
