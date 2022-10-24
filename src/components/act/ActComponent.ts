import {ComponentInterface} from "../../api/componentManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {NewModelClassInterface} from "../../api/factories/interfaces/NewModelClassInterface";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {ClueModel} from "../clue/models/ClueModel";
import {ComponentType} from "../../core/enums/ComponentType";
import {NewViewClassInterface} from "../../api/factories/interfaces/NewViewClassInterface";
import {NewViewInterface} from "../../views/interfaces/NewViewInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {NewClueHeaderView} from "../clue/views/NewClueHeaderView";
import {ActModel} from "./models/ActModel";
import {NewActHeaderView} from "./views/NewActHeaderView";

export class ActComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	public get model(): NewModelClassInterface<ComponentModelInterface>{
		return ActModel;
	}

	public get type(): ComponentType {
		return ComponentType.Act;
	}

	public get views(): Map<NewViewClassInterface<NewViewInterface>, NewViewType> {
		return new Map<NewViewClassInterface<NewViewInterface>, NewViewType>([
			[NewActHeaderView, NewViewType.Header],
		]);
	}
}
