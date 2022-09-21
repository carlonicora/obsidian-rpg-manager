import {CampaignSetting} from "../../enums/CampaignSetting";
import {TFile} from "obsidian";
import {RecordInterface} from "../database/RecordInterface";
import {IdInterface} from "../data/IdInterface";

export interface DataFactoryInterface {
	create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): RecordInterface;
}
