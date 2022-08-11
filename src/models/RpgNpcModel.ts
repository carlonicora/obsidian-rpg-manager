import {AbstractModel} from "../abstracts/AbstractModel";
import {RpgViewFactory, viewType} from "../factories/RpgViewFactory";
import {CharacterData, CharacterList} from "../data/CharacterData";
import {ClueData, ClueList} from "../data/ClueData";
import {EventData, EventList} from "../data/EventData";
import {FactionData, FactionList} from "../data/FactionData";
import {LocationData, LocationList} from "../data/LocationData";

export class RpgNpcModel extends AbstractModel {
	public async render() {
		this.synopsis();
		this.image(300,300);
		this.info();
		this.factionList();
		this.characterList();
		this.eventList();
		this.clueList();
		this.locationList();

		/*
		this.renderer.characterLocations();
		*/
	}

	async info(){
		const current = this.dv.current();
		if (current !== undefined) {

			const data = new CharacterData(
				this.functions,
				current,
				this.campaign,
			)

			const view = RpgViewFactory.createSingle(viewType.CharacterInfo, this.dv);
			view.render(data);
		}
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

	private async eventList(
	) {
		const data = new EventList(this.campaign);

		const current = this.dv.current();
		if (current !== undefined) {
			const events = this.dv.pages('#event')
				.where(event =>
					event.file.folder !== "Templates" &&
					event.relationships?.characters != null &&
					event.relationships?.characters[current.file.name] !== undefined
				);

			events.forEach((event) => {
				data.add(
					new EventData(
						this.functions,
						event,
						this.campaign,
						event.relationships?.characters[current.file.name],
					)
				)
			});

			this.writeData(data, viewType.EventList);
		}
	}

	private async clueList(
	) {
		const data = new ClueList(this.campaign);

		const current = this.dv.current();
		if (current !== undefined) {
			const clues = this.dv.pages("#clue")
				.where(page =>
					page.file.folder !== "Templates" &&
					page.relationships?.characters != undefined &&
					page.relationships?.characters[current.file.name] !== undefined
				);

			clues.forEach((clue) => {
				data.add(
					new ClueData(
						this.functions,
						clue,
						clue.relationships?.characters[current.file.name],
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
