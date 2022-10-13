import {AbstractModalPart} from "../../../../modals/abstracts/AbstractModalPart";

export class MusicModalPart extends AbstractModalPart {
	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		contentEl.createDiv({cls: 'musicContainer'});

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
