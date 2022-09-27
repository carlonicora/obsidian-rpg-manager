import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {AbstractModel} from "../../abstracts/AbstractModel";
import {CampaignInterface} from "../../interfaces/components/CampaignInterface";
import {HeaderSubModel} from "../subModels/HeaderSubModel";
import {AbtPlotSubModel} from "../subModels/AbtPlotSubModel";

export class CampaignNavigationModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addSubModel(HeaderSubModel, this.currentElement, this.currentElement);

		if (this.sourceMeta?.abt != null){
			await this.response.addSubModel(
				AbtPlotSubModel,
				this.currentElement,
				this.currentElement,
				undefined,
				this.sourceMeta.abt,
			)
		}

		return this.response;
	}
}
