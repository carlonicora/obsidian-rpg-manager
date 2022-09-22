import {CampaignSetting} from "../../enums/CampaignSetting";
import {RecordType} from "../../enums/RecordType";
import {IdInterface} from "../data/IdInterface";

export interface FileFactoryInterface {
	create(
		settings: CampaignSetting,
		type: RecordType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: IdInterface,
		adventureId?: IdInterface|undefined,
		sessionId?: IdInterface|undefined,
		sceneId?: IdInterface|undefined,
		additionalInformation?: any|null,
	): Promise<void>;

	silentCreate(
		type: RecordType,
		name: string,
		campaignId: number,
		adventureId?: number|undefined,
		sessionId?: number|undefined,
		sceneId?: number|undefined,
		additionalInformation?: any|undefined,
	): Promise<void>;
}
