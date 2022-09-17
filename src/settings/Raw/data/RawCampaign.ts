import {Campaign} from "../../../data/Campaign";
import {RawCampaignInterface} from "../interfaces/RawCampaignInterface";

export class RawCampaign extends Campaign implements RawCampaignInterface {
	public apiCampaignKey: string|null;

	protected async initialiseData(
	) {
		this.apiCampaignKey = this.frontmatter?.apiCampaignKey ?? null;

		super.initialiseData();
	}
}
