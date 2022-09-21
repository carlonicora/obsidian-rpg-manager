import {RecordInterface} from "../database/RecordInterface";
import {CampaignSetting} from "../../enums/CampaignSetting";

export interface CampaignInterface extends RecordInterface {
	campaignId: number;
	currentDate: Date|null;
	campaignSettings: CampaignSetting;
}
