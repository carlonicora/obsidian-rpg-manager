import {AbstractTemplateModal} from "../../abstracts/AbstractTemplateModal";

export class FactionModal extends AbstractTemplateModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}
