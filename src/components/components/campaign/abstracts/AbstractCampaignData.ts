import {CampaignDataInterface} from "../interfaces/CampaignDataInterface";
import {CampaignMetadataInterface} from "../interfaces/CampaignMetadataInterface";
import {PlotsAbtOnly} from "../../../../plots/PlotsAbtOnly";
import {DateHelper} from "../../../../helpers/DateHelper";
import {CalendarType} from "../../../../services/date/enums/CalendarType";
import {FantasyCalendarService} from "../../../../services/fantasyCalendar/FantasyCalendarService";
import {DateService} from "../../../../services/date/DateService";
import {
	FantasyCalendarDateInterface
} from "../../../../services/fantasyCalendar/interfaces/FantasyCalendarDateInterface";
import {DateInterface} from "../../../../services/date/interfaces/DateInterface";
import {Calendar} from "obsidian-fantasy-calendar";

export abstract class AbstractCampaignData extends PlotsAbtOnly implements CampaignDataInterface{
	protected metadata: CampaignMetadataInterface;

	public get date(): DateInterface|undefined {
		return this.api.service.get(DateService)?.getDate(
			this.metadata.data?.date,
			this.frontmatter['fc-date'],
			this,
		);
	}

	get currentAdventureId(): string|undefined {
		return this.metadata.data?.currentAdventureId;
	}

	get currentActId(): string|undefined {
		return this.metadata.data?.currentActId;
	}

	get currentSessionId(): string|undefined {
		return this.metadata.data?.currentSessionId
	}

	get calendar(): CalendarType {
		if (this.metadata.data?.calendar === undefined || this.metadata.data.calendar.toLowerCase() === 'gregorian')
			return CalendarType.Gregorian;

		const fantasyCalendarService = this.api.service.get(FantasyCalendarService);
		if (fantasyCalendarService === undefined)
			return CalendarType.Gregorian;

		return CalendarType.FantasyCalendar;
	}

	get fantasyCalendar(): Calendar|undefined {
		if (this.calendar === CalendarType.Gregorian)
			return undefined;

		const fantasyCalendarService = this.api.service.get(FantasyCalendarService);
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
