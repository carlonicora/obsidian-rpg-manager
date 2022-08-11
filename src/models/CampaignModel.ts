import {AbstractModel} from "../abstracts/AbstractModel";
import {viewType} from "../factories/RpgViewFactory";

export class CampaignModel extends AbstractModel {
	public async render() {

		this.adventureList();
		this.sessionList();
		this.characterList();

	}

	private async adventureList(
	) {
		this.writeList(
			this.io.getAdventureList(),
			viewType.AdventureList,
		);
	}

	private async sessionList(
	) {
		this.writeList(
			this.io.getSessionList(),
			viewType.SessionList
		);
	}

	private async characterList(
	) {
		this.writeList(
			this.io.getCharacterList(),
			viewType.CharacterList,
		);
	}
}
