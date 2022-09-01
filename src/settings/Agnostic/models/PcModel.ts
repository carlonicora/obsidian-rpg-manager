import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";

export class PcModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		return this.data;
	}

	/*
	public async render() {
		this.synopsis();
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
			ViewType.FactionList,
		);
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

	 */
}
