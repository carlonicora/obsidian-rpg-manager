import {TimelineElementInterface} from "./interfaces/TimelineElementInterface";
import {
	FantasyCalendarDateInterface
} from "../../../services/fantasyCalendarService/interfaces/FantasyCalendarDateInterface";

export class TimelineElement implements TimelineElementInterface {
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
