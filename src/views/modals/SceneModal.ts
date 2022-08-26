import {AbstractTemplateModal} from "../../abstracts/AbstractTemplateModal";

export class SceneModal extends AbstractTemplateModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
		this.initialiseAdventures();
		this.adventureBlock(contentEl);
		this.initialiseSessions();
		this.sessionBlock(contentEl);
		this.initialiseScenes();
	}
}
