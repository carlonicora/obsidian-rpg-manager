import {AbstractElement} from "../abstracts/AbstractElement";
import {DateElementInterface} from "./interfaces/DateElementInterface";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";
import {
	FantasyCalendarDateInterface
} from "../../../services/fantasyCalendarService/interfaces/FantasyCalendarDateInterface";

export class FantasyCalendarElement extends AbstractElement {
	render(
		data: DateElementInterface,
		containerEl: HTMLElement,
	) {
		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});
		this.createTitle(data.title, infoEl);

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});

		let dateValue = '';
		if (data.values !== undefined && data.values.date !== undefined) {
			const fantasyCalendarDate:FantasyCalendarDateInterface = data.values.date as FantasyCalendarDateInterface;
			dateValue = fantasyCalendarDate.year.toString() +
				'-' +
				fantasyCalendarDate.month +
				'-' +
				fantasyCalendarDate.day;
		}

		const inputEl = contentEl.createEl('input');
		inputEl.type = 'text';
		inputEl.value = dateValue;
		//TODO onKey up validate date and save it in the Frontmatter
	}
}
