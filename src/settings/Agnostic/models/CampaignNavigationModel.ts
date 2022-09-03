import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";

export class CampaignNavigationModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'Banner' as SingleComponentKey<any>,
				this.io,
				this.campaign,
			)
		);

		return response;
	}
}
