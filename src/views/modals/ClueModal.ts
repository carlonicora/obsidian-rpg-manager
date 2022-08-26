import {AbstractTemplateModal} from "../../abstracts/AbstractTemplateModal";

export class ClueModal extends AbstractTemplateModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}
