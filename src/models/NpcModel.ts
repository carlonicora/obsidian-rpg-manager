import {AbstractModel} from "../abstracts/AbstractModel";
import {RpgViewFactory, viewType} from "../factories/RpgViewFactory";
import {CharacterData} from "../data/CharacterData";
import {DataType} from "../io/IoData";

export class NpcModel extends AbstractModel {
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
		this.writeList(
			this.io.getRelationshipList(
				DataType.Faction,
			),
			viewType.FactionList,
		);
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

	private async eventList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Event,
				DataType.Character,
			),
			viewType.EventList,
		);
	}

	private async clueList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Clue,
				DataType.Character,
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
		);
	}
}
