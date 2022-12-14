import {ComponentInterface} from "../../managers/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../managers/viewsManager/interfaces/ViewClassInterface";
import {ViewType} from "../../managers/viewsManager/enum/ViewType";
import {EventModel} from "./models/EventModel";
import {EventHeaderView} from "./views/EventHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {TemplateClassInterface} from "../../managers/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../managers/templatesManager/interfaces/TemplateInterface";
import {EventTemplate} from "./templates/EventTemplate";
import {EventRelationshipView} from "./views/EventRelationshipView";
import {ModalPartClassInterface} from "../../managers/modalsManager/interfaces/ModalPartClassInterface";
import {EventModalPart} from "./modals/EventModalPart";

export class EventComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	get modalParts(): ModalPartClassInterface<ModalPartInterface>[] {
		return [EventModalPart];
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

	public get views(): Map<ViewClassInterface, ViewType> {
		return new Map<ViewClassInterface, ViewType>([
			[EventHeaderView, ViewType.Header],
			[EventRelationshipView, ViewType.Relationships],
		]);
	}
}
