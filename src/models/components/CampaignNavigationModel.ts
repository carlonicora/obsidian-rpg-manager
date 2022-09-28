import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {AbstractModel} from "../../abstracts/AbstractModel";
import {CampaignInterface} from "../../interfaces/components/CampaignInterface";
import {AbtPlotSubModel} from "../subModels/AbtPlotSubModel";
import {CampaignHeaderSubModel} from "../subModels/headers/CampaignHeaderSubModel";

export class CampaignNavigationModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addSubModel(CampaignHeaderSubModel, this.currentElement, this.currentElement);

		if (this.settings.usePlotStructures) {
			if (this.sourceMeta?.abt != null) {
				await this.response.addSubModel(
					AbtPlotSubModel,
					this.currentElement,
					this.currentElement,
					undefined,
					this.sourceMeta.abt,
				)
			}
		}

		return this.response;
	}
}
