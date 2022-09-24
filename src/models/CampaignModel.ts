import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {ActInterface} from "../interfaces/data/ActInterface";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {RecordType} from "../enums/RecordType";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {EventInterface} from "../interfaces/data/EventInterface";

export class CampaignModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.addList(
			RecordType.Adventure,
			this.database.readList<AdventureInterface>(RecordType.Adventure, this.currentElement.id)
				.sort(
					this.factories.sorter.create<AdventureInterface>([new SorterComparisonElement((adventure: AdventureInterface) => adventure.adventureId)])
				),
		);

		await this.addList(
			RecordType.Act,
			this.database.readList<ActInterface>(RecordType.Act, this.currentElement.id)
				.sort(this.factories.sorter.create<ActInterface>([new SorterComparisonElement((act: ActInterface) => act.actId)])),
		);

		await this.addList(
			RecordType.Session,
			this.database.readList<SessionInterface>(RecordType.Session, this.currentElement.id)
				.sort(this.factories.sorter.create<SessionInterface>([new SorterComparisonElement((session: SessionInterface) => session.sessionId)])),
		);

		await this.addList(
			RecordType.Event,
			this.database.readList<EventInterface>(RecordType.Event, this.currentElement.id)
				.sort(this.factories.sorter.create<EventInterface>([new SorterComparisonElement((event: EventInterface) => event.date)])),
		);

		await this.addList(
			RecordType.Character,
			this.database.readList<CharacterInterface>(RecordType.Character | RecordType.NonPlayerCharacter, this.currentElement.id)
				.sort(this.factories.sorter.create<CharacterInterface>([new SorterComparisonElement((character: CharacterInterface) => character.name)])),
		);


		return this.response;
	}
}
