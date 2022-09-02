import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseData} from "../../../data/ResponseData";

export class CampaignNavigationModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();
		return response;
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
