import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";

export interface IndexDataInterface {
	type: ComponentType;
	campaignSettings: CampaignSetting;

	id: string;

	campaignId: string;
	parentId: string;

	positionInParent: number;
}
