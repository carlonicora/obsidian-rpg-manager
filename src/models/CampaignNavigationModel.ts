import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {AbstractModel} from "../abstracts/AbstractModel";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {AbtPlotComponent} from "../components/AbtPlotComponent";

export class CampaignNavigationModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addComponent(HeaderComponent, this.currentElement, this.currentElement);

		if (this.sourceMeta?.abt != null){
			await this.response.addComponent(
				AbtPlotComponent,
				this.currentElement,
				this.currentElement,
				undefined,
				this.sourceMeta.abt,
			)
		}

		return this.response;
	}
}
