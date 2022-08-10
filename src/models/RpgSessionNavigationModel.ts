import {AbstractModel} from "../abstracts/AbstractModel";

export class RpgSessionNavigationModel extends AbstractModel {
	public async render() {
		this.renderer.sessionNavigator();
	}
}
