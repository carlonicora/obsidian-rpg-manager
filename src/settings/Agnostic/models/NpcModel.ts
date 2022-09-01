import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";

export class NpcModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		return this.data;
	}

	/*
	public async render() {
		this.synopsis();
		this.image(300,300);
		this.info();
		this.factionList();
		this.characterList();
		this.eventList();
		this.clueList();
		this.locationList();
	}

	async info(){
		const current = this.dv.current();
		if (current !== undefined) {

			const data = new CharacterData(
				this.api,
				current,
				this.campaign,
			)

			const view = ViewFactory.createSingle(ViewType.CharacterInfo, this.dv);
			view.render(data);
		}
	}

	private async factionList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Faction,
			),
			ViewType.FactionList,
		);
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

	private async eventList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Event,
				DataType.Character,
			),
			ViewType.EventList,
		);
	}

	private async clueList(
	) {
		this.writeList(
			this.io.getRelationshipList(
				DataType.Clue,
				DataType.Character,
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
		);
	}

	 */
}
