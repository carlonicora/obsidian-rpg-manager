import {CampaignInterface} from "../../../interfaces/data/CampaignInterface";

export interface RawCampaignInterface extends CampaignInterface {
	apiCampaignKey: string|null;
}
