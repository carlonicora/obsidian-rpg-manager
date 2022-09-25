import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {ActInterface} from "../interfaces/data/ActInterface";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {RecordType} from "../enums/RecordType";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {EventInterface} from "../interfaces/data/EventInterface";
import {SubplotInterface} from "../interfaces/data/SubplotInterface";

export class CampaignModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {

		await this.addList(
			RecordType.Subplot,
			this.database.readList<SubplotInterface>(RecordType.Subplot, this.currentElement.id),
		);

		await this.addList(
			RecordType.Adventure,
			this.database.readList<AdventureInterface>(RecordType.Adventure, this.currentElement.id),
		);

		await this.addList(
			RecordType.Act,
			this.database.readList<ActInterface>(RecordType.Act, this.currentElement.id),
		);

		await this.addList(
			RecordType.Session,
			this.database.readList<SessionInterface>(RecordType.Session, this.currentElement.id),
		);

		await this.addList(
			RecordType.Event,
			this.database.readList<EventInterface>(RecordType.Event, this.currentElement.id),
		);

		await this.addList(
			RecordType.Character,
			this.database.readList<CharacterInterface>(RecordType.Character, this.currentElement.id),
		);

		await this.addList(
			RecordType.Character,
			this.database.readList<CharacterInterface>(RecordType.NonPlayerCharacter, this.currentElement.id),
		);


		return this.response;
	}
}
