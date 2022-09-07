import {RpgDataInterface} from "./RpgDataInterface";
import {RpgOutlineDataInterface} from "./RpgOutlineDataInterface";
import {CampaignSetting} from "../../enums/CampaignSetting";

export interface CampaignInterface extends RpgDataInterface, RpgOutlineDataInterface{
	campaignId: number;
	currentDate: Date|null;
	settings: CampaignSetting;
}
