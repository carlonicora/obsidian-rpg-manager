import {AbstractStepModal} from "../../abstracts/AbstractStepModal";
import {WizardPartInterface} from "../../../../managers/modalsManager/interfaces/WizardPartInterface";

export class StepDescriptionAndCluesModal extends AbstractStepModal implements WizardPartInterface {
	public async render(
		containerEl: HTMLDivElement,
	): Promise<void> {
		containerEl.createDiv({cls: 'rpg-manager-wizard-main-content-title', text: this.description});
		const descriptionContainerEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-content-container'});
		this.descriptionEl = descriptionContainerEl.createEl('textarea', {
			cls: 'rpg-manager-wizard-main-content-container',
			text: this.information?.description ?? ''
		});
	}

	public async save(
	): Promise<void> {
		this.information = {
			description: this.descriptionEl.value,
		};
	}
}

