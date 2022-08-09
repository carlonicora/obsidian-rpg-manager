import {RpgAbstractView} from "../abstracts/RpgAbstractView";

export class RpgSessionView extends RpgAbstractView {
	public async render() {
		this.renderer.sceneList(this.dv.current()?.ids.session);
	}
}
