import {ComponentInterface} from "../../managers/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {CharacterModel} from "./models/CharacterModel";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../managers/viewsManager/interfaces/ViewClassInterface";
import {ViewType} from "../../managers/viewsManager/enum/ViewType";
import {CharacterHeaderView} from "./views/CharacterHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {TemplateClassInterface} from "../../managers/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../managers/templatesManager/interfaces/TemplateInterface";
import {NonPlayerCharacterTemplate} from "./templates/NonPlayerCharacterTemplate";
import {NonPlayerCharacterRelationshipView} from "./views/NonPlayerCharacterRelationshipView";
import {ModalPartClassInterface} from "../../managers/modalsManager/interfaces/ModalPartClassInterface";
import {NonPlayerCharacterModalPart} from "./modals/NonPlayerCharacterModalPart";
import {NonPlayerCharacterHeaderView} from "./views/NonPlayerCharacterHeaderView";

export class NonPlayerCharacterComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	get modalParts(): ModalPartClassInterface<ModalPartInterface>[] {
		return [NonPlayerCharacterModalPart];
	}

	public get model(): ClassInterface<ModelInterface>{
		return CharacterModel;
	}

	public get template(): TemplateClassInterface<TemplateInterface> {
		return NonPlayerCharacterTemplate;
	}

	public get type(): ComponentType {
		return ComponentType.NonPlayerCharacter;
	}

	public get views(): Map<ViewClassInterface, ViewType> {
		return new Map<ViewClassInterface, ViewType>([
			[NonPlayerCharacterHeaderView, ViewType.Header],
			[NonPlayerCharacterRelationshipView, ViewType.Relationships],
		]);
	}
}
