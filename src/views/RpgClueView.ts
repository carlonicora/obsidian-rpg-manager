import {RpgAbstractView} from "../abstracts/RpgAbstractView";

export class RpgClueView extends RpgAbstractView {
	public async render() {
		this.renderer.clueStatus();
		this.renderer.image(450);
		this.renderer.synopsis();
		this.renderer.knowledgeOfClue();
		this.renderer.clueEvents();
		this.renderer.clueLocations();
	}
}
