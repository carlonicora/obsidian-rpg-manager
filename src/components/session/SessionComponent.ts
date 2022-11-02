import {ComponentInterface} from "../../managers/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../managers/viewsManager/interfaces/ViewClassInterface";
import {ViewType} from "../../managers/viewsManager/enum/ViewType";
import {SessionModel} from "./models/SessionModel";
import {SessionHeaderView} from "./views/SessionHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {ModalInterface} from "../../core/interfaces/ModalInterface";
import {TemplateClassInterface} from "../../managers/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../managers/templatesManager/interfaces/TemplateInterface";
import {SessionTemplate} from "./templates/SessionTemplate";
import {SessionRelationshipView} from "./views/SessionRelationshipView";
import {ModalPartClassInterface} from "../../managers/modalsManager/interfaces/ModalPartClassInterface";
import {SessionModalPart} from "./modals/SessionModalPart";

export class SessionComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	get modalParts(): ModalPartClassInterface<ModalPartInterface>[] {
		return [SessionModalPart];
	}

	get modals(): ClassInterface<ModalInterface>[] {
		return [];
	}

	public get model(): ClassInterface<ModelInterface>{
		return SessionModel;
	}

	public get template(): TemplateClassInterface<TemplateInterface> {
		return SessionTemplate;
	}

	public get type(): ComponentType {
		return ComponentType.Session;
	}

	public get views(): Map<ViewClassInterface, ViewType> {
		return new Map<ViewClassInterface, ViewType>([
			[SessionHeaderView, ViewType.Header],
			[SessionRelationshipView, ViewType.Relationships],
		]);
	}
}
