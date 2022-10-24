import {ComponentInterface} from "../../api/componentManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {NewModelClassInterface} from "../../api/factories/interfaces/NewModelClassInterface";
import {NewViewClassInterface} from "../../api/factories/interfaces/NewViewClassInterface";
import {NewViewInterface} from "../../views/interfaces/NewViewInterface";
import {ClueModel} from "./models/ClueModel";
import {NewClueHeaderView} from "./views/NewClueHeaderView";
import {ComponentType} from "../../core/enums/ComponentType";
import {NewViewType} from "../../core/enums/NewViewType";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {NewRelationshipsViewInterface} from "../../views/interfaces/NewRelationshipsViewInterface";

export class ClueComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	public get model(): NewModelClassInterface<ComponentModelInterface>{
		return ClueModel;
	}

	public get type(): ComponentType {
		return ComponentType.Clue;
	}

	public get views(): Map<NewViewClassInterface<NewViewInterface>, NewViewType> {
		return new Map<NewViewClassInterface<NewViewInterface>, NewViewType>([
			[NewClueHeaderView, NewViewType.Header],
		]);
	}
}
