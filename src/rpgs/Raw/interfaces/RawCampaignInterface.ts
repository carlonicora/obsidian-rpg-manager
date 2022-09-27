import {CampaignInterface} from "../../../interfaces/components/CampaignInterface";

export interface RawCampaignInterface extends CampaignInterface {
	apiCampaignKey: string|null;
}
