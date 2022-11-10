import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {TemplateInterface} from "./TemplateInterface";
import {TemplateClassInterface} from "./TemplateClassInterface";
import {ControllerMetadataDataInterface} from "../../controllerManager/interfaces/ControllerMetadataDataInterface";

export interface TemplatesManagerInterface {
	get(
		campaignSettings: CampaignSetting,
		type: ComponentType,
		templateName: string,
		name: string,
		campaignId?: number,
		adventureId?: number,
		actId?: number,
		sceneId?: number,
		sessionId?: number,
		additionalInformation?: ControllerMetadataDataInterface,
	): TemplateInterface;

	register<T extends TemplateInterface>(
		templateClass: TemplateClassInterface<T>,
		campaignSettings: CampaignSetting,
		type: ComponentType,
	): void;
}
