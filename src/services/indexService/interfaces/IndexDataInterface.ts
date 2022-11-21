import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";

export interface IndexDataInterface {
	type: ComponentType;
	campaignSettings: CampaignSetting;

	id: string;

	campaignId: string;
	adventureId?: string;
	actId?: string;
	sceneId?: string;
	sessionId?: string;

	positionInParent: number;
}
