import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ModelInterface} from "./ModelInterface";
import {IdInterface} from "../../../services/idService/interfaces/IdInterface";
import {TFile} from "obsidian";
import {ClassInterface} from "../../interfaces/ClassInterface";

export interface ModelsManagerInterface {
	get(
		id: IdInterface,
		campaignSettings: CampaignSetting,
		file: TFile,
	): ModelInterface|undefined;

	register<T extends ModelInterface>(
		model: ClassInterface<T>,
		type: ComponentType,
		campaignSettings: CampaignSetting,
	): void;
}
