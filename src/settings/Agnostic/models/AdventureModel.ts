import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {ResponseData} from "../../../data/responses/ResponseData";
import {AdventureData} from "../data/AdventureData";
import {Adventure, AdventureInterface} from "../../../Data";

export class AdventureModel extends AbstractModel {
	protected currentElement: AdventureInterface;

	public generateData(
	): ResponseDataInterface {
		const response = new ResponseData();

		//const adventure = new AdventureData(this.current, this.campaign);

		response.addElement(
			ComponentFactory.create(
				//CampaignSetting[this.campaign.settings] + 'SessionTable' as SingleComponentKey<any>,
				CampaignSetting[this.currentElement.campaign.settings] + 'SessionTable' as SingleComponentKey<any>,
				this.io,
				//this.io.getSessionList(adventure.id),
				this.io.getSessionList(this.currentElement.adventureId),
			)
		);

		return response;
	}
}
