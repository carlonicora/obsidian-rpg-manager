import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {ResponseData} from "../../../data/responses/ResponseData";

export class CampaignModel extends AbstractModel {
	public generateData(
	): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			ComponentFactory.create(
				//CampaignSetting[this.campaign.settings] + 'AdventureTable' as SingleComponentKey<any>,
				CampaignSetting[this.currentElement.campaign.settings] + 'AdventureTable' as SingleComponentKey<any>,
				this.io,
				this.io.getAdventureList(),
			)
		);

		response.addElement(
			ComponentFactory.create(
				//CampaignSetting[this.campaign.settings] + 'SessionTable' as SingleComponentKey<any>,
				CampaignSetting[this.currentElement.campaign.settings] + 'SessionTable' as SingleComponentKey<any>,
				this.io,
				this.io.getSessionList(),
			)
		);

		response.addElement(
			ComponentFactory.create(
				//CampaignSetting[this.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				CampaignSetting[this.currentElement.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				this.io,
				this.io.getCharacterList(),
			)
		);

		return response;
	}
}
