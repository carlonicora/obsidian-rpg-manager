import {CampaignSetting} from "../../enums/CampaignSetting";
import {RecordType} from "../../enums/RecordType";
import {ComponentTemplateFactoryInterface} from "../ComponentTemplateFactoryInterface";

export interface TemplateFactoryInterface {
	create(
		settings: CampaignSetting,
		type: RecordType,
		templateName: string,
		name: string,
		campaignId: number|undefined,
		adventureId: number|undefined,
		actId: number|undefined,
		sceneId: number|undefined,
		sessionId: number|undefined,
		additionalInformation?: any|null,
	): ComponentTemplateFactoryInterface;
}
