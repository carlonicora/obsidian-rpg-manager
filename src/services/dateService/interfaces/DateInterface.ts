import {FantasyCalendarDateInterface} from "../../fantasyCalendarService/interfaces/FantasyCalendarDateInterface";
import {FantasyCalendarCategory} from "../../fantasyCalendarService/enums/FantasyCalendarCategory";

export interface DateInterface {
	date: Date|FantasyCalendarDateInterface,
	isFantasyCalendar: boolean,
	category?: FantasyCalendarCategory,
}
