import {ComponentInterface} from "../../api/componentManager/interfaces/ComponentInterface";
import {CampaignSetting} from "./enums/CampaignSetting";
import {NewModelClassInterface} from "../../api/factories/interfaces/NewModelClassInterface";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {NewViewClassInterface} from "../../api/factories/interfaces/NewViewClassInterface";
import {NewViewInterface} from "../../views/interfaces/NewViewInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {CampaignModel} from "./models/CampaignModel";
import {NewCampaignHeaderView} from "./views/NewCampaignHeaderView";

export class CampaignComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	public get model(): NewModelClassInterface<ComponentModelInterface>{
		return CampaignModel;
	}

	public get type(): ComponentType {
		return ComponentType.Campaign;
	}

	public get views(): Map<NewViewClassInterface<NewViewInterface>, NewViewType> {
		return new Map<NewViewClassInterface<NewViewInterface>, NewViewType>([
			[NewCampaignHeaderView, NewViewType.Header],
		]);
	}
}
