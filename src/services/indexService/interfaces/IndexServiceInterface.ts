import {ComponentType} from "../../../core/enums/ComponentType";
import {IndexInterface} from "./IndexInterface";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";

export interface IndexServiceInterface {
	create(
		type: ComponentType,
		campaignId: string,
		adventureId?: string,
		actId?: string,
		sceneId?: string,
		sessionId?: string,
		positionInParent?: number,
		existingTag?: string,
		campaignSettings?: CampaignSetting,
	): IndexInterface;

	/*
	createFromTag(
		tag: string,
	): IndexInterface;

	createFromTags(
		tags: string[],
	): IndexInterface;
	*/

	createFromID(
		ID: string,
		checksum?: string,
	): IndexInterface;

	createUUID(
	): string;
}
