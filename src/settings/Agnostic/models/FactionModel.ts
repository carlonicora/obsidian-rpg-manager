import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";

export class FactionModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		return this.data;
	}

	/*
	public async render() {
		this.synopsis();
		this.image(200);
		this.characterList();
		this.locationList();
	}

	private async characterList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Character,
				DataType.Faction,
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

	 */
}
