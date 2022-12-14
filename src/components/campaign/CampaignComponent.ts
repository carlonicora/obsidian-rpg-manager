import {ComponentInterface} from "../../managers/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "./enums/CampaignSetting";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../managers/viewsManager/interfaces/ViewClassInterface";
import {ViewType} from "../../managers/viewsManager/enum/ViewType";
import {CampaignModel} from "./models/CampaignModel";
import {CampaignHeaderView} from "./views/CampaignHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {TemplateClassInterface} from "../../managers/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../managers/templatesManager/interfaces/TemplateInterface";
import {CampaignTemplate} from "./templates/CampaignTemplate";
import {ModalPartClassInterface} from "../../managers/modalsManager/interfaces/ModalPartClassInterface";
import {CampaignModalPart} from "./modals/CampaignModalPart";

export class CampaignComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	get modalParts(): ModalPartClassInterface<ModalPartInterface>[] {
		return [CampaignModalPart];
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

	public get views(): Map<ViewClassInterface, ViewType> {
		return new Map<ViewClassInterface, ViewType>([
			[CampaignHeaderView, ViewType.Header],
		]);
	}
}
