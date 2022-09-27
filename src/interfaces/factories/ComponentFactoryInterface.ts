import {CampaignSetting} from "../../enums/CampaignSetting";
import {TFile} from "obsidian";
import {ComponentInterface} from "../database/ComponentInterface";
import {IdInterface} from "../components/IdInterface";

export interface ComponentFactoryInterface {
	create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): ComponentInterface;
}
