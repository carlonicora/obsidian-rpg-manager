import {CampaignSetting} from "../../../components/components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../../components/enums/ComponentType";
import {IdInterface} from "../../../id/interfaces/IdInterface";

export interface FileFactoryInterface {
	create(
		settings: CampaignSetting,
		type: ComponentType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: IdInterface,
		adventureId?: IdInterface|undefined,
		actId?: IdInterface|undefined,
		sceneId?: IdInterface|undefined,
		sessionId?: IdInterface|undefined,
		additionalInformation?: any|null,
	): Promise<void>;

	silentCreate(
		type: ComponentType,
		name: string,
		campaignId: number,
		adventureId?: number|undefined,
		actId?: number|undefined,
		sceneId?: number|undefined,
		sessionId?: number|undefined,
		additionalInformation?: any|undefined,
	): Promise<void>;
}
