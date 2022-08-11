import {AbstractModel} from "../abstracts/AbstractModel";
import {viewType} from "../factories/RpgViewFactory";
import {DataType} from "../io/IoData";

export class FactionModel extends AbstractModel {
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
			viewType.CharacterList,
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
