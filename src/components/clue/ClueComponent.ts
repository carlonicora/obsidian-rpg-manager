import {ComponentInterface} from "../../api/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelClassInterface} from "../../api/modelsManager/interfaces/ModelClassInterface";
import {ViewClassInterface} from "../../api/viewsManager/interfaces/ViewClassInterface";
import {ClueModel} from "./models/ClueModel";
import {NewClueHeaderView} from "./views/NewClueHeaderView";
import {ComponentType} from "../../core/enums/ComponentType";
import {NewViewType} from "../../core/enums/NewViewType";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";

export class ClueComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	public get model(): ModelClassInterface<ModelInterface>{
		return ClueModel;
	}

	public get type(): ComponentType {
		return ComponentType.Clue;
	}

	public get views(): Map<ViewClassInterface, NewViewType> {
		return new Map<ViewClassInterface, NewViewType>([
			[NewClueHeaderView, NewViewType.Header],
		]);
	}
}
