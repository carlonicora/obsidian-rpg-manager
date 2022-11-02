import {ComponentInterface} from "../../managers/componentsManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewClassInterface} from "../../managers/viewsManager/interfaces/ViewClassInterface";
import {ViewType} from "../../managers/viewsManager/enum/ViewType";
import {MusicModel} from "./models/MusicModel";
import {MusicHeaderView} from "./views/MusicHeaderView";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {ModalInterface} from "../../core/interfaces/ModalInterface";
import {TemplateClassInterface} from "../../managers/templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../managers/templatesManager/interfaces/TemplateInterface";
import {MusicTemplate} from "./templates/MusicTemplate";
import {MusicRelationshipView} from "./views/MusicRelationshipView";
import {ModalPartClassInterface} from "../../managers/modalsManager/interfaces/ModalPartClassInterface";
import {MusicModalPart} from "./modals/MusicModalPart";

export class MusicComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	get modalParts(): ModalPartClassInterface<ModalPartInterface>[] {
		return [MusicModalPart];
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

	public get views(): Map<ViewClassInterface, ViewType> {
		return new Map<ViewClassInterface, ViewType>([
			[MusicHeaderView, ViewType.Header],
			[MusicRelationshipView, ViewType.Relationships],
		]);
	}
}
