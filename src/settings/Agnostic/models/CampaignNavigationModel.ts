import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {CampaignInterface} from "../../../Data";

export class CampaignNavigationModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			ComponentFactory.create(
				//CampaignSetting[this.campaign.settings] + 'Banner' as SingleComponentKey<any>,
				CampaignSetting[this.currentElement.settings] + 'Banner' as SingleComponentKey<any>,
				//this.io,
				//this.campaign,
				this.currentElement
			)
		);

		return response;
	}
}
