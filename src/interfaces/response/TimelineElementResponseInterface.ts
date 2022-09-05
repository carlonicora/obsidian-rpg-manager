import {DateTime} from "obsidian-dataview";

export class TimelineElementResponseInterface {
	fullDate: DateTime;
	date: string;
	time: string;
	type: string;
	synopsis: string;
	link: string;
}
