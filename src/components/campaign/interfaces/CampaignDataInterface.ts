import {Calendar} from "obsidian-fantasy-calendar";
import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";
import {CalendarType} from "../../../services/dateService/enums/CalendarType";
import {IdInterface} from "../../../services/idService/interfaces/IdInterface";

export interface CampaignDataInterface {
	get date(): DateInterface|undefined;
	get currentAdventureId(): IdInterface|undefined;
	get currentActId(): IdInterface|undefined;
	get currentSessionId(): IdInterface|undefined;
	get calendar(): CalendarType;
	get fantasyCalendar(): Calendar|undefined;
}
