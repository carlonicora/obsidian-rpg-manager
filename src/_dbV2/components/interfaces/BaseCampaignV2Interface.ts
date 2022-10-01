import {CampaignSetting} from "../../../enums/CampaignSetting";

export interface BaseCampaignV2Interface {
	campaignId: number;
	campaignSettings: CampaignSetting;
}
