import {AbstractModal} from "../../../abstracts/AbstractModal";

export class EventModal extends AbstractModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}
