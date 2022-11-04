import {ComponentInterface} from "../../managers/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../managers/viewsManager/interfaces/ViewClassInterface";
import {ViewType} from "../../managers/viewsManager/enum/ViewType";
import {AdventureModel} from "./models/AdventureModel";
import {AdventureHeaderView} from "./views/AdventureHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {TemplateClassInterface} from "../../managers/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../managers/templatesManager/interfaces/TemplateInterface";
import {AdventureTemplate} from "./templates/AdventureTemplate";
import {AdvenureRelationshipView} from "./views/AdvenureRelationshipView";
import {ModalPartClassInterface} from "../../managers/modalsManager/interfaces/ModalPartClassInterface";
import {AdventureModalPart} from "./modals/AdventureModalPart";

export class AdventureComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	get modalParts(): ModalPartClassInterface<ModalPartInterface>[] {
		return [AdventureModalPart];
	}

	public get model(): ClassInterface<ModelInterface>{
		return AdventureModel;
	}

	public get template(): TemplateClassInterface<TemplateInterface> {
		return AdventureTemplate;
	}

	public get type(): ComponentType {
		return ComponentType.Adventure;
	}

	public get views(): Map<ViewClassInterface, ViewType> {
		return new Map<ViewClassInterface, ViewType>([
			[AdventureHeaderView, ViewType.Header],
			[AdvenureRelationshipView, ViewType.Relationships],
		]);
	}
}
