import {AbstractModal} from "../../../abstracts/AbstractModal";

export class SessionModal extends AbstractModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
		this.initialiseAdventures();
		this.adventureBlock(contentEl);
		this.initialiseSessions();
	}
}
