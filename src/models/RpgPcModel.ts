import {AbstractModel} from "../abstracts/AbstractModel";

export class RpgPcModel extends AbstractModel {
	public async render() {
		this.renderer.image(300, 300);
		this.renderer.affiliations();
		this.renderer.relationships();
		this.renderer.characterLocations();
	}
}
