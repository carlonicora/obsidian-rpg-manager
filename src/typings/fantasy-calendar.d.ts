declare module "obsidian-fantasy-calendar" {
	interface API {
		getCalendars(): Calendar[];

		getMoons(
			date?: CurrentCalendarData,
			name?: string
		): Array<{ moon: Moon; phase: Phase; icon: HTMLSpanElement }>;

		getDay(
			date: { year: number; month: string; day: number },
			calendar: Calendar | string
		): Day;
		/**
		 *
		 * @param date Date object using a ZERO INDEXED month.
		 * @param calendar Calendar object or name of calendar.
		 */
		getDay(
			date: { year: number; month: number; day: number },
			calendar: Calendar | string
		): Day;

		addCategoryToCalendar(
			category: EventCategory,
			calendar: Calendar | string,
		): Promise<void>;
	}

	export type Day = {
		moons: [Moon, Phase][];
		events: Event[];
		date: CurrentCalendarData;
		longDate: {
			day: number;
			month: string;
			year: number;
		};
		leapDay: LeapDay;
		weekday: number;
		displayDate: string;
	};

	export interface Calendar {
		id: string;
		name: string;
		description: string;
		static: StaticCalendarData;
		current: CurrentCalendarData;
		_current?: CurrentCalendarData;
		events: Event[];
		categories: EventCategory[];
		date?: number;
		displayWeeks?: boolean;
		autoParse: boolean;
		path: string;
		supportTimelines: boolean;
		syncTimelines: boolean;
		timelineTag: string;
	}

	export interface StaticCalendarData {
		firstWeekDay: number;
		overflow: boolean;
		weekdays: Week;
		months: Month[];
		leapDays: LeapDay[];
		moons: Moon[];
		displayMoons: boolean;
		displayDayNumber: boolean;
		eras: Era[];
		offset?: number;
		incrementDay: boolean;
		useCustomYears?: boolean;
		years?: Year[];
	}

	export interface CurrentCalendarData {
		year: number;
		month: number;
		day: number;
	}

	export interface TimeSpan {
		type: string;
		name: string;
		id: string;
	}

	export interface Year extends TimeSpan {
	}

	export type Week = Day[];

	export interface Month extends TimeSpan {
		length: number;
	}

	export interface IntercalaryMonth extends Month {
		length: 1;
		type: "intercalary";
	}

	interface LeapDayCondition {
		ignore: boolean; //ignore offset
		exclusive: boolean; //causes failure if true
		interval: number; //how many years between checking
	}

	export interface LeapDay extends Day {
		interval: LeapDayCondition[];
		timespan: number;
		intercalary: boolean;
		offset: number;
		numbered?: boolean;
		after?: number;
	}

	export interface Season {
		name: string;
		start: {
			month: Month;
			day: Day;
		};
	}

	export interface Era {
		id: string;
		name: string;
		format: string;
		restart: boolean;
		endsYear: boolean;
		event: boolean;
		start: CurrentCalendarData;
		eventDescription?: string;
		eventCategory?: string;
	}

	export interface Event {
		name: string;
		description: string;
		date: {
			month: number;
			day: number;
			year: number;
		};
		end?: {
			month: number;
			day: number;
			year: number;
		};
		id: string;
		note: string;
		category: string;
		timestamp?: number;
		auto?: boolean;
		formulas?: EventFormula[];
	}

	type EventFormula = FormulaInterval;

	interface FormulaInterval {
		type: "interval";
		number: number;
		timespan: "days";
	}

	export interface ColorEvent extends Event {
		color: string;
	}

	export interface EventCategory {
		name: string;
		color: string;
		id: string;
	}

	export interface EventCondition {
	}

	export interface Moon {
		name: string;
		cycle: number;
		offset: number;
		faceColor: string;
		shadowColor: string;
		id: string;
	}

	export type Phase =
		| "New Moon"
		| "New Moon Fading"
		| "New Moon Faded"
		| "Waxing Crescent Rising"
		| "Waxing Crescent Risen"
		| "Waxing Crescent"
		| "Waxing Crescent Fading"
		| "Waxing Crescent Faded"
		| "First Quarter Rising"
		| "First Quarter Risen"
		| "First Quarter"
		| "First Quarter Fading"
		| "First Quarter Faded"
		| "Waxing Gibbous Rising"
		| "Waxing Gibbous Risen"
		| "Waxing Gibbous"
		| "Waxing Gibbous Fading"
		| "Waxing Gibbous Faded"
		| "Full Moon Rising"
		| "Full Moon Risen"
		| "Full Moon"
		| "Full Moon Fading"
		| "Full Moon Faded"
		| "Waning Gibbous Rising"
		| "Waning Gibbous Risen"
		| "Waning Gibbous"
		| "Waning Gibbous Fading"
		| "Waning Gibbous Faded"
		| "Last Quarter Rising"
		| "Last Quarter Risen"
		| "Last Quarter"
		| "Last Quarter Fading"
		| "Last Quarter Faded"
		| "Waning Crescent Rising"
		| "Waning Crescent Risen"
		| "Waning Crescent"
		| "Waning Crescent Fading"
		| "Waning Crescent Faded"
		| "New Moon Rising"
		| "New Moon Risen";
}
