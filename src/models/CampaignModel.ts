import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {DataType} from "../enums/DataType";
import {SessionTableComponent} from "../components/SessionTableComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";

export class CampaignModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addComponent(
			SessionTableComponent,
			this.io.readListParametrised<SessionInterface>(DataType.Session, this.currentElement.campaignId)
				.sort(function (leftData: SessionInterface, rightData: SessionInterface) {
					if (leftData.sessionId > rightData.sessionId) return -1;
					if (leftData.sessionId < rightData.sessionId) return 1;
					return 0;
				}),
		);

		await this.response.addComponent(
			CharacterTableComponent,
			this.io.readListParametrised<CharacterInterface>(DataType.Character | DataType.NonPlayerCharacter, this.currentElement.campaignId)
				.sort(function (leftData: CharacterInterface, rightData: CharacterInterface) {
					if (leftData.name > rightData.name) return 1;
					if (leftData.name < rightData.name) return -1;
					return 0;
				}),
		);

		return this.response;
	}
}
