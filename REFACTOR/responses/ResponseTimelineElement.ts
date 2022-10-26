import {TimelineElementResponseInterface} from "./interfaces/TimelineElementResponseInterface";
import {DateInterface} from "../services/date/interfaces/DateInterface";
import {FantasyCalendarDateInterface} from "../../src/services/fantasyCalendar/interfaces/FantasyCalendarDateInterface";

export class ResponseTimelineElement implements TimelineElementResponseInterface {
	constructor(
		public fullDate: Date|FantasyCalendarDateInterface,
		public date: string,
		public time: string,
		public type: string,
		public synopsis: string,
		public link: string,
	) {
	}
}
