import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";

export class ClueModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		return this.data;
	}

	/*
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
			ViewType.ClueStatus,
		)
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
			this.io.getRelationshipList(DataType.Location),
			ViewType.LocationList,
		);
	}

	private async eventList(
	) {
		this.writeList(
			this.io.getRelationshipList(DataType.Event, DataType.Clue),
			ViewType.EventList,
		);
	}
	*/
}
