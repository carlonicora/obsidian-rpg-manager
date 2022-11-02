import {ComponentInterface} from "../../managers/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../managers/viewsManager/interfaces/ViewClassInterface";
import {ViewType} from "../../managers/viewsManager/enum/ViewType";
import {SceneModel} from "./models/SceneModel";
import {SceneHeaderView} from "./views/SceneHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {ModalInterface} from "../../core/interfaces/ModalInterface";
import {TemplateClassInterface} from "../../managers/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../managers/templatesManager/interfaces/TemplateInterface";
import {SceneTemplate} from "./templates/SceneTemplate";
import {SceneRelationshipView} from "./views/SceneRelationshipView";
import {ModalPartClassInterface} from "../../managers/modalsManager/interfaces/ModalPartClassInterface";
import {SceneModalPart} from "./modals/SceneModalPart";

export class SceneComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	get modalParts(): ModalPartClassInterface<ModalPartInterface>[] {
		return [SceneModalPart];
	}

	get modals(): ClassInterface<ModalInterface>[] {
		return [];
	}

	public get model(): ClassInterface<ModelInterface>{
		return SceneModel;
	}

	public get template(): TemplateClassInterface<TemplateInterface> {
		return SceneTemplate;
	}

	public get type(): ComponentType {
		return ComponentType.Scene;
	}

	public get views(): Map<ViewClassInterface, ViewType> {
		return new Map<ViewClassInterface, ViewType>([
			[SceneHeaderView, ViewType.Header],
			[SceneRelationshipView, ViewType.Relationships],
		]);
	}
}
