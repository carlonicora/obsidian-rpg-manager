import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {DataType} from "../../../enums/DataType";

export class SceneModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Character,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'FactionTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Faction,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'ClueTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Clue,
				),
			)
		);

		return response;
	}
}
