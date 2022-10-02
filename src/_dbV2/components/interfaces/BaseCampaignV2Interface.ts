import {CampaignSetting} from "../../../enums/CampaignSetting";
import {TFile} from "obsidian";

export interface BaseCampaignV2Interface {
	campaignId: number;
	campaignSettings: CampaignSetting;
	file: TFile;
}
