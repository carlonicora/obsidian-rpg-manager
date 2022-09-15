import {RpgDataInterface} from "./RpgDataInterface";
import {CampaignSetting} from "../../enums/CampaignSetting";

export interface CampaignInterface extends RpgDataInterface, RpgDataInterface{
	campaignId: number;
	currentDate: Date|null;
	settings: CampaignSetting;
}
