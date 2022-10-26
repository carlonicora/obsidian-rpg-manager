import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ViewClassInterface} from "../../viewsManager/interfaces/ViewClassInterface";
import {ViewInterface} from "../../viewsManager/interfaces/ViewInterface";
import {ModelClassInterface} from "../../modelsManager/interfaces/ModelClassInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {NewViewType} from "../../../core/enums/NewViewType";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";

export interface ComponentInterface {
	get campaignSettings(): CampaignSetting;
	get model(): ModelClassInterface<ModelInterface>;
	get type(): ComponentType;
	get views(): Map<ViewClassInterface<ViewInterface>, NewViewType>;
}
