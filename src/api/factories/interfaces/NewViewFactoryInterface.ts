import {NewViewType} from "../../../core/enums/NewViewType";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {NewViewInterface} from "../../../views/interfaces/NewViewInterface";
import {NewViewClassInterface} from "./NewViewClassInterface";
import {ComponentType} from "../../../core/enums/ComponentType";

export interface NewViewFactoryInterface {
	create(
		viewType: NewViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): NewViewClassInterface<NewViewInterface>;

	register<T extends NewViewInterface>(
		view: NewViewClassInterface<T>,
		viewType: NewViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): void;
}
