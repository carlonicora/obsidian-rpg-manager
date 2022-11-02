import {AbstractElement} from "../abstracts/AbstractElement";
import {CheckboxElementDataInterface} from "./interfaces/CheckboxElementDataInterface";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";

export class CheckboxElement extends AbstractElement {
	render(
		data: CheckboxElementDataInterface,
		containerEl: HTMLElement,
	) {
		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});
		this.createTitle(data.model, data.title, infoEl);

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});

		const checkboxEl = contentEl.createEl("input");
		checkboxEl.type = 'checkbox';
		checkboxEl.checked = data.values;

		checkboxEl.addEventListener('change', () => {
			if (data.editableKey)
				this.api.service(CodeblockService).addOrUpdate(
					data.editableKey,
					checkboxEl.checked,
				);
		});
	}
}
