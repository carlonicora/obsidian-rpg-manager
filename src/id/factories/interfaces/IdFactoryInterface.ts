import {ComponentType} from "../../../components/enums/ComponentType";
import {IdInterface} from "../../interfaces/IdInterface";
import {CampaignSetting} from "../../../components/components/campaign/enums/CampaignSetting";

export interface IdFactoryInterface {
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
		tags: Array<string>,
	): IdInterface;

	createFromID(
		ID: string,
		checksum?: string,
	): IdInterface;
}
