import {ComponentInterface} from "../../api/componentManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {NewModelClassInterface} from "../../api/factories/interfaces/NewModelClassInterface";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {CharacterModel} from "./models/CharacterModel";
import {ComponentType} from "../../core/enums/ComponentType";
import {NewViewClassInterface} from "../../api/factories/interfaces/NewViewClassInterface";
import {NewViewInterface} from "../../views/interfaces/NewViewInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {NewCharacterHeaderView} from "./views/NewCharacterHeaderView";

export class NonPlayerCharacterComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	public get model(): NewModelClassInterface<ComponentModelInterface>{
		return CharacterModel;
	}

	public get type(): ComponentType {
		return ComponentType.NonPlayerCharacter;
	}

	public get views(): Map<NewViewClassInterface<NewViewInterface>, NewViewType> {
		return new Map<NewViewClassInterface<NewViewInterface>, NewViewType>([
			[NewCharacterHeaderView, NewViewType.Header],
		]);
	}
}
