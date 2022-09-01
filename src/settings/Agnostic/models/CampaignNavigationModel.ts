import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {AbstractModel} from "../../../abstracts/AbstractModel";

export class CampaignNavigationModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		return this.data;
	}

	/*
	public async render() {
		//this.campaignNavigation();
	}

	private async campaignNavigation(
	) {
		const data = new CampaignData(
			this.api,
			this.current,
		);

		const view = ViewFactory.createSingle(ViewType.CampaignNavigation, this.dv);
		view.render(data);
	}

	 */
}
