import {AbstractModalPart} from "../../../api/modalsManager/abstracts/AbstractModalPart";

export class LocationModalPart extends AbstractModalPart {
	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		contentEl.createDiv({cls: 'locationContainer'});
		this.modal.saver = this;
		this.modal.enableButton();
	}

	public async loadChild(
		containerEl: HTMLElement,
	): Promise<void> {

	}

	public validate(
	): boolean {
		return true;
	}

	protected async addAdditionalElements(
	): Promise<void> {
		//this.modal.additionalInformationEl
	}
}
