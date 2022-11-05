import {Calendar, EventCategory} from "obsidian-fantasy-calendar";
import {FantasyCalendarCategory} from "../enums/FantasyCalendarCategory";

export interface FantasyCalendarServiceInterface {
	get calendars(): Calendar[];

	addCategory(
		category: FantasyCalendarCategory,
		calendar: Calendar,
	): Promise<EventCategory>;
}
