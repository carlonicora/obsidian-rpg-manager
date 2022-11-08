import {Calendar, Day, EventCategory} from "obsidian-fantasy-calendar";
import {FantasyCalendarCategory} from "../enums/FantasyCalendarCategory";
import {FantasyCalendarDateInterface} from "./FantasyCalendarDateInterface";
import {FantasyCalendarTextualDateInterface} from "./FantasyCalendarTextualDateInterface";

export interface FantasyCalendarServiceInterface {
	get calendars(): Calendar[];

	addCategory(
		category: FantasyCalendarCategory,
		calendar: Calendar,
	): Promise<EventCategory>;

	getDay(
		date: FantasyCalendarDateInterface|FantasyCalendarTextualDateInterface,
		calendar: Calendar,
	): Day;
}
