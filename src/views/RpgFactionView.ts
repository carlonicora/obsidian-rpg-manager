import {RpgAbstractView} from "../abstracts/RpgAbstractView";

export class RpgFactionView extends RpgAbstractView {
	public async render() {
		this.renderer.synopsis();
		this.renderer.image(200);
		this.renderer.factionCharacters();
		this.renderer.factionLocations();
	}
}
