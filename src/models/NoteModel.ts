import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {NoteInterface} from "../interfaces/data/NoteInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {DataType} from "../enums/DataType";
import {SceneTableComponent} from "../components/SceneTableComponent";

export class NoteModel extends AbstractModel {
	protected currentElement: NoteInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
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
