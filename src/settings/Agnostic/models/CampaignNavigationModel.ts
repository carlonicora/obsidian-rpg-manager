import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseData} from "../../../data/responses/ResponseData";
import {SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {CampaignInterface} from "../../../interfaces/data/CampaignInterface";

export class CampaignNavigationModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				CampaignSetting[this.currentElement.settings] + 'Banner' as SingleComponentKey<any>,
				this.currentElement
			)
		);

		if (this.sourceMeta?.abt != null){
			response.addElement(
				this.app.plugins.getPlugin('rpg-manager').factories.components.create(
					CampaignSetting[this.currentElement.settings] + 'AbtPlot' as SingleComponentKey<any>,
					this.currentElement,
					null,
					this.sourceMeta.abt,
				)
			);
		}

		return response;
	}
}
