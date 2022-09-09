import {AbstractModalComponent} from "../../../abstracts/AbstractModalComponent";

export class NoteModal extends AbstractModalComponent {
	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		contentEl.createDiv({cls: 'noteContainer'});

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
