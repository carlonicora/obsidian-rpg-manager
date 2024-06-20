export type DayOfTheWeekInterface = {
  number: number;
  name: string;
};

export type WeekInterface = {
  days: DayOfTheWeekInterface[];
};

export type MonthInterface = {
  number: number;
  name: string;
  days: number;
};

export type CalendarInterface = {
  week: WeekInterface;
  months: MonthInterface[];
  year: number;
};

export class DragonlanceCalendar implements CalendarInterface {
  public months: MonthInterface[] = [
    { number: 1, name: "Newkolt", days: 28 },
    { number: 2, name: "Deepkolt", days: 28 },
    { number: 3, name: "Brookgreen", days: 28 },
    { number: 4, name: "Yurthgreen", days: 28 },
    { number: 5, name: "Fleurgreen", days: 28 },
    { number: 6, name: "Holmswelth", days: 28 },
    { number: 7, name: "Fierswelt", days: 28 },
    { number: 8, name: "Paleswelt", days: 28 },
    { number: 9, name: "Reapember", days: 28 },
    { number: 10, name: "Gildember", days: 28 },
    { number: 11, name: "Darkember", days: 28 },
    { number: 12, name: "Frostkolt", days: 28 },
  ];
  public year: number = 351;
  public week: WeekInterface = {
    days: [
      { number: 1, name: "Linaras" },
      { number: 2, name: "Palast" },
      { number: 3, name: "Majetag" },
      { number: 4, name: "Kirinor" },
      { number: 5, name: "Misham" },
      { number: 6, name: "Bakukal" },
      { number: 7, name: "Bracha" },
    ],
  };
}

export class DateInterface {
  private _calendar: CalendarInterface;
  private _day: number;
  private _month: number;
  private _year: number;

  constructor(calendar: CalendarInterface, date: string);
  constructor(
    calendar: CalendarInterface,
    day: number,
    month: number,
    year: number,
  );
  constructor(
    calendar: CalendarInterface,
    dayOrDate: number | string,
    month?: number,
    year?: number,
  ) {
    this._calendar = calendar;
    if (typeof dayOrDate === "string") {
      const [y, m, d] = dayOrDate.split("-").map(Number);
      this._year = y;
      this._month = m;
      this._day = d;
    } else {
      this._day = dayOrDate;
      this._month = month!;
      this._year = year!;
    }
  }

  get day(): number {
    return this._day;
  }

  get weekday(): DayOfTheWeekInterface {
    const totalDaysInAYear = this._calendar.months
      .map((month: MonthInterface) => month.days)
      .reduce((a, b) => a + b);

    const totalDays =
      (this._year - 1) * totalDaysInAYear +
      this._calendar.months
        .slice(0, this._month - 1)
        .map((month: MonthInterface) => month.days)
        .reduce((a, b) => a + b) +
      this._day;

    return this._calendar.week.days.find(
      (weekday: DayOfTheWeekInterface) => weekday.number === totalDays % 7,
    );
  }

  get month(): number {
    return this._month;
  }

  get year(): number {
    return this._year;
  }

  get date(): string {
    return `${this._year}-${this._month}-${this._day}`;
  }
}
