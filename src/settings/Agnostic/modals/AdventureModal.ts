import {AbstractModal} from "../../../abstracts/AbstractModal";

export class AdventureModal extends AbstractModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
		this.initialiseAdventures();
	}
}
