import {ComponentInterface} from "../../managers/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../managers/viewsManager/interfaces/ViewClassInterface";
import {ViewType} from "../../managers/viewsManager/enum/ViewType";
import {SubplotModel} from "./models/SubplotModel";
import {SubplotHeaderView} from "./views/SubplotHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {ModalInterface} from "../../core/interfaces/ModalInterface";
import {TemplateClassInterface} from "../../managers/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../managers/templatesManager/interfaces/TemplateInterface";
import {SubplotTemplate} from "./templates/SubplotTemplate";
import {SubplotRelationshipView} from "./views/SubplotRelationshipView";
import {ModalPartClassInterface} from "../../managers/modalsManager/interfaces/ModalPartClassInterface";
import {SubplotModalPart} from "./modals/SubplotModalPart";

export class SubplotComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	get modalParts(): ModalPartClassInterface<ModalPartInterface>[] {
		return [SubplotModalPart];
	}

	get modals(): ClassInterface<ModalInterface>[] {
		return [];
	}

	public get model(): ClassInterface<ModelInterface>{
		return SubplotModel;
	}

	public get template(): TemplateClassInterface<TemplateInterface> {
		return SubplotTemplate;
	}

	public get type(): ComponentType {
		return ComponentType.Subplot;
	}

	public get views(): Map<ViewClassInterface, ViewType> {
		return new Map<ViewClassInterface, ViewType>([
			[SubplotHeaderView, ViewType.Header],
			[SubplotRelationshipView, ViewType.Relationships],
		]);
	}
}
