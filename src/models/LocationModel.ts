import {AbstractModel} from "../abstracts/AbstractModel";
import {viewType} from "../factories/RpgViewFactory";
import {DataType} from "../io/IoData";

export class LocationModel extends AbstractModel {
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
			viewType.CharacterList,
		);
	}

	private async eventList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Event,
				DataType.Location,
			),
			viewType.EventList,
		);
	}

	private async clueList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Clue,
				DataType.Location,
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
			viewType.LocationList,
			'Part of'
		);
	}
}
