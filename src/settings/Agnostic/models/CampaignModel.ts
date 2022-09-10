import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {CampaignInterface} from "../../../interfaces/data/CampaignInterface";
import {AdventureInterface} from "../../../interfaces/data/AdventureInterface";
import {SessionInterface} from "../../../interfaces/data/SessionInterface";
import {CharacterInterface} from "../../../interfaces/data/CharacterInterface";

export class CampaignModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = new ResponseData();

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.settings,
				'AdventureTable',
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
				this.currentElement.settings,
				'SessionTable',
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
				this.currentElement.settings,
				'CharacterTable',
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
