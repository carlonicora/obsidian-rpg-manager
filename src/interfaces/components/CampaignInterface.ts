import {ComponentInterface} from "../database/ComponentInterface";
import {CampaignSetting} from "../../enums/CampaignSetting";

export interface CampaignInterface extends ComponentInterface {
	campaignId: number;
	currentDate: Date|null;
	campaignSettings: CampaignSetting;
}
