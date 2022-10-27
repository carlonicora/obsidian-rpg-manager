import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ViewClassInterface} from "../../viewsManager/interfaces/ViewClassInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {NewViewType} from "../../../core/enums/NewViewType";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {ClassInterface} from "../../../api/interfaces/ClassInterface";
import {ModalInterface} from "../../../core/interfaces/ModalInterface";
import {ModalPartInterface} from "../../../core/interfaces/ModalPartInterface";
import {TemplateClassInterface} from "../../templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../templatesManager/interfaces/TemplateInterface";

export interface ComponentInterface {
	get campaignSettings(): CampaignSetting;
	get modalParts(): ClassInterface<ModalPartInterface>[];
	get modals(): ClassInterface<ModalInterface>[];
	get model(): ClassInterface<ModelInterface>;
	get template(): TemplateClassInterface<TemplateInterface>;
	get type(): ComponentType;
	get views(): Map<ViewClassInterface, NewViewType>;
}
