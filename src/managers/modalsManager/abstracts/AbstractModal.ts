import {Modal} from "obsidian";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export class AbstractModal extends Modal {
	protected maxWidth = false;
	protected title: string;
	protected rpgmContainerEl: HTMLDivElement;

	constructor(
		protected api: RpgManagerApiInterface,
	) {
		super(api.app);
	}

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
