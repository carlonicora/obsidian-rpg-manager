import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {CharacterV2Interface} from "../../_dbV2/components/interfaces/CharacterV2Interface";
import {SubplotV2Interface} from "../../_dbV2/components/interfaces/SubplotV2Interface";
import {AdventureV2Interface} from "../../_dbV2/components/interfaces/AdventureV2Interface";
import {ActV2Interface} from "../../_dbV2/components/interfaces/ActV2Interface";
import {SessionV2Interface} from "../../_dbV2/components/interfaces/SessionV2Interface";
import {EventV2Interface} from "../../_dbV2/components/interfaces/EventV2Interface";
import {CampaignV2Interface} from "../../_dbV2/components/interfaces/CampaignV2Interface";

export class CampaignModel extends AbstractModel {
	protected currentElement: CampaignV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {

		await this.addList(
			ComponentType.Character,
			this.database.readList<CharacterV2Interface>(ComponentType.Character, this.currentElement.id),
			true,
		);

		await this.addList(
			ComponentType.Subplot,
			this.database.readList<SubplotV2Interface>(ComponentType.Subplot, this.currentElement.id),
			true,
		);

		await this.addList(
			ComponentType.Adventure,
			this.database.readList<AdventureV2Interface>(ComponentType.Adventure, this.currentElement.id),
			true,
		);

		await this.addList(
			ComponentType.Act,
			this.database.readList<ActV2Interface>(ComponentType.Act, this.currentElement.id),
			true,
		);

		await this.addList(
			ComponentType.Session,
			this.database.readList<SessionV2Interface>(ComponentType.Session, this.currentElement.id),
			true,
		);

		await this.addList(
			ComponentType.Event,
			this.database.readList<EventV2Interface>(ComponentType.Event, this.currentElement.id),
			true,
		);

		await this.addList(
			ComponentType.NonPlayerCharacter,
			this.database.readList<CharacterV2Interface>(ComponentType.NonPlayerCharacter, this.currentElement.id),
			true,
		);


		return this.response;
	}
}
