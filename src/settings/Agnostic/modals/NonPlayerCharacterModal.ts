import {AbstractModal} from "../../../abstracts/AbstractModal";

export class NonPlayerCharacterModal extends AbstractModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}
