import {ComponentInterface} from "../../managers/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../managers/viewsManager/interfaces/ViewClassInterface";
import {ViewType} from "../../managers/viewsManager/enum/ViewType";
import {FactionModel} from "./models/FactionModel";
import {FactionHeaderView} from "./views/FactionHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {TemplateClassInterface} from "../../managers/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../managers/templatesManager/interfaces/TemplateInterface";
import {FactionTemplate} from "./templates/FactionTemplate";
import {FactionRelationshipView} from "./views/FactionRelationshipView";
import {ModalPartClassInterface} from "../../managers/modalsManager/interfaces/ModalPartClassInterface";
import {FactionModalPart} from "./modals/FactionModalPart";

export class FactionComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	get modalParts(): ModalPartClassInterface<ModalPartInterface>[] {
		return [FactionModalPart];
	}

	public get model(): ClassInterface<ModelInterface>{
		return FactionModel;
	}

	public get template(): TemplateClassInterface<TemplateInterface> {
		return FactionTemplate;
	}

	public get type(): ComponentType {
		return ComponentType.Faction;
	}

	public get views(): Map<ViewClassInterface, ViewType> {
		return new Map<ViewClassInterface, ViewType>([
			[FactionHeaderView, ViewType.Header],
			[FactionRelationshipView, ViewType.Relationships],
		]);
	}
}
