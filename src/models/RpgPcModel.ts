import {AbstractModel} from "../abstracts/AbstractModel";
import {FactionData, FactionList} from "../data/FactionData";
import {viewType} from "../factories/RpgViewFactory";
import {CharacterData, CharacterList} from "../data/CharacterData";
import {LocationData, LocationList} from "../data/LocationData";

export class RpgPcModel extends AbstractModel {
	public async render() {
		this.image(300,300);
		this.factionList();
		this.characterList();
		this.locationList();
	}

	private async factionList(
	) {
		const data = new FactionList(this.campaign);

		const current = this.dv.current();
		if (current !== undefined) {
			const factions = this.dv.pages('#faction')
				.where(faction =>
					faction.file.folder !== "Templates" &&
					current.relationships?.factions != null &&
					current.relationships?.factions[faction.file.name] !== undefined
				);

			factions.forEach((faction) => {
				data.add(
					new FactionData(
						this.functions,
						faction,
						this.campaign,
						current.relationships?.factions[faction.file.name],
					)
				)
			});

			this.writeData(data, viewType.FactionList);
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
			current.relationships?.locations != null
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
}
