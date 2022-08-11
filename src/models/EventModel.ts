import {AbstractModel} from "../abstracts/AbstractModel";
import {viewType} from "../factories/RpgViewFactory";
import {DataType} from "../io/IoData";

export class EventModel extends AbstractModel {
	public async render() {
		this.image(450);
		this.synopsis();
		this.characterList();
		this.clueList();
		this.locationList();
	}

	private async characterList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Character,
			),
			viewType.CharacterList,
		);
	}

	private async clueList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Clue,
			),
			viewType.ClueList,
		);
	}

	private async locationList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Location,
			),
			viewType.LocationList,
		);
	}
}
