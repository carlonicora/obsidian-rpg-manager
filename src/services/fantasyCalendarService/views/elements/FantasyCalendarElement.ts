import {AbstractElement} from "../../../../managers/viewsManager/abstracts/AbstractElement";
import {DateElementDataInterface} from "../../../dateService/views/elements/interfaces/DateElementDataInterface";
import {
	FantasyCalendarDateInterface
} from "../../interfaces/FantasyCalendarDateInterface";
import {FantasyCalendarService} from "../../FantasyCalendarService";
import {Event, EventCategory} from "obsidian-fantasy-calendar";
import {FantasyCalendarCategory} from "../../enums/FantasyCalendarCategory";

export class FantasyCalendarElement extends AbstractElement {
	private _event: any;

	render(
		data: DateElementDataInterface,
		containerEl: HTMLElement,
	) {
		const calendar = data.model.campaign.fantasyCalendar;
		if (calendar === undefined)
			return;

		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});
		this.createTitle(data.model, data.title, infoEl);

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});

		let dateValue = '';
		if (data.values !== undefined && data.values.date !== undefined) {
			const fantasyCalendarDate:FantasyCalendarDateInterface = data.values.date as FantasyCalendarDateInterface;
			dateValue = fantasyCalendarDate.year.toString() +
				'-' +
				(fantasyCalendarDate.month + 1).toString() +
				'-' +
				fantasyCalendarDate.day.toString();
		}

		const inputEl = contentEl.createEl('input');
		inputEl.type = 'text';
		inputEl.value = dateValue;

		inputEl.addEventListener('focusout', () => {
			this._saveDate(data, inputEl.value);
		});
	}

	private async _saveDate(
		data: DateElementDataInterface,
		newDate: string,
	): Promise<void> {
		if (data.values?.category === undefined && data.category === undefined)
			return;

		const categoryName = data.values?.category ?? data.category;
		if (categoryName === undefined)
			return;

		const calendar = data.model.campaign.fantasyCalendar;
		if (calendar === undefined)
			return;

		let categories: EventCategory[] = calendar.categories.filter(
			(category: EventCategory) => category.name === categoryName
		);

		if (categories.length === 0)
			categories = [await this.api.service(FantasyCalendarService).addCategory(categoryName, calendar)];

		const events: Event[] = calendar.events.filter((event: Event) =>
			event.note === data.model.file.path &&
			event.category === categories[0].id
		);

		if (newDate === '' && events.length > 0){
			for (let index=0; index<calendar.events.length; index++){
				if (calendar.events[index].note === data.model.file.path && calendar.events[index].category === categories[0].id){
					calendar.events.splice(index, 1);
					break;
				}
			}
		} else {
			const [inputYear, inputMonth, inputDay] = newDate.split('-');
			if (
				inputYear == undefined ||
				inputMonth == undefined ||
				inputDay == undefined ||
				!Number.isInteger(+inputYear) ||
				!Number.isInteger(+inputMonth) ||
				!Number.isInteger(+inputDay)
			)
				return;

			if (calendar.static.months.length < +inputMonth)
				return;

			if (calendar.static.months[+inputMonth - 1].length < +inputDay)
				return;

			let event: Event | undefined = undefined;

			if (events.length === 1) {
				event = events[0];

				event.date = {
					month: +inputMonth - 1,
					day: +inputDay,
					year: +inputYear,
				};
			} else {
				let name = data.model.file.basename;

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

				event = {
					auto: false,
					id: 'ID_RPGM_' + Date.now().toString(),
					name: name,
					note: data.model.file.path,
					category: categories[0].id,
					description: '',
					date: {
						month: +inputMonth - 1,
						day: +inputDay,
						year: +inputYear,
					},
				};

				calendar.events.push(event);
			}
		}

		this.api.app.plugins.getPlugin('fantasy-calendar').saveCalendar();
		data.model.touch(true);
		this.api.app.workspace.trigger("rpgmanager:refresh-views");
		this.api.app.workspace.trigger("fantasy-calendars-updated");
	}
}
