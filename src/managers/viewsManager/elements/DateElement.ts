import {AbstractElement} from "../abstracts/AbstractElement";
import {DateElementDataInterface} from "./interfaces/DateElementDataInterface";
import flatpickr from "flatpickr";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";

export class DateElement extends AbstractElement {
	render(
		data: DateElementDataInterface,
		containerEl: HTMLElement,
	) {
		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});
		this.createTitle(data.title, infoEl);

		const options:any = {
			allowInput: true,
			dateFormat: "Y-m-d",
			altInput: true,
			onChange: (selectedDate: any, dateStr: any , instance: any) => {
				if (data.editableKey !== undefined)
					this.api.service(CodeblockService).addOrUpdate(
						data.editableKey,
						dateStr,
					);

			}
		};

		if (data.values !== undefined)
			options.defaultDate = data.values.date;

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});

		const flatpickrEl = contentEl.createEl('input', {cls: 'flatpickr', type: 'text'});
		flatpickrEl.readOnly = true;

		flatpickr(flatpickrEl, options);
	}
}
