import {AbstractTemplateModal} from "../../../abstracts/AbstractTemplateModal";

export class CharacterModal extends AbstractTemplateModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}
