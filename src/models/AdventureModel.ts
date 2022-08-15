import {AbstractModel} from "../abstracts/AbstractModel";
import {viewType} from "../factories/RpgViewFactory";
import {AdventureData} from "../data";

export class AdventureModel extends AbstractModel {
	public async render() {
		const adventure = new AdventureData(this.api, this.current);

		this.sessionList(adventure.id)
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
