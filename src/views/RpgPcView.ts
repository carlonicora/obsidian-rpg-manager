import {RpgAbstractView} from "../abstracts/RpgAbstractView";

export class RpgPcView extends RpgAbstractView {
	public async render() {
		this.renderer.image(300, 300);
		this.renderer.affiliations();
		this.renderer.relationships();
		this.renderer.characterLocations();
	}
}
