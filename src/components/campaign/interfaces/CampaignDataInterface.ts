import {Calendar} from "obsidian-fantasy-calendar";
import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";
import {CalendarType} from "../../../services/dateService/enums/CalendarType";

export interface CampaignDataInterface {
	get date(): DateInterface|undefined;
	get currentAdventureId(): string|undefined;
	get currentActId(): string|undefined;
	get currentSessionId(): string|undefined;
	get calendar(): CalendarType;
	get fantasyCalendar(): Calendar|undefined;
}
