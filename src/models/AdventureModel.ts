import {AbstractModel} from "../abstracts/AbstractModel";
import {viewType} from "../factories/RpgViewFactory";

export class AdventureModel extends AbstractModel {
	public async render() {

		this.sessionList(this.dv.current()?.ids.adventure)

	}

	private async sessionList(
		adventureId: number,
	) {
		this.writeList(
			this.io.getSessionList(adventureId),
			viewType.SessionList
		);
	}
}
