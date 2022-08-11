import {AbstractModel} from "../abstracts/AbstractModel";
import {viewType} from "../factories/RpgViewFactory";

export class RpgAdventureModel extends AbstractModel {
	public async render() {

		this.sessionList(this.dv.current()?.ids.adventure)
	}

	private async sessionList(
		adventureId: number,
	) {
		this.writeData(
			this.io.getSessionList(adventureId),
			viewType.SessionList
		);
	}
}
