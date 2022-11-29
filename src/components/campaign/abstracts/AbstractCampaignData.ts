import {CampaignDataInterface} from "../interfaces/CampaignDataInterface";
import {CampaignMetadataInterface} from "../interfaces/CampaignMetadataInterface";
import {PlotsAbtOnly} from "../../../services/plotsService/plots/PlotsAbtOnly";
import {FantasyCalendarService} from "../../../services/fantasyCalendarService/FantasyCalendarService";
import {Calendar} from "obsidian-fantasy-calendar";
import {
	FantasyCalendarDateInterface
} from "../../../services/fantasyCalendarService/interfaces/FantasyCalendarDateInterface";
import {DateService} from "../../../services/dateService/DateService";
import {CalendarType} from "../../../services/dateService/enums/CalendarType";
import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";
import {IndexInterface} from "../../../services/indexService/interfaces/IndexInterface";
import {FantasyCalendarCategory} from "../../../services/fantasyCalendarService/enums/FantasyCalendarCategory";
import {AdventureInterface} from "../../adventure/interfaces/AdventureInterface";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {SessionInterface} from "../../session/interfaces/SessionInterface";

export abstract class AbstractCampaignData extends PlotsAbtOnly implements CampaignDataInterface {
	protected metadata: CampaignMetadataInterface;

	public get date(): DateInterface | undefined {
		if (this.calendar === CalendarType.Gregorian)
			return this.api.service(DateService).getDate(
				this.metadata.data?.date,
				FantasyCalendarCategory.CurrentDate,
				this,
			);

		const fantasyCalendar = this.fantasyCalendar;
		if (fantasyCalendar === undefined)
			return undefined;

		return {date: fantasyCalendar.current as FantasyCalendarDateInterface, isFantasyCalendar: true};
	}

	get currentAdventureId(): IndexInterface | undefined {
		if (this.metadata.data.currentAdventureId == undefined || this.metadata.data.currentAdventureId === '')
			return undefined;

		let response: IndexInterface | undefined = undefined;
		try {
			response = this.api.database.readById<AdventureInterface>(this.metadata.data.currentAdventureId).index;
		} catch (e) {
			//no need to trigger
		}

		return response;
	}

	get currentActId(): IndexInterface | undefined {
		if (this.metadata.data.currentActId == undefined || this.metadata.data.currentActId === '')
			return undefined;

		let response: IndexInterface | undefined = undefined;
		try {
			response = this.api.database.readById<ActInterface>(this.metadata.data.currentActId).index;
		} catch (e) {
			//no need to trigger
		}

		return response;
	}

	get currentSessionId(): IndexInterface | undefined {
		if (this.metadata.data.currentSessionId == undefined || this.metadata.data.currentSessionId === '')
			return undefined;

		let response: IndexInterface | undefined = undefined;
		try {
			response = this.api.database.readById<SessionInterface>(this.metadata.data.currentSessionId).index;
		} catch (e) {
			//no need to trigger
		}

		return response;
	}

	get calendar(): CalendarType {
		if (this.frontmatter['fc-calendar'] === undefined)
			return CalendarType.Gregorian;

		return CalendarType.FantasyCalendar;
	}

	get fantasyCalendar(): Calendar | undefined {
		if (this.calendar === CalendarType.Gregorian)
			return undefined;

		const calendars = this.api.service(FantasyCalendarService).calendars;

		if (calendars.length === 1)
			return calendars[0];

		const searchedCalendar = calendars.filter((calendar: Calendar) => calendar.name === this.frontmatter['fc-calendar']);
		if (searchedCalendar.length === 1)
			return searchedCalendar[0];

		return undefined;
	}
}
