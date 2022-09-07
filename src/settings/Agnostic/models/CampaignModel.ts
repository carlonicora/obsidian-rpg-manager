import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {ResponseData} from "../../../data/responses/ResponseData";
import {CampaignInterface} from "../../../interfaces/data/CampaignInterface";

export class CampaignModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public generateData(
	): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'AdventureTable' as SingleComponentKey<any>,
				this.app,
				this.app.plugins.getPlugin('rpg-manager').io.getAdventureList(),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'SessionTable' as SingleComponentKey<any>,
				this.app,
				this.app.plugins.getPlugin('rpg-manager').io.getSessionList(),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				this.app,
				this.app.plugins.getPlugin('rpg-manager').io.getCharacterList(),
			)
		);

		return response;
	}
}
