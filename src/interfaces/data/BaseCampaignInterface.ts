import {CampaignSetting} from "../../enums/CampaignSetting";

export interface BaseCampaignInterface {
	campaignId: number;
	currentDate: Date|null;
	settings: CampaignSetting;
	link: string;
}
