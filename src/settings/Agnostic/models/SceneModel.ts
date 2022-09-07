import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {DataType} from "../../../enums/DataType";
import {SceneInterface} from "../../../interfaces/data/SceneInterface";

export class SceneModel extends AbstractModel {
	protected currentElement: SceneInterface;

	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				this.app,
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Character,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'FactionTable' as SingleComponentKey<any>,
				this.app,
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Faction,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.currentElement.campaign.settings] + 'ClueTable' as SingleComponentKey<any>,
				this.app,
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Clue,
				),
			)
		);

		return response;
	}
}
