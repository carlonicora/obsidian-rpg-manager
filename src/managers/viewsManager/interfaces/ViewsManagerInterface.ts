import {ViewType} from "../enum/ViewType";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ViewClassInterface} from "./ViewClassInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ElementInterface} from "./ElementInterface";
import {ClassInterface} from "../../../api/interfaces/ClassInterface";

export interface ViewsManagerInterface {
	create(
		viewType: ViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): ViewClassInterface|undefined;

	getElement<T extends ElementInterface>(
		elementClass: ClassInterface<T>,
	): ElementInterface

	register(
		view: ViewClassInterface,
		viewType: ViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): Promise<void>;

	registerElement<T extends ElementInterface>(
		elementClass: ClassInterface<T>,
	): Promise<void>;
}
