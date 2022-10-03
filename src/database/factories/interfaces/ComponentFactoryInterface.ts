import {CampaignSetting} from "../../../enums/CampaignSetting";
import {TFile} from "obsidian";
import {IdInterface} from "../../../interfaces/IdInterface";
import {ComponentInterface} from "../../interfaces/ComponentInterface";

export interface ComponentFactoryInterface {
	create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): ComponentInterface;
}
