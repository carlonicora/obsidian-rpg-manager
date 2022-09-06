import {TimelineElementResponseInterface} from "../../interfaces/response/TimelineElementResponseInterface";
import {DateTime} from "obsidian-dataview";

export class TimelineElementResponse implements TimelineElementResponseInterface {
	constructor(
		public fullDate: DateTime,
		public date: string,
		public time: string,
		public type: string,
		public synopsis: string,
		public link: string,
	) {
	}
}
