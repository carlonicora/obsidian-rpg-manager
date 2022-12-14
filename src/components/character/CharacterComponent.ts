import {ComponentInterface} from "../../managers/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../managers/viewsManager/interfaces/ViewClassInterface";
import {ViewType} from "../../managers/viewsManager/enum/ViewType";
import {CharacterModel} from "./models/CharacterModel";
import {CharacterHeaderView} from "./views/CharacterHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {TemplateClassInterface} from "../../managers/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../managers/templatesManager/interfaces/TemplateInterface";
import {CharacterTemplate} from "./templates/CharacterTemplate";
import {CharacterRelationshipView} from "./views/CharacterRelationshipView";
import {ModalPartClassInterface} from "../../managers/modalsManager/interfaces/ModalPartClassInterface";
import {CharacterModalPart} from "./modals/CharacterModalPart";

export class CharacterComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	get modalParts(): ModalPartClassInterface<ModalPartInterface>[] {
		return [CharacterModalPart];
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

	public get views(): Map<ViewClassInterface, ViewType> {
		return new Map<ViewClassInterface, ViewType>([
			[CharacterHeaderView, ViewType.Header],
			[CharacterRelationshipView, ViewType.Relationships],
		]);
	}
}
