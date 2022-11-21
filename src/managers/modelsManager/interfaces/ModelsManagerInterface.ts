import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ModelInterface} from "./ModelInterface";
import {IndexInterface} from "../../../services/indexService/interfaces/IndexInterface";
import {TFile} from "obsidian";
import {ClassInterface} from "../../../api/interfaces/ClassInterface";

export interface ModelsManagerInterface {
	get(
		id: IndexInterface,
		campaignSettings: CampaignSetting,
		file: TFile,
	): ModelInterface|undefined;

	register<T extends ModelInterface>(
		model: ClassInterface<T>,
		type: ComponentType,
		campaignSettings: CampaignSetting,
	): void;
}
