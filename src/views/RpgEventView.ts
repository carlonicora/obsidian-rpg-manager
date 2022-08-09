import {RpgAbstractView} from "../abstracts/RpgAbstractView";

export class RpgEventView extends RpgAbstractView {
	public async render() {
		this.renderer.synopsis();
		this.renderer.image(450);
		this.renderer.eventCharacters();
		this.renderer.eventClues();
		this.renderer.eventLocations();
	}
}
