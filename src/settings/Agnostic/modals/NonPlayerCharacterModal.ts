import {AbstractTemplateModal} from "../../../abstracts/AbstractTemplateModal";

export class NonPlayerCharacterModal extends AbstractTemplateModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}
