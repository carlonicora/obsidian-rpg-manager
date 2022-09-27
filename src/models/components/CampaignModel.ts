import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {CampaignInterface} from "../../interfaces/components/CampaignInterface";
import {ActInterface} from "../../interfaces/components/ActInterface";
import {CharacterInterface} from "../../interfaces/components/CharacterInterface";
import {ComponentType} from "../../enums/ComponentType";
import {AdventureInterface} from "../../interfaces/components/AdventureInterface";
import {SessionInterface} from "../../interfaces/components/SessionInterface";
import {EventInterface} from "../../interfaces/components/EventInterface";
import {SubplotInterface} from "../../interfaces/components/SubplotInterface";

export class CampaignModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {

		await this.addList(
			ComponentType.Subplot,
			this.database.readList<SubplotInterface>(ComponentType.Subplot, this.currentElement.id),
		);

		await this.addList(
			ComponentType.Adventure,
			this.database.readList<AdventureInterface>(ComponentType.Adventure, this.currentElement.id),
		);

		await this.addList(
			ComponentType.Act,
			this.database.readList<ActInterface>(ComponentType.Act, this.currentElement.id),
		);

		await this.addList(
			ComponentType.Session,
			this.database.readList<SessionInterface>(ComponentType.Session, this.currentElement.id),
		);

		await this.addList(
			ComponentType.Event,
			this.database.readList<EventInterface>(ComponentType.Event, this.currentElement.id),
		);

		await this.addList(
			ComponentType.Character,
			this.database.readList<CharacterInterface>(ComponentType.Character, this.currentElement.id),
		);

		await this.addList(
			ComponentType.NonPlayerCharacter,
			this.database.readList<CharacterInterface>(ComponentType.NonPlayerCharacter, this.currentElement.id),
		);


		return this.response;
	}
}
