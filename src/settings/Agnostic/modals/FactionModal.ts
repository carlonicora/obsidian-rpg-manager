import {AbstractModal} from "../../../abstracts/AbstractModal";

export class FactionModal extends AbstractModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}
