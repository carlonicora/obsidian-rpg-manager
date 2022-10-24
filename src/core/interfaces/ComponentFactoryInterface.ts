import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {TFile} from "obsidian";
import {IdInterface} from "../../services/id/interfaces/IdInterface";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";

export interface ComponentFactoryInterface {
	create(
		settings: CampaignSetting,
		file: TFile,
		id: IdInterface,
	): ComponentModelInterface;
}
