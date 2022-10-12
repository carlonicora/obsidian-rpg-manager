import {CampaignSetting} from "../../../components/components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../../components/enums/ComponentType";
import {ComponentTemplateFactoryInterface} from "./ComponentTemplateFactoryInterface";

export interface TemplateFactoryInterface {
	create(
		settings: CampaignSetting,
		type: ComponentType,
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
