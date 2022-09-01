import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";

export class LocationModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		return this.data;
	}

	/*
	public async render() {
		this.synopsis(this.dv.current()?.address ? this.dv.current()?.address : null);
		this.image(450);
		this.characterList();
		this.eventList();
		this.clueList();
		this.locationList();
		this.parentLocationList();
	}

	private async characterList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Character,
				DataType.Location,
			),
			ViewType.CharacterList,
		);
	}

	private async eventList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Event,
				DataType.Location,
			),
			ViewType.EventList,
		);
	}

	private async clueList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Clue,
				DataType.Location,
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
			'Sub-locations'
		);
	}

	private async parentLocationList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Location,
				DataType.Location,
			),
			ViewType.LocationList,
			'Part of'
		);
	}

	 */
}
