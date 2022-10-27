import {ComponentInterface} from "../../api/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../api/viewsManager/interfaces/ViewClassInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {EventModel} from "./models/EventModel";
import {EventHeaderView} from "./views/EventHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {ModalInterface} from "../../core/interfaces/ModalInterface";
import {TemplateClassInterface} from "../../api/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../api/templatesManager/interfaces/TemplateInterface";
import {EventTemplate} from "./templates/EventTemplate";

export class EventComponent implements ComponentInterface {
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
		return EventModel;
	}

	public get template(): TemplateClassInterface<TemplateInterface> {
		return EventTemplate;
	}

	public get type(): ComponentType {
		return ComponentType.Event;
	}

	public get views(): Map<ViewClassInterface, NewViewType> {
		return new Map<ViewClassInterface, NewViewType>([
			[EventHeaderView, NewViewType.Header],
		]);
	}
}
