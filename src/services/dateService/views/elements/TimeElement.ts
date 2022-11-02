import {AbstractElement} from "../../../../managers/viewsManager/abstracts/AbstractElement";
import {TimeElementDataInterface} from "./interfaces/TimeElementDataInterface";
import {CodeblockService} from "../../../codeblockService/CodeblockService";
import flatpickr from "flatpickr";

export class TimeElement extends AbstractElement {
	render(
		data: TimeElementDataInterface,
		containerEl: HTMLElement,
	) {
		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});
		this.createTitle(data.model, data.title, infoEl);

		const options:any = {
			allowInput: true,
			enableTime: true,
			noCalendar: true,
			minuteIncrement: 15,
			time_24hr: true,
			onChange: (selectedDate: Date, dateStr: string , instance: flatpickr.Instance) => {
				const [hours, minutes] = dateStr.split(':');
				const duration = +hours * 60 + +minutes;

				if (data.editableKey !== undefined)
					this.api.service(CodeblockService).addOrUpdate(
						data.editableKey,
						duration,
					);
			}
		};

		if (data.values !== undefined) {
			const hours = Math.floor(data.values/60);
			const minutes = (data.values % 60);
			options.defaultDate = hours.toString() + ':' + (minutes < 10 ? '0' : '') + minutes.toString();
		}

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});

		const flatpickrEl = contentEl.createEl('input', {cls: 'flatpickr', type: 'text'});
		flatpickrEl.readOnly = true;

		flatpickr(flatpickrEl, options);
	}
}
