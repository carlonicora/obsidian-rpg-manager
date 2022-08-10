import {AbstractModel} from "../abstracts/AbstractModel";

export class RpgFactionModel extends AbstractModel {
	public async render() {
		this.renderer.synopsis();
		this.renderer.image(200);
		this.renderer.factionCharacters();
		this.renderer.factionLocations();
	}
}
