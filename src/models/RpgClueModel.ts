import {AbstractModel} from "../abstracts/AbstractModel";
import {RpgViewFactory, viewType} from "../factories/RpgViewFactory";
import {ClueData} from "../data/ClueData";
import {CharacterData, CharacterList} from "../data/CharacterData";
import {LocationData, LocationList} from "../data/LocationData";
import {EventData, EventList} from "../data/EventData";

export class RpgClueModel extends AbstractModel {
	public async render() {
		this.status();
		this.image(450);
		this.synopsis();

		this.characterList();
		this.locationList();
		this.eventList();
	}

	private status() {
		const current = this.dv.current();
		if (current !== undefined) {
			const data = new ClueData(
				this.functions,
				current,
			)

			const view = RpgViewFactory.createSingle(viewType.ClueStatus, this.dv);
			view.render(data);
		}
	}

	private async characterList(
	) {
		const data = new CharacterList(this.campaign);

		const current = this.dv.current();
		if (
			current !== undefined &&
			current.relationships?.characters != null
		) {
			const characters = this.dv.pages("#character")
				.where(page =>
					page.file.folder !== "Templates" &&
					current.relationships?.characters[page.file.name] !== undefined
				);

			characters.forEach((character) => {
				data.add(
					new CharacterData(
						this.functions,
						character,
						this.campaign,
						current.relationships?.characters[character.file.name],
					)
				)
			});

			this.writeData(data, viewType.CharacterList);
		}
	}

	private async locationList(
	) {
		const data = new LocationList(this.campaign);

		const current = this.dv.current();
		if (
			current !== undefined &&
			current.relationships?.locations !== undefined &&
			current.relationships?.locations !== null
		) {
			const locations = this.dv.pages("#location")
				.where(location =>
					location.file.folder !== "Templates" &&
					current.relationships?.locations[location.file.name] !== undefined
				);

			locations.forEach((location) => {
				data.add(
					new LocationData(
						this.functions,
						location,
						current.relationships?.locations[location.file.name],
					)
				)
			});

			this.writeData(data, viewType.LocationList);
		}
	}

	private async eventList(
	) {
		const data = new EventList(this.campaign);

		const current = this.dv.current();
		if (current !== undefined) {
			const events = this.dv.pages('#event')
				.where(event =>
					event.file.folder !== "Templates" &&
					event.relationships?.clues != null &&
					event.relationships?.clues[current.file.name] !== undefined
				);

			events.forEach((event) => {
				data.add(
					new EventData(
						this.functions,
						event,
						this.campaign,
						event.relationships?.clues[current.file.name],
					)
				)
			});

			this.writeData(data, viewType.EventList);
		}
	}
}
