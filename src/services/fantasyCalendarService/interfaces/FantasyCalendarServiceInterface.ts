import {Calendar} from "obsidian-fantasy-calendar";

export interface FantasyCalendarServiceInterface {
	get calendars(): Calendar[];
}
