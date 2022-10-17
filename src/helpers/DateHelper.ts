const { DateTime } = require("luxon");

export class DateHelper {
	public static create(
		date: string|number,
	): Date {
		return DateTime.fromISO(date).toJSDate();
	}

	public static age(
		birth: Date,
		deathOrNow: Date,
	): number {
		const end = DateTime.fromISO(deathOrNow.toISOString());
		const start = DateTime.fromISO(birth.toISOString());

		return Math.floor(end.diff(start, "years").values.years);
	}
}
