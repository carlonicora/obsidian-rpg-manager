import {AbstractStepModal} from "../../abstracts/AbstractStepModal";
import {WizardPartInterface} from "../../../../managers/modalsManager/interfaces/WizardPartInterface";

export class StepDescriptionModal extends AbstractStepModal implements WizardPartInterface {
	public async render(
		containerEl: HTMLDivElement,
	): Promise<void> {
		const dataContainerEl: HTMLDivElement = super.getContainer(containerEl);

		const descriptionContainerEl = dataContainerEl.createDiv({cls: 'rpg-manager-wizard-main-content-container-text'});
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
