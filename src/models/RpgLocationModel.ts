import {AbstractModel} from "../abstracts/AbstractModel";

export class RpgLocationModel extends AbstractModel {
	public async render() {
		this.renderer.synopsis(this.dv.current()?.address ? this.dv.current()?.address : null);
		this.renderer.image(450);
		this.renderer.locationEvents();
		this.renderer.locationClues();
		this.renderer.locationCharacters();
	}
}
