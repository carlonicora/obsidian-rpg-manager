import {FantasyCalendarDateInterface} from "../../fantasyCalendarService/interfaces/FantasyCalendarDateInterface";

export interface DateInterface {
	date: Date|FantasyCalendarDateInterface,
	isFantasyCalendar: boolean,
}
