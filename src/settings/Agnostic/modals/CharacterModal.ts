import {AbstractModal} from "../../../abstracts/AbstractModal";

export class CharacterModal extends AbstractModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}
