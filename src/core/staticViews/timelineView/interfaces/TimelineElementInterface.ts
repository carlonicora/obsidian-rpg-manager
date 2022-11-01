import {
	FantasyCalendarDateInterface
} from "../../../../services/fantasyCalendarService/interfaces/FantasyCalendarDateInterface";

export class TimelineElementInterface {
	fullDate: Date|FantasyCalendarDateInterface;
	date: string;
	time: string;
	type: string;
	synopsis: string;
	link: string;
}
