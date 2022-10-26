import {CampaignSetting} from "../../src/components/campaign/enums/CampaignSetting";
import {TFile} from "obsidian";
import {IdInterface} from "../../src/services/idService/interfaces/IdInterface";
import {ModelInterface} from "../../src/api/modelsManager/interfaces/ModelInterface";

export interface ComponentFactoryInterface {
	create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): ModelInterface;
}
