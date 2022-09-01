import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";

export class EventModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		return this.data;
	}

	/*
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
			ViewType.CharacterList,
		);
	}

	private async clueList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Clue,
			),
			ViewType.ClueList,
		);
	}

	private async locationList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Location,
			),
			ViewType.LocationList,
		);
	}

	 */
}
