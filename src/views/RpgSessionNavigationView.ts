import {RpgAbstractView} from "../abstracts/RpgAbstractView";

export class RpgSessionNavigationView extends RpgAbstractView {
	public async render() {
		this.renderer.sessionNavigator();
	}
}
