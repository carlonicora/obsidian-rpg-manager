import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {AdventureInterface} from "../../../interfaces/data/AdventureInterface";
import {SessionInterface} from "../../../interfaces/data/SessionInterface";

export class AdventureModel extends AbstractModel {
	protected currentElement: AdventureInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = new ResponseData();

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'SessionTable',
				this.app.plugins.getPlugin('rpg-manager').io.getSessionList(this.currentElement.campaign.campaignId, this.currentElement.adventureId)
					.sort(function (leftData: SessionInterface, rightData: SessionInterface) {
						if (leftData.sessionId > rightData.sessionId) return -1;
						if (leftData.sessionId < rightData.sessionId) return 1;
						return 0;
					}).elements,
			)
		);

		return response;
	}
}
