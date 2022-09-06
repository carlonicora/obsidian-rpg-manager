import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {RpgData, SessionInterface} from "../../../Data";

export class SessionModel extends AbstractModel {
	protected currentElement: SessionInterface;

	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'SceneTable' as SingleComponentKey<any>,
				RpgData.index.getSceneList(
					this.currentElement.campaign.campaignId,
					this.currentElement.adventure.adventureId,
					this.currentElement.sessionId
				),
			)
		);

		return response;
	}
}
