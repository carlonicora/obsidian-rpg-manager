import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {NewViewClassInterface} from "../../factories/interfaces/NewViewClassInterface";
import {NewViewInterface} from "../../../views/interfaces/NewViewInterface";
import {NewModelClassInterface} from "../../factories/interfaces/NewModelClassInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {NewViewType} from "../../../core/enums/NewViewType";
import {ComponentModelInterface} from "./ComponentModelInterface";

export interface ComponentInterface {
	get campaignSettings(): CampaignSetting;
	get model(): NewModelClassInterface<ComponentModelInterface>;
	get type(): ComponentType;
	get views(): Map<NewViewClassInterface<NewViewInterface>, NewViewType>;
}
