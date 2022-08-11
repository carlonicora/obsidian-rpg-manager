import {AbstractModel} from "../abstracts/AbstractModel";
import {CharacterData, CharacterList} from "../data/CharacterData";
import {viewType} from "../factories/RpgViewFactory";
import {ClueData, ClueList} from "../data/ClueData";
import {LocationData, LocationList} from "../data/LocationData";

export class RpgEventModel extends AbstractModel {
	public async render() {
		this.image(450);
		this.synopsis();
		this.characterList();
		this.clueList();
		this.locationList();
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

	private async clueList(
	) {
		const data = new ClueList(this.campaign);

		const current = this.dv.current();
		if (
			current !== undefined &&
			current.relationships?.clues != null
		) {
			const clues = this.dv.pages("#clue")
				.where(page =>
					page.file.folder !== "Templates" &&
					current.relationships?.clues[page.file.name] !== undefined
				);

			clues.forEach((clue) => {
				data.add(
					new ClueData(
						this.functions,
						clue,
						current.relationships?.clues[clue.file.name],
					)
				)
			});

			this.writeData(data, viewType.ClueList);
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
