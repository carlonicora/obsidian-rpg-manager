import {IndexServiceInterface} from "./interfaces/IndexServiceInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {IndexInterface} from "./interfaces/IndexInterface";
import {Index} from "./Index";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {randomUUID} from "crypto";
import {IndexDataInterface} from "./interfaces/IndexDataInterface";

export class IndexService extends AbstractService implements IndexServiceInterface, ServiceInterface {
	//TODO Remove existingTag
	public create(
		type: ComponentType,
		id: string,
		campaignId: string,
		adventureId?: string,
		actId?: string,
		sceneId?: string,
		sessionId?: string,
		positionInParent?: number,
		existingTag?: string,
		campaignSettings?: CampaignSetting,
	): IndexInterface {
		const response = new Index(
			this.api,
			type,
			id,
			campaignId,
			adventureId,
			actId,
			sceneId,
			sessionId,
			existingTag,
		);

		if (campaignSettings !== undefined)
			response.campaignSettings = campaignSettings;

		return response;
	}

	createFromIndex(
		index: IndexDataInterface,
	): IndexInterface {
		const response = this.create(
			index.type,
			index.id,
			index.campaignId,
			index.adventureId,
			index.actId,
			index.sceneId,
			index.sessionId,
			index.positionInParent,
			undefined,
			index.campaignSettings,
		);

		return response;
	}

	public createUUID(
	): string {
		return randomUUID();
	}
}
