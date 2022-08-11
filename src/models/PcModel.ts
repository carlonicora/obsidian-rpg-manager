import {AbstractModel} from "../abstracts/AbstractModel";
import {viewType} from "../factories/RpgViewFactory";
import {DataType} from "../io/IoData";

export class PcModel extends AbstractModel {
	public async render() {
		this.image(300,300);
		this.factionList();
		this.characterList();
		this.locationList();
	}

	private async factionList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Faction,
			),
			viewType.FactionList,
		);
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
