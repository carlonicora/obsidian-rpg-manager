import {CampaignSetting} from "../../enums/CampaignSetting";
import {DataType} from "../../enums/DataType";

export interface FileFactoryInterface {
	create(
		settings: CampaignSetting,
		type: DataType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId?: number|undefined,
		adventureId?: number|undefined,
		sessionId?: number|undefined,
		sceneId?: number|undefined,
		additionalInformation?: any|null,
	): Promise<void>;

	silentCreate(
		type: DataType,
		name: string,
		campaignId: number,
		adventureId?: number|undefined,
		sessionId?: number|undefined,
		sceneId?: number|undefined,
		additionalInformation?: any|undefined,
	): Promise<void>;
}
