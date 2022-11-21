import {Calendar} from "obsidian-fantasy-calendar";
import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";
import {CalendarType} from "../../../services/dateService/enums/CalendarType";
import {IndexInterface} from "../../../services/indexService/interfaces/IndexInterface";

export interface CampaignDataInterface {
	get date(): DateInterface|undefined;
	get currentAdventureId(): IndexInterface|undefined;
	get currentActId(): IndexInterface|undefined;
	get currentSessionId(): IndexInterface|undefined;
	get calendar(): CalendarType;
	get fantasyCalendar(): Calendar|undefined;
}
