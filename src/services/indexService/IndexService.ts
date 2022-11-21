import {IndexServiceInterface} from "./interfaces/IndexServiceInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {IndexInterface} from "./interfaces/IndexInterface";
import {Index} from "./Index";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {randomUUID} from "crypto";

export class IndexService extends AbstractService implements IndexServiceInterface, ServiceInterface {
	public create(
		type: ComponentType,
		campaignId?: string,
		adventureId?: string,
		actId?: string,
		sceneId?: string,
		sessionId?: string,
		positionInParent?: number,
		existingTag: string|undefined=undefined,
		campaignSettings: CampaignSetting|undefined=undefined,
	): IndexInterface {
		const response = new Index(
			this.api,
			type,
			this._convertIdElement(campaignId),
			this._convertIdElement(adventureId),
			this._convertIdElement(actId),
			this._convertIdElement(sceneId),
			this._convertIdElement(sessionId),
			existingTag,
		);

		if (campaignSettings !== undefined)
			response.campaignSettings = campaignSettings;

		return response;
	}

	private _convertIdElement(
		id: string|number|undefined,
	): string|undefined {
		if (id === undefined) return undefined;

		if (typeof id === "number") return id.toString();

		return id;
	}

	createFromID(
		id: string,
		checksum?: string,
	): IndexInterface {
		const [typeString, campaignSettings, ids] = id.split('-');
		const [campaignId, adventureIdOrSessionId, actId, sceneId] = ids.split('/');
		const type: ComponentType = +typeString;

		const adventureId = (adventureIdOrSessionId !== undefined  && type !== ComponentType.Session ? adventureIdOrSessionId : undefined);
		const sessionId = (adventureIdOrSessionId !== undefined  && type === ComponentType.Session ? adventureIdOrSessionId : undefined);

		const response = this.create(
			type,
			campaignId,
			adventureId,
			actId,
			sceneId,
			sessionId,
		);

		response.campaignSettings = +campaignSettings;

		return response;
	}

	public createUUID(
	): string {
		return randomUUID();
	}
}
