import {ComponentInterface} from "../../api/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../api/viewsManager/interfaces/ViewClassInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {CharacterModel} from "./models/CharacterModel";
import {CharacterHeaderView} from "./views/CharacterHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {ModalInterface} from "../../core/interfaces/ModalInterface";
import {TemplateClassInterface} from "../../api/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../api/templatesManager/interfaces/TemplateInterface";
import {CharacterTemplate} from "./templates/CharacterTemplate";

export class CharacterComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	get modalParts(): ClassInterface<ModalPartInterface>[] {
		return [];
	}

	get modals(): ClassInterface<ModalInterface>[] {
		return [];
	}

	public get model(): ClassInterface<ModelInterface>{
		return CharacterModel;
	}

	public get template(): TemplateClassInterface<TemplateInterface> {
		return CharacterTemplate;
	}

	public get type(): ComponentType {
		return ComponentType.Character;
	}

	public get views(): Map<ViewClassInterface, NewViewType> {
		return new Map<ViewClassInterface, NewViewType>([
			[CharacterHeaderView, NewViewType.Header],
		]);
	}
}
