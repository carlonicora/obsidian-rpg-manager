import {AbstractModel} from "../abstracts/AbstractModel";
import {RpgViewFactory, viewType} from "../factories/RpgViewFactory";
import {CampaignData} from "../data";

export class CampaignNavigationModel extends AbstractModel {
	public async render() {
		this.campaignNavigation();
	}

	private async campaignNavigation(
	) {
		const data = new CampaignData(
			this.api,
			this.current,
		);

		const view = RpgViewFactory.createSingle(viewType.CampaignNavigation, this.dv);
		view.render(data);
	}
}
