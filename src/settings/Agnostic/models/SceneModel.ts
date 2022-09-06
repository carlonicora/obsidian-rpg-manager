import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {DataType} from "../../../enums/DataType";
import {RpgData, SceneInterface} from "../../../Data";

export class SceneModel extends AbstractModel {
	protected currentElement: SceneInterface;

	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				RpgData.index.getRelationshipList(
					this.currentElement,
					DataType.Character,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'FactionTable' as SingleComponentKey<any>,
				RpgData.index.getRelationshipList(
					this.currentElement,
					DataType.Faction,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'ClueTable' as SingleComponentKey<any>,
				RpgData.index.getRelationshipList(
					this.currentElement,
					DataType.Clue,
				),
			)
		);

		return response;
	}
}
