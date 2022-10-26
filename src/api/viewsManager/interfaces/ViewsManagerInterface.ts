import {NewViewType} from "../../../core/enums/NewViewType";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ViewInterface} from "./ViewInterface";
import {ViewClassInterface} from "./ViewClassInterface";
import {ComponentType} from "../../../core/enums/ComponentType";

export interface ViewsManagerInterface {
	create(
		viewType: NewViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): ViewClassInterface<ViewInterface>|undefined;

	register<T extends ViewInterface>(
		view: ViewClassInterface<T>,
		viewType: NewViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): void;
}
