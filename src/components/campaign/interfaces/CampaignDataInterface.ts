import {CalendarType} from "../../../../REFACTOR/services/dateService/enums/CalendarType";
import {DateInterface} from "../../../../REFACTOR/services/dateService/interfaces/DateInterface";
import {Calendar} from "obsidian-fantasy-calendar";

export interface CampaignDataInterface {
	get date(): DateInterface|undefined;
	get currentAdventureId(): string|undefined;
	get currentActId(): string|undefined;
	get currentSessionId(): string|undefined;
	get calendar(): CalendarType;
	get fantasyCalendar(): Calendar|undefined;
}
