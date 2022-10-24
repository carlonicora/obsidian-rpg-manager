import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../../core/enums/ComponentType";
import {NewModelClassInterface} from "./NewModelClassInterface";
import {ComponentModelInterface} from "../../componentManager/interfaces/ComponentModelInterface";
import {IdInterface} from "../../../services/id/interfaces/IdInterface";
import {TFile} from "obsidian";

export interface NewModelFactoryInterface {
	create(
		id: IdInterface,
		campaignSettings: CampaignSetting,
		file: TFile,
	): ComponentModelInterface|undefined;

	register<T extends ComponentModelInterface>(
		model: NewModelClassInterface<T>,
		type: ComponentType,
		campaignSettings: CampaignSetting,
	): void;
}
