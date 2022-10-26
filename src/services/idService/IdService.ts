import {IdServiceInterface} from "./interfaces/IdServiceInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {IdInterface} from "./interfaces/IdInterface";
import {Id} from "./Id";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {AbstractService} from "../../api/servicesManager/abstracts/AbstractService";
import {ServiceInterface} from "../../api/servicesManager/interfaces/ServiceInterface";
import {TagService} from "../tagService/TagService";

export class IdService extends AbstractService implements IdServiceInterface, ServiceInterface {
	public create(
		type: ComponentType,
		campaignId: string|number|undefined,
		adventureId: string|number|undefined=undefined,
		actId: string|number|undefined=undefined,
		sceneId: string|number|undefined=undefined,
		sessionId: string|number|undefined=undefined,
		existingTag: string|undefined=undefined,
		campaignSettings: CampaignSetting|undefined=undefined,
	): IdInterface {
		const response = new Id(
			this.api.app,
			type,
			this._convertIdElement(campaignId),
			this._convertIdElement(adventureId),
			this._convertIdElement(actId),
			this._convertIdElement(sceneId),
			this._convertIdElement(sessionId),
			existingTag,
		);

		if (campaignSettings !== undefined) response.campaignSettings = campaignSettings;

		return response;
	}

	public createFromTag(
		tag: string,
	): IdInterface {
		const type: ComponentType|undefined = this.api.service(TagService).getDataType(tag);
		if (type === undefined) throw new Error('');

		const campaignId: string|undefined = this.api.service(TagService).getId(ComponentType.Campaign, tag);
		const adventureId: string|undefined = this.api.service(TagService).getId(ComponentType.Adventure, tag);
		const actId: string|undefined = this.api.service(TagService).getId(ComponentType.Act, tag);
		const sceneId: string|undefined = this.api.service(TagService).getId(ComponentType.Scene, tag);
		let sessionId: string | undefined = undefined;
		if (type === ComponentType.Session) {
			sessionId = this.api.service(TagService).getId(ComponentType.Session, tag);
		}

		return this.create(type, campaignId, adventureId, actId, sceneId, sessionId, tag);
	}

	public createFromTags(
		tags: string[],
	): IdInterface {
		const tag: string|undefined = this.api.service(TagService).getTag(tags);
		if (tag === undefined) throw new Error('');

		return this.createFromTag(tag);
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
	): IdInterface {
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
}
