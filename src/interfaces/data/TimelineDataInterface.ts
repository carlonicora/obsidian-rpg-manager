import {GenericImageDataInterface} from "./GenericImageDataInterface";
import {DateTime} from "obsidian-dataview";

export interface TimelineDataInterface extends GenericImageDataInterface {
	synopsis: string;
	time: string;
	date: string;
	type: string;
	datetime: DateTime;

	getEventColour(): string;
}
