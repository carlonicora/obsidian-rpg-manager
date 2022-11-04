import {ComponentType} from "../../../core/enums/ComponentType";
import {IdInterface} from "./IdInterface";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";

export interface IdServiceInterface {
	create(
		type: ComponentType,
		campaignId: string|number,
		adventureId?: string|number|undefined,
		actId?: string|number|undefined,
		sceneId?: string|number|undefined,
		sessionId?: string|number|undefined,
		existingTag?: string|undefined,
		campaignSettings?: CampaignSetting,
	): IdInterface;

	createFromTag(
		tag: string,
	): IdInterface;

	createFromTags(
		tags: string[],
	): IdInterface;

	createFromID(
		ID: string,
		checksum?: string,
	): IdInterface;
}
