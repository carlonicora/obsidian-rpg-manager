import {ComponentType} from "../../../core/enums/ComponentType";
import {IndexInterface} from "./IndexInterface";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";

export interface IndexServiceInterface {
	create(
		type: ComponentType,
		campaignId: string|number,
		adventureId?: string|number|undefined,
		actId?: string|number|undefined,
		sceneId?: string|number|undefined,
		sessionId?: string|number|undefined,
		existingTag?: string|undefined,
		campaignSettings?: CampaignSetting,
	): IndexInterface;

	createFromTag(
		tag: string,
	): IndexInterface;

	createFromTags(
		tags: string[],
	): IndexInterface;

	createFromID(
		ID: string,
		checksum?: string,
	): IndexInterface;
}
