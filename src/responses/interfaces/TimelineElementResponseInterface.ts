import {FantasyCalendarDateInterface} from "../../services/fantasyCalendar/interfaces/FantasyCalendarDateInterface";

export class TimelineElementResponseInterface {
	fullDate: Date|FantasyCalendarDateInterface;
	date: string;
	time: string;
	type: string;
	synopsis: string;
	link: string;
}
