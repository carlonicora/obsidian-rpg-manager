import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {DataType} from "../enums/DataType";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {MusicTableComponent} from "../components/MusicTableComponent";
import {SceneTableComponent} from "../components/SceneTableComponent";

export class SessionModel extends AbstractModel {
	protected currentElement: SessionInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addComponent(
			MusicTableComponent,
			this.currentElement.getRelationships(DataType.Music, false),
		);

		await this.response.addComponent(
			SceneTableComponent,
			this.app.plugins.getPlugin('rpg-manager').database.readListParametrised<SceneInterface>(
				DataType.Scene,
				this.currentElement.campaign.campaignId,
				this.currentElement.adventure.adventureId,
				this.currentElement.sessionId
			),
		);

		return this.response;
	}
}
