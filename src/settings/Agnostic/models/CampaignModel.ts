import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {ResponseData} from "../../../data/responses/ResponseData";
import {CampaignInterface} from "../../../interfaces/data/CampaignInterface";
import {AdventureInterface} from "../../../interfaces/data/AdventureInterface";
import {SessionInterface} from "../../../interfaces/data/SessionInterface";
import {CharacterInterface} from "../../../interfaces/data/CharacterInterface";

export class CampaignModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public generateData(
	): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				CampaignSetting[this.currentElement.settings] + 'AdventureTable' as SingleComponentKey<any>,
				this.app.plugins.getPlugin('rpg-manager').io.getAdventureList(this.currentElement.campaignId)
					.sort(function (leftData: AdventureInterface, rightData: AdventureInterface) {
						if (leftData.adventureId > rightData.adventureId) return -1;
						if (leftData.adventureId < rightData.adventureId) return 1;
						return 0;
					}).elements,
			)
		);

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				CampaignSetting[this.currentElement.settings] + 'SessionTable' as SingleComponentKey<any>,
				this.app.plugins.getPlugin('rpg-manager').io.getSessionList(this.currentElement.campaignId)
					.sort(function (leftData: SessionInterface, rightData: SessionInterface) {
						if (leftData.sessionId > rightData.sessionId) return -1;
						if (leftData.sessionId < rightData.sessionId) return 1;
						return 0;
					}).elements,
			)
		);

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				CampaignSetting[this.currentElement.settings] + 'CharacterTable' as SingleComponentKey<any>,
				this.app.plugins.getPlugin('rpg-manager').io.getCharacterList(this.currentElement.campaignId)
					.sort(function (leftData: CharacterInterface, rightData: CharacterInterface) {
						if (leftData.name > rightData.name) return 1;
						if (leftData.name < rightData.name) return -1;
						return 0;
					}).elements,
			)
		);

		return response;
	}
}
