import {AbstractElement} from "../../../../managers/viewsManager/abstracts/AbstractElement";
import {DateElementDataInterface} from "../../../dateService/views/elements/interfaces/DateElementDataInterface";
import {FantasyCalendarDateInterface} from "../../interfaces/FantasyCalendarDateInterface";
import {FantasyCalendarService} from "../../FantasyCalendarService";
import {Event, EventCategory} from "obsidian-fantasy-calendar";
import {FantasyCalendarCategory} from "../../enums/FantasyCalendarCategory";
import {DateService} from "../../../dateService/DateService";
import {FantasyCalendarDatePicker} from "../../picker/FantasyCalendarDatePicker";
import {randomUUID} from "crypto";

export class FantasyCalendarElement extends AbstractElement {
	private _event: any;
	private _data: DateElementDataInterface;
	private _inputEl: HTMLInputElement;

	render(
		data: DateElementDataInterface,
		containerEl: HTMLElement,
	) {
		this._data = data;

		const calendar = data.model.campaign.fantasyCalendar;
		if (calendar === undefined)
			return;

		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});
		this.createTitle(data.model, data.title, infoEl);

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});

		let dateValue = '';
		if (data.values !== undefined && data.values.date !== undefined && data.model.campaign.fantasyCalendar !== undefined)
			dateValue = this.api.service(FantasyCalendarService).getDay(data.values.date as FantasyCalendarDateInterface, data.model.campaign.fantasyCalendar).displayDate;

		const id = randomUUID();

		this._inputEl = contentEl.createEl('input', {cls: 'rpg-manager-fantasy-calendar-picker-launcher ' + id});
		this._inputEl.type = 'text';
		this._inputEl.value = dateValue;

		const picker:FantasyCalendarDatePicker = new FantasyCalendarDatePicker(
			this.api,
			this._inputEl,
			id,
			data.model,
			this._saveDate.bind(this),
			data.values?.date as FantasyCalendarDateInterface
		);

		this._inputEl.addEventListener('change', () => {
			this._saveDate(this._inputEl.value);
			picker.hide();
		});
	}

	private async _saveDate(
		newDate: string,
	): Promise<void> {
		if (newDate == undefined)
			return;

		if (this._data.values?.category === undefined && this._data.category === undefined)
			return;

		const categoryName = this._data.values?.category ?? this._data.category;
		if (categoryName === undefined)
			return;

		const calendar = this._data.model.campaign.fantasyCalendar;
		if (calendar === undefined)
			return;

		let categories: EventCategory[] = calendar.categories.filter(
			(category: EventCategory) => category.name === categoryName
		);

		if (categories.length === 0)
			categories = [await this.api.service(FantasyCalendarService).addCategory(categoryName, calendar)];

		const events: Event[] = calendar.events.filter((event: Event) =>
			event.note === this._data.model.file.basename &&
			event.category === categories[0].id
		);

		if (newDate === '' && events.length > 0){
			for (let index=0; index<calendar.events.length; index++){
				if (calendar.events[index].note === this._data.model.file.path && calendar.events[index].category === categories[0].id){
					calendar.events.splice(index, 1);
					break;
				}
			}
		} else {
			const [monthName, dirtyDay, yearNumber] = newDate.split(' ');
			const day = dirtyDay.replace(/\D/g,'');

			if (
				monthName == undefined ||
				day == undefined ||
				yearNumber == undefined ||
				!Number.isInteger(+yearNumber) ||
				monthName === '' ||
				day === ''
			)
				return;

			const newFantasyCalendarDay = this.api.service(FantasyCalendarService).getDay(
				{year: +yearNumber, month: monthName, day: +day},
				calendar,
			);

			if (
				(<FantasyCalendarDateInterface>this._data.values?.date)?.year === newFantasyCalendarDay.date.year &&
				(<FantasyCalendarDateInterface>this._data.values?.date)?.month === newFantasyCalendarDay.date.month &&
				(<FantasyCalendarDateInterface>this._data.values?.date)?.day === newFantasyCalendarDay.date.day
			)
				return;

			let event: Event | undefined = undefined;

			if (events.length === 1) {
				event = events[0];

				event.date = newFantasyCalendarDay.date;
			} else {
				let name = this._data.model.file.basename;

				switch (categoryName) {
					case FantasyCalendarCategory.Death:
						name = 'Death of ' + name;
						break;
					case FantasyCalendarCategory.Birth:
						name = 'Birth of ' + name;
						break;
					case FantasyCalendarCategory.ClueFound:
						name = 'Clue ' + name + ' found';
						break;
					case FantasyCalendarCategory.Event:
						name = 'Event ' + name;
						break;
				}

				if (categoryName === FantasyCalendarCategory.CurrentDate){
					calendar.current = newFantasyCalendarDay.date;

				} else {
					event = {
						auto: false,
						id: 'ID_RPGM_' + Date.now().toString(),
						name: name,
						note: this._data.model.file.basename,
						category: categories[0].id,
						description: '',
						date: newFantasyCalendarDay.date,
					};

					calendar.events.push(event);
				}
			}

			this._data.values = this.api.service(DateService).getDate(
				newFantasyCalendarDay.date.year + '-' + newFantasyCalendarDay.date.month + '-' + newFantasyCalendarDay.date.day,
				FantasyCalendarCategory.Scene,
				this._data.model,
			);
		}

		await this.api.app.plugins.getPlugin('fantasy-calendar').saveCalendar()

		this.api.app.plugins.getPlugin('fantasy-calendar').api.getHelper(calendar).update(calendar);
		this._data.model.touch(true);
		this.api.app.workspace.trigger("rpgmanager:refresh-views");
	}
}
