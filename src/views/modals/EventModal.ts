import {AbstractTemplateModal} from "../../abstracts/AbstractTemplateModal";

export class EventModal extends AbstractTemplateModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}
