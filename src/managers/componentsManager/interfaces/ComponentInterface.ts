import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ViewClassInterface} from "../../viewsManager/interfaces/ViewClassInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ViewType} from "../../viewsManager/enum/ViewType";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {ClassInterface} from "../../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../../core/interfaces/ModalPartInterface";
import {TemplateClassInterface} from "../../templatesManager/interfaces/TemplateClassInterface";
import {TemplateInterface} from "../../templatesManager/interfaces/TemplateInterface";
import {ModalPartClassInterface} from "../../modalsManager/interfaces/ModalPartClassInterface";

export interface ComponentInterface {
	get campaignSettings(): CampaignSetting;
	get modalParts(): ModalPartClassInterface<ModalPartInterface>[];
	get model(): ClassInterface<ModelInterface>;
	get template(): TemplateClassInterface<TemplateInterface>;
	get type(): ComponentType;
	get views(): Map<ViewClassInterface, ViewType>;
}
