import {AbstractModel} from "../abstracts/AbstractModel";
import {viewType} from "../factories/RpgViewFactory";

export class RpgCampaignModel extends AbstractModel {
	public async render() {
		this.adventureList();
		this.sessionList();
		this.characterList();
	}

	private async adventureList(
	) {
		this.writeData(
			this.io.getAdventureList(),
			viewType.AdventureList,
		);
	}

	private async sessionList(
	) {
		this.writeData(
			this.io.getSessionList(),
			viewType.SessionList
		);
	}

	private async characterList(
	) {
		this.writeData(
			this.io.getCharacterList(),
			viewType.CharacterList,
		);
	}
}
