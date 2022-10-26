import {Modal} from "obsidian";

export class AbstractModal extends Modal {
	protected maxWidth = false;
	protected title: string;
	protected rpgmContainerEl: HTMLDivElement;

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpgm-modal');

		if (this.maxWidth) this.modalEl.style.width = 'var(--modal-max-width)';

		const mainContainer: HTMLDivElement = contentEl.createDiv({cls: 'rpgm-modal-container'});
		mainContainer.createEl('h2', {text: this.title ?? 'RPG Manager'});
		this.rpgmContainerEl = mainContainer.createDiv({cls: 'rpgm-modal-main-container'});
	}
}
