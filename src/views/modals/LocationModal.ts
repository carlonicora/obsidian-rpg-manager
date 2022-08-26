import {AbstractTemplateModal} from "../../abstracts/AbstractTemplateModal";

export class LocationModal extends AbstractTemplateModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}
