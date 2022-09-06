import {AbstractModal} from "../../../abstracts/AbstractModal";

export class LocationModal extends AbstractModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}
