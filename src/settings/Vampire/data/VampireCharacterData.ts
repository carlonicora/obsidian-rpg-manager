import {CharacterData} from "../../Agnostic/data";
import {Api} from "../../../Api";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";

export class VampireCharacterData extends CharacterData {
	constructor(
		api: Api,
		data: Record<string, any>,
		campaign: CampaignDataInterface,
		useAdditionalInformation: string|null = null,
	) {
		super(api, data, campaign, useAdditionalInformation);
	}
}
