import {AbstractModel} from "../abstracts/AbstractModel";

export class RpgClueModel extends AbstractModel {
	public async render() {
		this.renderer.clueStatus();
		this.renderer.image(450);
		this.renderer.synopsis();
		this.renderer.knowledgeOfClue();
		this.renderer.clueEvents();
		this.renderer.clueLocations();
	}
}
