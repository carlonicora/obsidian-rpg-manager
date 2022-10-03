import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {CharacterInterface} from "../../database/components/interfaces/CharacterInterface";
import {SubplotInterface} from "../../database/components/interfaces/SubplotInterface";
import {AdventureInterface} from "../../database/components/interfaces/AdventureInterface";
import {ActInterface} from "../../database/components/interfaces/ActInterface";
import {SessionInterface} from "../../database/components/interfaces/SessionInterface";
import {EventInterface} from "../../database/components/interfaces/EventInterface";
import {CampaignInterface} from "../../database/components/interfaces/CampaignInterface";

export class CampaignModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {

		await this.addList(
			ComponentType.Character,
			this.database.readList<CharacterInterface>(ComponentType.Character, this.currentElement.id),
			true,
		);

		await this.addList(
			ComponentType.Subplot,
			this.database.readList<SubplotInterface>(ComponentType.Subplot, this.currentElement.id),
			true,
		);

		await this.addList(
			ComponentType.Adventure,
			this.database.readList<AdventureInterface>(ComponentType.Adventure, this.currentElement.id),
			true,
		);

		await this.addList(
			ComponentType.Act,
			this.database.readList<ActInterface>(ComponentType.Act, this.currentElement.id),
			true,
		);

		await this.addList(
			ComponentType.Session,
			this.database.readList<SessionInterface>(ComponentType.Session, this.currentElement.id),
			true,
		);

		await this.addList(
			ComponentType.Event,
			this.database.readList<EventInterface>(ComponentType.Event, this.currentElement.id),
			true,
		);

		await this.addList(
			ComponentType.NonPlayerCharacter,
			this.database.readList<CharacterInterface>(ComponentType.NonPlayerCharacter, this.currentElement.id),
			true,
		);


		return this.response;
	}
}
