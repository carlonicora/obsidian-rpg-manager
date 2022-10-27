import {ViewType} from "../enum/ViewType";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ViewClassInterface} from "./ViewClassInterface";
import {ComponentType} from "../../../core/enums/ComponentType";

export interface ViewsManagerInterface {
	create(
		viewType: ViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): ViewClassInterface|undefined;

	register(
		view: ViewClassInterface,
		viewType: ViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): void;
}
