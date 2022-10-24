import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../../core/enums/ComponentType";
import {NewModelClassInterface} from "./NewModelClassInterface";
import {ComponentModelInterface} from "../../componentManager/interfaces/ComponentModelInterface";

export interface NewModelFactoryInterface {
	create(
		type: ComponentType,
		campaignSettings: CampaignSetting,
	): ComponentModelInterface;

	register<T extends ComponentModelInterface>(
		model: NewModelClassInterface<T>,
		type: ComponentType,
		campaignSettings: CampaignSetting,
	): void;
}
