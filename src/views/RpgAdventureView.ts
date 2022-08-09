import {RpgAbstractView} from "../abstracts/RpgAbstractView";

export class RpgAdventureView extends RpgAbstractView {
	public async render() {
		this.renderer.sessionList(this.dv.current()?.ids.adventure);
	}
}
