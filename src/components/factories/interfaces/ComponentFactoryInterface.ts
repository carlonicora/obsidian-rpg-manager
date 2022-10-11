import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {TFile} from "obsidian";
import {IdInterface} from "../../../id/interfaces/IdInterface";
import {ComponentInterface} from "../../interfaces/ComponentInterface";

export interface ComponentFactoryInterface {
	create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): ComponentInterface;
}
