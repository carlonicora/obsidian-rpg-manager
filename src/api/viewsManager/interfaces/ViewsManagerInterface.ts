import {NewViewType} from "../../../core/enums/NewViewType";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ViewClassInterface} from "./ViewClassInterface";
import {ComponentType} from "../../../core/enums/ComponentType";

export interface ViewsManagerInterface {
	create(
		viewType: NewViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): ViewClassInterface|undefined;

	register(
		view: ViewClassInterface,
		viewType: NewViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): void;
}
