import {AbstractModal} from "../../../abstracts/AbstractModal";

export class ClueModal extends AbstractModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}
