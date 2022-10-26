import {ComponentInterface} from "../../api/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelClassInterface} from "../../api/modelsManager/interfaces/ModelClassInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../api/viewsManager/interfaces/ViewClassInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {EventModel} from "./models/EventModel";
import {NewEventHeaderView} from "./views/NewEventHeaderView";

export class EventComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	public get model(): ModelClassInterface<ModelInterface>{
		return EventModel;
	}

	public get type(): ComponentType {
		return ComponentType.Event;
	}

	public get views(): Map<ViewClassInterface, NewViewType> {
		return new Map<ViewClassInterface, NewViewType>([
			[NewEventHeaderView, NewViewType.Header],
		]);
	}
}
