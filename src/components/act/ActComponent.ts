import {ComponentInterface} from "../../managers/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../managers/viewsManager/interfaces/ViewClassInterface";
import {ViewType} from "../../managers/viewsManager/enum/ViewType";
import {ActModel} from "./models/ActModel";
import {ActHeaderView} from "./views/ActHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {ModalInterface} from "../../core/interfaces/ModalInterface";
import {TemplateClassInterface} from "../../managers/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../managers/templatesManager/interfaces/TemplateInterface";
import {ActTemplate} from "./templates/ActTemplate";
import {ActRelationshipView} from "./views/ActRelationshipView";
import {ActModalPart} from "./modals/ActModalPart";
import {ModalPartClassInterface} from "../../managers/modalsManager/interfaces/ModalPartClassInterface";

export class ActComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	get modalParts(): ModalPartClassInterface<ModalPartInterface>[] {
		return [ActModalPart];
	}

	get modals(): ClassInterface<ModalInterface>[] {
		return [];
	}

	public get model(): ClassInterface<ModelInterface>{
		return ActModel;
	}

	public get template(): TemplateClassInterface<TemplateInterface> {
		return ActTemplate;
	}

	public get type(): ComponentType {
		return ComponentType.Act;
	}

	public get views(): Map<ViewClassInterface, ViewType> {
		return new Map<ViewClassInterface, ViewType>([
			[ActHeaderView, ViewType.Header],
			[ActRelationshipView, ViewType.Relationships],
		]);
	}
}
