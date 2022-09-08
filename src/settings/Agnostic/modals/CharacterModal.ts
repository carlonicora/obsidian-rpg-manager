import {AbstractModalComponent} from "../../../abstracts/AbstractModalComponent";
import {App} from "obsidian";
import {ModalInterface} from "../../../interfaces/ModalInterface";

export class CharacterModal extends AbstractModalComponent {
	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const characterEl = contentEl.createDiv({cls: 'characterContainer'});

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
