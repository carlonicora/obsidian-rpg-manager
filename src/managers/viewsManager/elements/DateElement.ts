import {AbstractElement} from "../abstracts/AbstractElement";
import {ElementDataInterface} from "../interfaces/ElementDataInterface";
import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";
import {DateElementInterface} from "./interfaces/DateElementInterface";
import {Component, MarkdownRenderer} from "obsidian";
import flatpickr from "flatpickr";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";

export class DateElement extends AbstractElement {
	render(
		data: DateElementInterface,
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
		//flatpickrEl.placeholder = data.additionalInformation.placeholder;
		flatpickrEl.readOnly = true;

		flatpickr(flatpickrEl, options);
	}
}
