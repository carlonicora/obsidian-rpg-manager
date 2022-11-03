import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {DateServiceInterface} from "./interfaces/DateServiceInterface";
import {DateInterface} from "./interfaces/DateInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {CalendarType} from "./enums/CalendarType";
import {DateTime} from "luxon";
import {FantasyCalendarDateInterface} from "../fantasyCalendarService/interfaces/FantasyCalendarDateInterface";

export class DateService extends AbstractService implements ServiceInterface, DateServiceInterface {
	public getDate(
		metadataDate: string|undefined,
		frontmatterDate: FantasyCalendarDateInterface|undefined,
		component: ModelInterface,
	): DateInterface|undefined {
		if ((metadataDate == undefined || metadataDate === '') && frontmatterDate === undefined)
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
			if (metadataDate == undefined || metadataDate === '')
				return undefined;

			responseDate = DateTime.fromISO(metadataDate.toString()).toJSDate();
		}

		return {date: responseDate, isFantasyCalendar: isFantasyCalendar};
	}

	public getReadableDate(
		date: DateInterface|undefined,
		component: ModelInterface,
	): string {
		if (date === undefined)
			return '';

		if (date.isFantasyCalendar) {
			const fantasyDate = date.date as FantasyCalendarDateInterface;
			const fantasyCalendar = component.campaign.fantasyCalendar;

			if (fantasyDate === undefined || fantasyCalendar === undefined)
				return '';

			const day = window.FantasyCalendarAPI.getDay(fantasyDate, fantasyCalendar);
			return day.displayDate;
		} else {

			return (<Date>date.date).toDateString();
		}
	}

	public getAge(
		dob: DateInterface|undefined,
		death: DateInterface|undefined,
		currentDate: DateInterface|undefined,
		component: ModelInterface,
	): number|undefined {
		if (dob === undefined)
			return undefined;

		const deathOrNow = (death !== undefined ? death : currentDate);

		if (deathOrNow === undefined)
			return undefined;

		if (dob.isFantasyCalendar){
			const end = deathOrNow.date as FantasyCalendarDateInterface;
			const start = dob.date as FantasyCalendarDateInterface;

			let response = end.year - start.year;
			if (end.month < start.month){
				response--;
			} else if (end.month === start.month) {
				if (end.day < start.day) {
					response--;
				}
			}

			return response;
		} else {
			const end = DateTime.fromISO((<Date>deathOrNow.date).toISOString());
			const start = DateTime.fromISO((<Date>dob.date).toISOString());

			return Math.floor(end.diff(start, "years").years);
		}
	}

	public formatMinutesSeconds(
		durationInSeconds?: number,
	): string {
		if (durationInSeconds === undefined)
			return '00:00:00';

		const hours: number = Math.floor(durationInSeconds / 3600);
		const minutes: number = Math.floor((durationInSeconds - hours * 3600) / 60);
		const seconds: number = Math.floor(durationInSeconds - hours * 3600 - minutes * 60);

		return  this._padHMS(hours) + ':' + this._padHMS(minutes) + ':' + this._padHMS(seconds);
	}

	private _padHMS(
		duration: number,
	): string {
		if (duration === 0)
			return '00';

		if (duration < 10)
			return '0' + duration.toString();

		return duration.toString();
	}
}
