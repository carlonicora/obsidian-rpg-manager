import {AbstractModel} from "../abstracts/AbstractModel";
import {viewType} from "../factories/RpgViewFactory";
import {DataType} from "../io/IoData";

export class ClueModel extends AbstractModel {
	public async render() {
		this.status();
		this.image(450);
		this.synopsis();

		this.characterList();
		this.locationList();
		this.eventList();
	}

	private status() {
		this.writeData(
			this.io.getClue(),
			viewType.ClueStatus,
		)
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
			this.io.getRelationshipList(DataType.Location),
			viewType.LocationList,
		);
	}

	private async eventList(
	) {
		this.writeList(
			this.io.getRelationshipList(DataType.Event, DataType.Clue),
			viewType.EventList,
		);
	}
}
