import {AbstractModel} from "../abstracts/AbstractModel";
import {CharacterData, CharacterList} from "../data/CharacterData";
import {viewType} from "../factories/RpgViewFactory";
import {EventData, EventList} from "../data/EventData";
import {ClueList} from "../data/ClueData";

export class RpgLocationModel extends AbstractModel {
	public async render() {
		this.synopsis(this.dv.current()?.address ? this.dv.current()?.address : null);
		this.image(450);
		this.characterList();
		this.eventList();
		this.clueList();
	}

	private async characterList(
	) {
		const data = new CharacterList(this.campaign);

		const current = this.dv.current();
		if (current !== undefined) {
			const characters = this.dv.pages("#character")
				.where(page =>
					page.file.folder !== "Templates" &&
					page.relationships?.locations != undefined &&
					page.relationships?.locations[current.file.name] !== undefined
				);

			characters.forEach((character) => {
				data.add(
					new CharacterData(
						this.functions,
						character,
						this.campaign,
						character.relationships?.locations[current.file.name],
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
					event.relationships?.locations != null &&
					event.relationships?.locations[current.file.name] !== undefined
				);

			events.forEach((event) => {
				data.add(
					new EventData(
						this.functions,
						event,
						this.campaign,
						event.relationships?.locations[current.file.name],
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
			const clues = this.dv.pages('#clue')
				.where(clue =>
					clue.file.folder !== "Templates" &&
					clue.relationships?.locations != null &&
					clue.relationships?.locations[current.file.name] !== undefined
				);

			clues.forEach((clue) => {
				data.add(
					new EventData(
						this.functions,
						clue,
						this.campaign,
						clue.relationships?.locations[current.file.name],
					)
				)
			});

			this.writeData(data, viewType.ClueList);
		}
	}
}
