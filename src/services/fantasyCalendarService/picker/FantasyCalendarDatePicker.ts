import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {FantasyCalendarDateInterface} from "../interfaces/FantasyCalendarDateInterface";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {Calendar, Month} from "obsidian-fantasy-calendar";
import {FantasyCalendarService} from "../FantasyCalendarService";

export class FantasyCalendarDatePicker {
	private _calendar: Calendar;

	private _pickerEl: HTMLDivElement|undefined;
	private _monthContainerEl: HTMLDivElement;
	private _monthSelectorEl: HTMLSelectElement;
	private _yearSelectorEl: HTMLInputElement;

	private _percentageWidth: string;
	private _width: string;
	private _height: string;

	constructor(
		private _api: RpgManagerApiInterface,
		private _containerEl: HTMLInputElement,
		private _model: ModelInterface,
		private _saver: any,
		private _currentDate?: FantasyCalendarDateInterface,
	) {
		if (this._model.campaign.fantasyCalendar === undefined)
			throw new Error('');

		if (this._currentDate === undefined){
			if (this._model.campaign.date !== undefined) {
				this._currentDate = this._model.campaign.date.date as FantasyCalendarDateInterface;
			}
		}

		this._calendar = this._model.campaign.fantasyCalendar;

		this._percentageWidth = (100 / this._calendar.static.weekdays.length).toString() + '%';
		this._width = (300/this._calendar.static.weekdays.length).toString() + 'px';
		this._height = (300/this._calendar.static.weekdays.length) > 39 ? '39px' : (300/this._calendar.static.weekdays.length).toString() + 'px';


		this._containerEl.addEventListener('focusin', this._show.bind(this));
	}

	private async _show(
	): Promise<void> {
		this._pickerEl = document.createElement('div');
		this._pickerEl.addClass('rpg-manager-fantasy-calendar-picker');
		const pickerContainerEl: HTMLDivElement = this._pickerEl.createDiv({cls: 'rpg-manager-fantasy-calendar-picker-container'});

		this._addNavigatorContainer(pickerContainerEl);
		this._addMonthContainer(pickerContainerEl);

		this._containerEl.parentElement?.append(this._pickerEl as Node);
		this._loadMonth();

		this._pickerEl.addEventListener('focusout', this._hide.bind(this));
	}

	private _save(
		date: FantasyCalendarDateInterface,
	): void {
		this._containerEl.value = this._api.service(FantasyCalendarService).getDay(date, this._calendar).displayDate;
		this._saver(this._containerEl.value);
		this._hide();
	}

	private async _hide(
	): Promise<void> {
		if (this._pickerEl === undefined)
			return;

		this._pickerEl.remove();
		this._pickerEl = undefined;
	}

	private _addNavigatorContainer(
		containerEl: HTMLDivElement,
	): void {
		const navigationContainerEl: HTMLDivElement = containerEl.createDiv({cls: 'rpg-manager-fantasy-calendar-picker-navigation clearfix'});

		const previousMonthElement: HTMLDivElement = navigationContainerEl.createDiv({cls: 'rpg-manager-fantasy-calendar-picker-navigation-previous', text: '<'});
		previousMonthElement.addEventListener('click', this._previousMonth.bind(this));

		const monthSelectorContainerEl: HTMLDivElement = navigationContainerEl.createDiv({cls: 'rpg-manager-fantasy-calendar-picker-navigation-month-container'});
		this._monthSelectorEl = monthSelectorContainerEl.createEl('select', {cls: 'rpg-manager-fantasy-calendar-picker-navigation-month-selector'});
		this._monthSelectorEl.addEventListener('change', () => {
			this._loadMonth();
		});

		this._calendar.static.months.forEach((month: Month, index: number) => {
			const monthEl: HTMLOptionElement = this._monthSelectorEl.createEl('option', {value: index.toString(), text: month.name});
			this._monthSelectorEl.add(
				monthEl
			);
		});

		if (this._currentDate !== undefined)
			this._monthSelectorEl.selectedIndex = this._currentDate.month;

		const nextMonthElement: HTMLDivElement = navigationContainerEl.createDiv({cls: 'rpg-manager-fantasy-calendar-picker-navigation-next', text: '>'});
		nextMonthElement.addEventListener('click', this._nextMonth.bind(this));

		const yearSelectorContainer: HTMLDivElement = navigationContainerEl.createDiv({cls: 'rpg-manager-fantasy-calendar-picker-navigation-year-container'});

		this._yearSelectorEl = yearSelectorContainer.createEl('input', {cls: 'rpg-manager-fantasy-calendar-picker-navigation-year', type: 'text', value: this._currentDate !== undefined ? this._currentDate.year.toString() : ''});
		this._yearSelectorEl.addEventListener('focusout', () => {
			this._loadMonth();
		});

		const addYear = yearSelectorContainer.createDiv({cls: 'rpg-manager-fantasy-calendar-picker-navigation-year-add', text: '+'});
		addYear.addEventListener('click', () => {
			this._yearSelectorEl.value = (+this._yearSelectorEl.value + 1).toString();
			this._loadMonth();
		});

		const removeYear = yearSelectorContainer.createDiv({cls: 'rpg-manager-fantasy-calendar-picker-navigation-year-remove', text: '-'});
		removeYear.addEventListener('click', () => {
			this._yearSelectorEl.value = (+this._yearSelectorEl.value - 1).toString();
			this._loadMonth();
		});
	}

	private _addMonthContainer(
		containerEl: HTMLDivElement,
	): void {
		this._monthContainerEl = containerEl.createDiv({cls: 'rpg-manager-fantasy-calendar-picker-month'});
	}

	private _previousMonth(
	): void {
		if (+this._monthSelectorEl.value === 0){
			this._yearSelectorEl.value = (+this._yearSelectorEl.value - 1).toString();
			this._monthSelectorEl.selectedIndex = this._calendar.static.months.length - 1;
		} else {
			this._monthSelectorEl.selectedIndex = this._monthSelectorEl.selectedIndex - 1;
		}

		this._loadMonth();
	}

	private _nextMonth(
	): void {
		if (+this._monthSelectorEl.value === this._calendar.static.months.length - 1){
			this._yearSelectorEl.value = (+this._yearSelectorEl.value + 1).toString();
			this._monthSelectorEl.selectedIndex = 0;
		} else {
			this._monthSelectorEl.selectedIndex = this._monthSelectorEl.selectedIndex + 1;
		}

		this._loadMonth();
	}

	private _loadMonth(
	): void {
		this._monthContainerEl.empty();

		const daysInAWeek: number = this._calendar.static.weekdays.length;
		const weekdays: any = this._calendar.static.weekdays;
		const month: Month = this._calendar.static.months[+this._monthSelectorEl.value];


		const weekdaysEl: HTMLDivElement = this._monthContainerEl.createDiv({cls: 'rpg-manager-fantasy-calendar-picker-month-weekdays'});
		const weekdayContainerEl: HTMLDivElement = weekdaysEl.createDiv({cls: 'rpg-manager-fantasy-calendar-picker-month-weekday-container'});

		weekdays.forEach((day: any) => {
			const weekdayEl: HTMLSpanElement = weekdayContainerEl.createSpan({cls: 'rpg-manager-fantasy-calendar-picker-month-weekday', text: day.name.substring(0,3)});
			this._setDayStyle(weekdayEl);
		});

		let dayCount = 0;

		let awaitWeekStart = true;
		let dayOfTheWeek = 0;
		const firstDay = this._api.service(FantasyCalendarService).getDay({year: +this._yearSelectorEl.value, month: +this._monthSelectorEl.value, day: 1}, this._calendar);

		const daysEl: HTMLDivElement =  this._monthContainerEl.createDiv({cls: 'rpg-manager-fantasy-calendar-picker-month-days'});
		const dayContainerEl: HTMLDivElement = daysEl.createDiv({cls: 'rpg-manager-fantasy-calendar-picker-month-day-container'});

		while (dayCount < month.length) {
			const dayEl: HTMLSpanElement = dayContainerEl.createSpan({cls: 'rpg-manager-fantasy-calendar-picker-month-day'});
			let date = {
				year: +this._yearSelectorEl.value,
				month: +this._monthSelectorEl.value,
				day: dayCount + 1,
			};
			if (awaitWeekStart && firstDay.weekday > dayOfTheWeek) {
				date = this._removeDays(date.year, date.month, firstDay.weekday - dayOfTheWeek);
				dayEl.addClass('rpg-manager-fantasy-calendar-picker-previous-month-day');
			} else {
				awaitWeekStart = false;
				dayCount++;
			}
			dayEl.textContent = date.day.toString();

			dayOfTheWeek++;

			this._setDayStyle(dayEl);

			dayEl.addEventListener('click', () => {
				this._save(date);
			});
		}

		let additionalDays = 0;
		while (dayOfTheWeek % daysInAWeek !== 0){
			additionalDays++;
			const newDate = this._addDays(+this._yearSelectorEl.value, +this._monthSelectorEl.value, additionalDays);
			const dayEl: HTMLSpanElement = dayContainerEl.createSpan({cls: 'rpg-manager-fantasy-calendar-picker-month-day'});
			dayEl.textContent = newDate.day.toString();
			dayEl.addClass('rpg-manager-fantasy-calendar-picker-previous-month-day');
			this._setDayStyle(dayEl);

			dayEl.addEventListener('click', () => {
				this._save(newDate);
			});

			dayOfTheWeek++;
		}
	}

	private _removeDays(
		year: number,
		month: number,
		daysToRemove: number,
	): FantasyCalendarDateInterface {
		let newDays = 0;
		let newMonth: number = (month === 0 ? this._calendar.static.months.length  : month - 1);
		let newYear: number = month === 0 ? year - 1 : year;
		let newMonthDetails: Month = this._calendar.static.months[newMonth];
		if (newMonthDetails.length <= daysToRemove) {
			newMonth = (newMonth === 0 ? this._calendar.static.months.length : newMonth - 1);
			newYear = (newMonth === 0 ? newYear - 1 : newYear);
			newDays = daysToRemove - newMonthDetails.length + 1;
			newMonthDetails = this._calendar.static.months[newMonth];
			newDays = newMonthDetails.length - newDays + 1;
		} else {
			newDays = newMonthDetails.length - daysToRemove + 1;
		}

		return {
			year: newYear,
			month: newMonth,
			day: newDays,
		};
	}

	private _addDays(
		year: number,
		month: number,
		daysToAdd: number,
	): FantasyCalendarDateInterface {
		let newDay: number = daysToAdd;
		let newMonth: number = month === this._calendar.static.months.length ? 0 : month + 1;
		let newYear: number = month === this._calendar.static.months.length ? year + 1 : year;

		const newMonthDetails: Month = this._calendar.static.months[newMonth];
		if (newDay > newMonthDetails.length) {
			newDay = newMonthDetails.length - newDay;
			if (newMonth === this._calendar.static.months.length) {
				newMonth = 0;
				newYear = newYear + 1;
			}
		}

		return {
			year:newYear,
			month:newMonth,
			day:newDay,
		};
	}

	private _setDayStyle(
		containerEl: HTMLSpanElement,
	): void {
		containerEl.style.width = this._percentageWidth;
		containerEl.style.flexBasis = this._percentageWidth;
		containerEl.style.maxWidth = this._width;
		containerEl.style.height = this._height;
		containerEl.style.lineHeight = this._height;
	}
}
