import {ComponentInterface} from "../../api/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../api/viewsManager/interfaces/ViewClassInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {SessionModel} from "./models/SessionModel";
import {SessionHeaderView} from "./views/SessionHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {ModalInterface} from "../../core/interfaces/ModalInterface";
import {TemplateClassInterface} from "../../api/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../api/templatesManager/interfaces/TemplateInterface";
import {SessionTemplate} from "./templates/SessionTemplate";

export class SessionComponent implements ComponentInterface {
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
		return SessionModel;
	}

	public get template(): TemplateClassInterface<TemplateInterface> {
		return SessionTemplate;
	}

	public get type(): ComponentType {
		return ComponentType.Session;
	}

	public get views(): Map<ViewClassInterface, NewViewType> {
		return new Map<ViewClassInterface, NewViewType>([
			[SessionHeaderView, NewViewType.Header],
		]);
	}
}
