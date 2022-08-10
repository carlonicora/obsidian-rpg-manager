import {AbstractModel} from "../abstracts/AbstractModel";

export class RpgEventModel extends AbstractModel {
	public async render() {
		this.renderer.synopsis();
		this.renderer.image(450);
		this.renderer.eventCharacters();
		this.renderer.eventClues();
		this.renderer.eventLocations();
	}
}
