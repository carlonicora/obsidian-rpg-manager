import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";

export class SceneModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		return this.data;
	}

	/*
	public async render() {
		this.characterList();
		this.locationList();
		this.clueList();
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

	private async locationList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Location,
			),
			ViewType.LocationList,
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

	 */
}
