import {AbstractTextElement} from "../../../../managers/viewsManager/elements/abstracts/AbstractTextElement";
import {PronounElementInterface} from "./interfaces/PronounElementInterface";
import {Pronoun} from "../../../../services/pronounService/enums/Pronoun";
import {CharacterInterface} from "../../interfaces/CharacterInterface";
import {CodeblockService} from "../../../../services/codeblockService/CodeblockService";
import {PronounService} from "../../../../services/pronounService/PronounService";

export class PronounElement extends AbstractTextElement {
	public render(
		data: PronounElementInterface,
		containerEl: HTMLElement,
	): void {
		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});
		this.createTitle(data.model, data.title, infoEl);

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});
		const pronounSelectorEl = contentEl.createEl("select");
		pronounSelectorEl.createEl("option", {
			text: "",
			value: ""
		}).selected = true;

		Object.keys(Pronoun).filter((v) => isNaN(Number(v))).forEach((type, index) => {
			const pronoun: Pronoun = this.api.service(PronounService).createPronoun(type);

			const optionEl: HTMLOptionElement = pronounSelectorEl.createEl('option', {
				text: this.api.service(PronounService).readPronoun(pronoun),
				value: type,
			});

			if ((<CharacterInterface>data.model).pronoun !== undefined && pronoun === (<CharacterInterface>data.model).pronoun) {
				optionEl.selected = true;
			}
		});

		pronounSelectorEl.addEventListener('change', () => {
			if (data.editableKey === undefined)
				return;

			if (pronounSelectorEl.value !== '')
				this.api.service(CodeblockService).addOrUpdate(data.editableKey, pronounSelectorEl.value);
			else
				this.api.service(CodeblockService).addOrUpdate(data.editableKey, undefined);

		});
	}
}
