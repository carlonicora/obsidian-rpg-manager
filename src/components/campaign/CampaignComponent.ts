import {ComponentInterface} from "../../api/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "./enums/CampaignSetting";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../api/viewsManager/interfaces/ViewClassInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {CampaignModel} from "./models/CampaignModel";
import {CampaignHeaderView} from "./views/CampaignHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {ModalInterface} from "../../core/interfaces/ModalInterface";
import {TemplateClassInterface} from "../../api/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../api/templatesManager/interfaces/TemplateInterface";
import {CampaignTemplate} from "./templates/CampaignTemplate";

export class CampaignComponent implements ComponentInterface {
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
		return CampaignModel;
	}

	public get template(): TemplateClassInterface<TemplateInterface> {
		return CampaignTemplate;
	}

	public get type(): ComponentType {
		return ComponentType.Campaign;
	}

	public get views(): Map<ViewClassInterface, NewViewType> {
		return new Map<ViewClassInterface, NewViewType>([
			[CampaignHeaderView, NewViewType.Header],
		]);
	}
}
