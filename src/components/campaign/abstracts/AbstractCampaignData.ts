import {CampaignDataInterface} from "../interfaces/CampaignDataInterface";
import {CampaignMetadataInterface} from "../interfaces/CampaignMetadataInterface";
import {PlotsAbtOnly} from "../../../services/plotsServices/PlotsAbtOnly";
import {CalendarType} from "../../../../REFACTOR/services/dateService/enums/CalendarType";
import {FantasyCalendarService} from "../../../services/fantasyCalendarService/FantasyCalendarService";
import {DateService} from "../../../../REFACTOR/services/dateService/DateService";
import {DateInterface} from "../../../../REFACTOR/services/dateService/interfaces/DateInterface";
import {Calendar} from "obsidian-fantasy-calendar";
import {
	FantasyCalendarDateInterface
} from "../../../services/fantasyCalendarService/interfaces/FantasyCalendarDateInterface";

export abstract class AbstractCampaignData extends PlotsAbtOnly implements CampaignDataInterface{
	protected metadata: CampaignMetadataInterface;

	public get date(): DateInterface|undefined {
		if (this.calendar === CalendarType.Gregorian)
			return this.api.service(DateService).getDate(
				this.metadata.data?.date,
				undefined,
				this,
			);
		const fantasyCalendar = this.fantasyCalendar;
		if (fantasyCalendar === undefined)
			return undefined;

		return {date: fantasyCalendar.current as FantasyCalendarDateInterface, isFantasyCalendar: true};
	}

	get currentAdventureId(): string|undefined {
		return this.metadata.data?.currentAdventureId;
	}

	get currentActId(): string|undefined {
		return this.metadata.data?.currentActId;
	}

	get currentSessionId(): string|undefined {
		return this.metadata.data?.currentSessionId;
	}

	get calendar(): CalendarType {
		if (this.frontmatter['fc-calendar'] === undefined)
			return CalendarType.Gregorian;

		const fantasyCalendarService = this.api.service(FantasyCalendarService);
		if (fantasyCalendarService === undefined)
			return CalendarType.Gregorian;

		return CalendarType.FantasyCalendar;
	}

	get fantasyCalendar(): Calendar|undefined {
		if (this.calendar === CalendarType.Gregorian)
			return undefined;

		const fantasyCalendarService = this.api.service(FantasyCalendarService);

		if (fantasyCalendarService === undefined)
			return undefined;

		const calendars = fantasyCalendarService.calendars;

		if (calendars.length === 1)
			return calendars[0];

		const searchedCalendar = calendars.filter((calendar: Calendar) => calendar.name === this.frontmatter['fc-calendar']);
		if (searchedCalendar.length === 1)
			return searchedCalendar[0];

		return undefined;
	}
}
