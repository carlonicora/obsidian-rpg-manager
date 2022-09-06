import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {ResponseData} from "../../../data/responses/ResponseData";
import {CampaignInterface, RpgData} from "../../../Data";

export class CampaignModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public generateData(
	): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'AdventureTable' as SingleComponentKey<any>,
				RpgData.index.getAdventureList(),
			)
		);

		response.addElement(
			ComponentFactory.create(
				//CampaignSetting[this.campaign.settings] + 'SessionTable' as SingleComponentKey<any>,
				CampaignSetting[this.currentElement.campaign.settings] + 'SessionTable' as SingleComponentKey<any>,
				RpgData.index.getSessionList(),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				RpgData.index.getCharacterList(),
			)
		);

		return response;
	}
}
