import {RpgAbstractView} from "../abstracts/RpgAbstractView";

export class RpgNpcView extends RpgAbstractView {
	public async render() {
		this.renderer.synopsis();
		this.renderer.image(300, 300);
		this.renderer.nonPlayerCharacterInfo();
		this.renderer.affiliations();
		this.renderer.relationships();
		this.renderer.characterEvents();
		this.renderer.cluesKnowledge();
		this.renderer.characterLocations();
	}
}
