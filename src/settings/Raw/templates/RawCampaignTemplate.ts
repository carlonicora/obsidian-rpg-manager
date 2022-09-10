import {CampaignTemplate} from "../../Agnostic/templates/CampaignTemplate";

export class RawCampaignTemplate extends CampaignTemplate {
	protected generateFrontmatterAdditionalInformation(
	): string {
		return 'settings: Raw\n' +
			'apiCampaignKey: \n';
	}
}
