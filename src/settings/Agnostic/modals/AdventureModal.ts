import {AbstractTemplateModal} from "../../../abstracts/AbstractTemplateModal";

export class AdventureModal extends AbstractTemplateModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
		this.initialiseAdventures();
	}
}
