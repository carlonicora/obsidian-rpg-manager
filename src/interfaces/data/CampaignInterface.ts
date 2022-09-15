import {RecordInterface} from "../database/RecordInterface";
import {CampaignSetting} from "../../enums/CampaignSetting";

export interface CampaignInterface extends RecordInterface, RecordInterface{
	campaignId: number;
	currentDate: Date|null;
	settings: CampaignSetting;
}
