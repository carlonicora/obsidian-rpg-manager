import {ComponentInterface} from "../../api/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelClassInterface} from "../../api/modelsManager/interfaces/ModelClassInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {ClueModel} from "../clue/models/ClueModel";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../api/viewsManager/interfaces/ViewClassInterface";
import {ViewInterface} from "../../api/viewsManager/interfaces/ViewInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {NewClueHeaderView} from "../clue/views/NewClueHeaderView";
import {ActModel} from "./models/ActModel";
import {NewActHeaderView} from "./views/NewActHeaderView";

export class ActComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	public get model(): ModelClassInterface<ModelInterface>{
		return ActModel;
	}

	public get type(): ComponentType {
		return ComponentType.Act;
	}

	public get views(): Map<ViewClassInterface<ViewInterface>, NewViewType> {
		return new Map<ViewClassInterface<ViewInterface>, NewViewType>([
			[NewActHeaderView, NewViewType.Header],
		]);
	}
}
