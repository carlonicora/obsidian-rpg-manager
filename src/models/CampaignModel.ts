import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {DataType} from "../enums/DataType";

export class CampaignModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = new ResponseData();

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.settings,
				'AdventureTable',
				this.io.readListParametrised<AdventureInterface>(undefined, DataType.Adventure, this.currentElement.campaignId)
					.sort(function (leftData: AdventureInterface, rightData: AdventureInterface) {
						if (leftData.adventureId > rightData.adventureId) return -1;
						if (leftData.adventureId < rightData.adventureId) return 1;
						return 0;
					}),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.settings,
				'SessionTable',
				this.io.readListParametrised<SessionInterface>(undefined, DataType.Session, this.currentElement.campaignId)
					.sort(function (leftData: SessionInterface, rightData: SessionInterface) {
						if (leftData.sessionId > rightData.sessionId) return -1;
						if (leftData.sessionId < rightData.sessionId) return 1;
						return 0;
					}),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.settings,
				'CharacterTable',
				this.io.readListParametrised<CharacterInterface>(undefined, DataType.Character | DataType.NonPlayerCharacter, this.currentElement.campaignId)
					.sort(function (leftData: CharacterInterface, rightData: CharacterInterface) {
						if (leftData.name > rightData.name) return 1;
						if (leftData.name < rightData.name) return -1;
						return 0;
					}),
			)
		);

		return response;
	}
}
