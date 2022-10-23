import {AbstractService} from "../../api/servicesManager/abstracts/AbstractService";
import {ServiceInterface} from "../../api/servicesManager/interfaces/ServiceInterface";
import {DateServiceInterface} from "./interfaces/DateServiceInterface";
import {DateInterface} from "./interfaces/DateInterface";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";
import {CalendarType} from "./enums/CalendarType";
import {DateTime} from "luxon";
import {FantasyCalendarDateInterface} from "../fantasyCalendar/interfaces/FantasyCalendarDateInterface";

export class DateService extends AbstractService implements ServiceInterface, DateServiceInterface {
	public getDate(
		metadataDate: string|undefined,
		frontmatterDate: FantasyCalendarDateInterface|undefined,
		component: ComponentInterface,
	): DateInterface|undefined {
		if (metadataDate === undefined && frontmatterDate === undefined)
			return undefined;

		const isFantasyCalendar: boolean = (component.campaign.calendar === CalendarType.FantasyCalendar);
		let responseDate: Date|FantasyCalendarDateInterface|undefined;

		if (isFantasyCalendar) {
			if (frontmatterDate === undefined)
				return undefined;

			const calendar = component.campaign.fantasyCalendar;
			if (calendar === undefined)
				return undefined;

			responseDate = frontmatterDate as FantasyCalendarDateInterface;
		} else {
			if (metadataDate === undefined)
				return undefined;

			responseDate = DateTime.fromISO(metadataDate.toString()).toJSDate();
		}

		return {date: responseDate, isFantasyCalendar: isFantasyCalendar}
	}
}
