import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {DataType} from "../enums/DataType";
import {SceneInterface} from "../interfaces/data/SceneInterface";

export class SessionModel extends AbstractModel {
	protected currentElement: SessionInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = new ResponseData();

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'MusicTable',
				this.currentElement.getRelationships(DataType.Music, false),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'SceneTable',
				this.app.plugins.getPlugin('rpg-manager').io.readListParametrised<SceneInterface>(
					undefined,
					DataType.Scene,
					this.currentElement.campaign.campaignId,
					this.currentElement.adventure.adventureId,
					this.currentElement.sessionId
				),
			)
		);

		return response;
	}
}
