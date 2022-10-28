import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {ElementInterface} from "../interfaces/ElementInterface";
import {ElementDataInterface} from "../interfaces/ElementDataInterface";
import {setIcon} from "obsidian";

export abstract class AbstractElement implements ElementInterface{
	constructor(
		protected api: RpgManagerApiInterface,
	) {
	}

	abstract render(
		data: ElementDataInterface,
		containerEl: HTMLElement,
	): void;

	protected createTitle(
		title: string,
		containerEl: HTMLElement,
		editableField?: string,
	): void {
		let titleClass = 'rpg-manager-header-container-info-data-container-title';

		if (editableField !== undefined) {
			containerEl.addClass('rpg-manager-header-container-info-data-container-editable')
			const editEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-edit'});
			setIcon(editEl, 'edit');

			titleClass = 'rpg-manager-header-container-info-data-container-title-editable';
		}

		containerEl.createDiv({cls: titleClass +' clearfix', text: title});
	}
}
