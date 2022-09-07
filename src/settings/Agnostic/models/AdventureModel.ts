import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {ResponseData} from "../../../data/responses/ResponseData";
import {AdventureInterface} from "../../../interfaces/data/AdventureInterface";

export class AdventureModel extends AbstractModel {
	protected currentElement: AdventureInterface;

	public generateData(
	): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'SessionTable' as SingleComponentKey<any>,
				this.app,
				this.app.plugins.getPlugin('rpg-manager').io.getSessionList(this.currentElement.adventureId)
			)
		);

		return response;
	}
}
