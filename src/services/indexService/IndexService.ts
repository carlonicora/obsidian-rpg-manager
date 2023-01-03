import {IndexServiceInterface} from "./interfaces/IndexServiceInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {IndexInterface} from "./interfaces/IndexInterface";
import {Index} from "./Index";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {IndexDataInterface} from "./interfaces/IndexDataInterface";
import {v4 as uuidv4} from "uuid";

export class IndexService extends AbstractService implements IndexServiceInterface, ServiceInterface {
	public create(
		type: ComponentType,
		id: string,
		campaignId: string,
		parentId: string,
		positionInParent?: number,
		campaignSettings?: CampaignSetting,
	): IndexInterface {
		const response = new Index(
			this.api,
			type,
			id,
			campaignId,
			parentId,
		);

		if (positionInParent !== undefined)
			response.positionInParent = positionInParent;

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
			index.parentId,
			index.positionInParent,
			index.campaignSettings,
		);

		return response;
	}

	public createUUID(
	): string {
		return uuidv4();
	}
}
