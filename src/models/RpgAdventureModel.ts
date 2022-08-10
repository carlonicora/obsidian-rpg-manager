import {AbstractModel} from "../abstracts/AbstractModel";

export class RpgAdventureModel extends AbstractModel {
	public async render() {
		this.renderer.sessionList(this.dv.current()?.ids.adventure);
	}
}
