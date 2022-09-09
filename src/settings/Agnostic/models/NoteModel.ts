import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {NoteInterface} from "../../../interfaces/data/NoteInterface";

export class NoteModel extends AbstractModel {
	protected currentElement: NoteInterface;

	generateData(
	): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'SceneTable',
				this.app.plugins.getPlugin('rpg-manager').io.getSceneList(
					this.currentElement.campaign.campaignId,
					this.currentElement.adventure.adventureId,
					this.currentElement.sessionId
				).elements,
			)
		);
		return response;
	}
}
