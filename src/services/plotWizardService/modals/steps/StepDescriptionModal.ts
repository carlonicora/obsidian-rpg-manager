import {AbstractStepModal} from "../../abstracts/AbstractStepModal";
import {WizardPartInterface} from "../../../../managers/modalsManager/interfaces/WizardPartInterface";

export class StepDescriptionModal extends AbstractStepModal implements WizardPartInterface {
	public async render(
		containerEl: HTMLDivElement,
	): Promise<void> {
		super.getContainer(containerEl, false);
	}

	public async save(
	): Promise<void> {
		this.information = {
			description: this.descriptionEl.value,
		};
	}
}
