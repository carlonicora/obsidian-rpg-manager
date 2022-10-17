import {DateTime} from "luxon";

export class DateHelper {
	public static create(
		date: string,
	): Date {
		return DateTime.fromISO(date).toJSDate();
	}

	public static age(
		birth: Date,
		deathOrNow: Date,
	): number {
		const end = DateTime.fromISO(deathOrNow.toISOString());
		const start = DateTime.fromISO(birth.toISOString());

		return Math.floor(end.diff(start, "years").years);
	}
}
