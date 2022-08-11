import {AbstractModel} from "../abstracts/AbstractModel";
import {CharacterData, CharacterList} from "../data/CharacterData";
import {viewType} from "../factories/RpgViewFactory";
import {LocationData, LocationList} from "../data/LocationData";

export class RpgFactionModel extends AbstractModel {
	public async render() {
		this.synopsis();
		this.image(200);
		this.characterList();
		this.locationList();
	}

	private async characterList(
	) {
		const data = new CharacterList(this.campaign);

		const current = this.dv.current();
		if (current !== undefined) {
			const characters = this.dv.pages("#character")
				.where(page =>
					page.file.folder !== "Templates" &&
					page.relationships?.factions != undefined &&
					page.relationships?.factions[current.file.name] !== undefined
				);

			characters.forEach((character) => {
				data.add(
					new CharacterData(
						this.functions,
						character,
						this.campaign,
						character.relationships?.factions[current.file.name],
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
			current.relationships?.locations != null
		) {
			const locations = this.dv.pages("#location")
				.where(page =>
					page.file.folder !== "Templates" &&
					current.relationships?.locations[page.file.name] !== undefined
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
}
