import {FantasyCalendarDateInterface} from "../../fantasyCalendar/interfaces/FantasyCalendarDateInterface";

export interface DateInterface {
	date: Date|FantasyCalendarDateInterface,
	isFantasyCalendar: boolean,
}
