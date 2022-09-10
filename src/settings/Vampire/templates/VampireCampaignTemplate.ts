import {CampaignTemplate} from "../../Agnostic/templates/CampaignTemplate";

export class VampireCampaignTemplate extends CampaignTemplate {
	protected generateFrontmatterAdditionalInformation(
	): string {
		return 'settings: Vampire\n';
	}
}
