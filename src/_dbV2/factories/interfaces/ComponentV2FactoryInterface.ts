import {CampaignSetting} from "../../../enums/CampaignSetting";
import {TFile} from "obsidian";
import {IdInterface} from "../../../interfaces/IdInterface";
import {ComponentV2Interface} from "../../interfaces/ComponentV2Interface";

export interface ComponentV2FactoryInterface {
	create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): ComponentV2Interface;
}
