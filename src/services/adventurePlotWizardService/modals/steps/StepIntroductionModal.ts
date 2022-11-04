import {WizardPartInterface} from "../../../../managers/modalsManager/interfaces/WizardPartInterface";
import {AbstractStepModal} from "../../abstracts/AbstractStepModal";

export class StepIntroductionModal extends AbstractStepModal implements WizardPartInterface {
	public async render(
		containerEl: HTMLDivElement,
	): Promise<void> {
	}

	public async save(
	): Promise<void> {
	}
}
