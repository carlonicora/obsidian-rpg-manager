import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {TFile} from "obsidian";
import {IdInterface} from "../../services/id/interfaces/IdInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";

export interface ComponentFactoryInterface {
	create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): ModelInterface;
}
