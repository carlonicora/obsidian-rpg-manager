import {ComponentType} from "../../../core/enums/ComponentType";
import {IndexInterface} from "./IndexInterface";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {IndexDataInterface} from "./IndexDataInterface";

export interface IndexServiceInterface {
	create(
		type: ComponentType,
		id: string,
		campaignId: string,
		adventureId?: string,
		actId?: string,
		sceneId?: string,
		sessionId?: string,
		positionInParent?: number,
		campaignSettings?: CampaignSetting,
	): IndexInterface;

	createFromIndex(
		index: IndexDataInterface,
	): IndexInterface;

	createUUID(
	): string;
}
