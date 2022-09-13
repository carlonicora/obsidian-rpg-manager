import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseData} from "../data/responses/ResponseData";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";

export class CampaignNavigationModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = new ResponseData();

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.settings,
				'Banner',
				this.currentElement
			)
		);

		if (this.sourceMeta?.abt != null){
			response.addElement(
				this.app.plugins.getPlugin('rpg-manager').factories.components.create(
					this.currentElement.settings,
					'AbtPlot',
					this.currentElement,
					null,
					this.sourceMeta.abt,
				)
			);
		}

		return response;
	}
}
