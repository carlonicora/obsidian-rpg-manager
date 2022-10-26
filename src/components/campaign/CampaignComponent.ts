import {ComponentInterface} from "../../api/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "./enums/CampaignSetting";
import {ModelClassInterface} from "../../api/modelsManager/interfaces/ModelClassInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../api/viewsManager/interfaces/ViewClassInterface";
import {ViewInterface} from "../../api/viewsManager/interfaces/ViewInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {CampaignModel} from "./models/CampaignModel";
import {NewCampaignHeaderView} from "./views/NewCampaignHeaderView";

export class CampaignComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	public get model(): ModelClassInterface<ModelInterface>{
		return CampaignModel;
	}

	public get type(): ComponentType {
		return ComponentType.Campaign;
	}

	public get views(): Map<ViewClassInterface<ViewInterface>, NewViewType> {
		return new Map<ViewClassInterface<ViewInterface>, NewViewType>([
			[NewCampaignHeaderView, NewViewType.Header],
		]);
	}
}
