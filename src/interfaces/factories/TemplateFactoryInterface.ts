import {CampaignSetting} from "../../enums/CampaignSetting";
import {DataType} from "../../enums/DataType";
import {ComponentTemplateFactoryInterface} from "../ComponentTemplateFactoryInterface";

export interface TemplateFactoryInterface {
	create(
		settings: CampaignSetting,
		type: DataType,
		templateName: string,
		name: string,
		campaignId: number|undefined,
		adventureId: number|undefined,
		sessionId: number|undefined,
		sceneId: number|undefined,
		additionalInformation?: any|null,
	): ComponentTemplateFactoryInterface;
}
