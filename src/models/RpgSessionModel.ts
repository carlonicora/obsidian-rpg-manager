import {AbstractModel} from "../abstracts/AbstractModel";

export class RpgSessionModel extends AbstractModel {
	public async render() {
		this.renderer.sceneList(this.dv.current()?.ids.session);
	}
}
