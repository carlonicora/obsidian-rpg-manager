import {CalendarType} from "../../../../services/date/enums/CalendarType";
import {DateInterface} from "../../../../services/date/interfaces/DateInterface";
import {Calendar} from "obsidian-fantasy-calendar/src/@types";

export interface CampaignDataInterface {
	get date(): DateInterface|undefined;
	get currentAdventureId(): string|undefined;
	get currentActId(): string|undefined;
	get currentSessionId(): string|undefined;
	get calendar(): CalendarType;
	get fantasyCalendar(): Calendar|undefined;
}
