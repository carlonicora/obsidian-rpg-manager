import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {NoteInterface} from "../interfaces/data/NoteInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {DataType} from "../enums/DataType";

export class NoteModel extends AbstractModel {
	protected currentElement: NoteInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = new ResponseData();

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
