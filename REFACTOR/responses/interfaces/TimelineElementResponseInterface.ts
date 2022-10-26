import {FantasyCalendarDateInterface} from "../../../src/services/fantasyCalendar/interfaces/FantasyCalendarDateInterface";

export class TimelineElementResponseInterface {
	fullDate: Date|FantasyCalendarDateInterface;
	date: string;
	time: string;
	type: string;
	synopsis: string;
	link: string;
}
