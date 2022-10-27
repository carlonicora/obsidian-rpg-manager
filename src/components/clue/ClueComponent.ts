import {ComponentInterface} from "../../managers/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ViewClassInterface} from "../../managers/viewsManager/interfaces/ViewClassInterface";
import {ClueModel} from "./models/ClueModel";
import {ClueHeaderView} from "./views/ClueHeaderView";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewType} from "../../managers/viewsManager/enum/ViewType";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {ModalInterface} from "../../core/interfaces/ModalInterface";
import {TemplateClassInterface} from "../../managers/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../managers/templatesManager/interfaces/TemplateInterface";
import {ClueTemplate} from "./templates/ClueTemplate";

export class ClueComponent implements ComponentInterface {
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
		return ClueModel;
	}

	public get template(): TemplateClassInterface<TemplateInterface> {
		return ClueTemplate;
	}

	public get type(): ComponentType {
		return ComponentType.Clue;
	}

	public get views(): Map<ViewClassInterface, ViewType> {
		return new Map<ViewClassInterface, ViewType>([
			[ClueHeaderView, ViewType.Header],
		]);
	}
}
