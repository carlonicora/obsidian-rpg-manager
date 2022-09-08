import {AbstractModalComponent} from "../../../abstracts/AbstractModalComponent";

export class ClueModal extends AbstractModalComponent {
	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const clueEl = contentEl.createDiv({cls: 'clueContainer'});

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
}
