import {ComponentInterface} from "../../api/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../api/viewsManager/interfaces/ViewClassInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {MusicModel} from "./models/MusicModel";
import {MusicHeaderView} from "./views/MusicHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {ModalInterface} from "../../core/interfaces/ModalInterface";
import {TemplateClassInterface} from "../../api/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../api/templatesManager/interfaces/TemplateInterface";
import {MusicTemplate} from "./templates/MusicTemplate";

export class MusicComponent implements ComponentInterface {
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
		return MusicModel;
	}

	public get template(): TemplateClassInterface<TemplateInterface> {
		return MusicTemplate;
	}

	public get type(): ComponentType {
		return ComponentType.Music;
	}

	public get views(): Map<ViewClassInterface, NewViewType> {
		return new Map<ViewClassInterface, NewViewType>([
			[MusicHeaderView, NewViewType.Header],
		]);
	}
}
