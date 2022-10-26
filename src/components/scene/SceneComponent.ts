import {ComponentInterface} from "../../api/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelClassInterface} from "../../api/modelsManager/interfaces/ModelClassInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../api/viewsManager/interfaces/ViewClassInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {SceneModel} from "./models/SceneModel";
import {NewSceneHeaderView} from "./views/NewSceneHeaderView";

export class SceneComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	public get model(): ModelClassInterface<ModelInterface>{
		return SceneModel;
	}

	public get type(): ComponentType {
		return ComponentType.Scene;
	}

	public get views(): Map<ViewClassInterface, NewViewType> {
		return new Map<ViewClassInterface, NewViewType>([
			[NewSceneHeaderView, NewViewType.Header],
		]);
	}
}
