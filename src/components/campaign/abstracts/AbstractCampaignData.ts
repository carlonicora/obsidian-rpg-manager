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
import {IndexService} from "../../../services/indexService/IndexService";
import {IndexInterface} from "../../../services/indexService/interfaces/IndexInterface";
import {FantasyCalendarCategory} from "../../../services/fantasyCalendarService/enums/FantasyCalendarCategory";
import {ComponentType} from "../../../core/enums/ComponentType";

export abstract class AbstractCampaignData extends PlotsAbtOnly implements CampaignDataInterface{
	protected metadata: CampaignMetadataInterface;

	public get date(): DateInterface|undefined {
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

	get currentAdventureId(): IndexInterface|undefined {
		if (this.metadata.data.currentAdventureId == undefined || this.metadata.data.currentAdventureId === '')
			return undefined;

		let response: IndexInterface|undefined = undefined;
		try {
			//TODO CHANGE TO SOMETHING ELSE
			response = this.api.service(IndexService).createFromIndex(this.metadata.data.currentAdventureId);
		} catch (e) {
			if (this.metadata.data.currentAdventureId.indexOf('-') === -1){
				const [, campaignId, adventureId] = this.metadata.data.currentAdventureId.split('/');
				response = this.api.service(IndexService).create(ComponentType.Adventure, campaignId, adventureId);
			}
		}

		return response;
	}

	get currentActId(): IndexInterface|undefined {
		if (this.metadata.data.currentActId == undefined || this.metadata.data.currentActId === '')
			return undefined;

		let response: IndexInterface|undefined = undefined;
		try {
			//TODO CHANGE TO SOMETHING ELSE
			response = this.api.service(IndexService).createFromIndex(this.metadata.data.currentActId);
		} catch (e) {
			if (this.metadata.data.currentAdventureId.indexOf('-') === -1){
				const [, campaignId, adventureId, actId] = this.metadata.data.currentActId.split('/');
				response = this.api.service(IndexService).create(ComponentType.Act, campaignId, adventureId, actId);
			}
		}

		return response;
	}

	get currentSessionId(): IndexInterface|undefined {
		if (this.metadata.data.currentSessionId == undefined || this.metadata.data.currentSessionId === '')
			return undefined;

		let response: IndexInterface|undefined = undefined;
		try {
			//TODO CHANGE TO SOMETHING ELSE
			response = this.api.service(IndexService).createFromIndex(this.metadata.data.currentSessionId);
		} catch (e) {
			if (this.metadata.data.currentSessionId.indexOf('-') === -1)
				response = this.api.service(IndexService).create(ComponentType.Session, this.metadata.data.currentSessionId, this.campaign.index.id);

		}

		return response;
	}

	get calendar(): CalendarType {
		if (this.frontmatter['fc-calendar'] === undefined)
			return CalendarType.Gregorian;

		return CalendarType.FantasyCalendar;
	}

	get fantasyCalendar(): Calendar|undefined {
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
