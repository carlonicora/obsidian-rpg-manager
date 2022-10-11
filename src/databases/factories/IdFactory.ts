import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {IdFactoryInterface} from "./interfaces/IdFactoryInterface";
import {ComponentType} from "../enums/ComponentType";
import {IdInterface} from "../interfaces/IdInterface";
import {Id} from "../Id";
import {Md5} from "ts-md5";

export class IdFactory extends AbstractFactory implements IdFactoryInterface {
	public create(
		type: ComponentType,
		campaignId: string|number|undefined,
		adventureId: string|number|undefined=undefined,
		actId: string|number|undefined=undefined,
		sceneId: string|number|undefined=undefined,
		sessionId: string|number|undefined=undefined,
		existingTag: string|undefined=undefined,
	): IdInterface {
		return new Id(
			this.app,
			type,
			this.convertIdElement(campaignId),
			this.convertIdElement(adventureId),
			this.convertIdElement(actId),
			this.convertIdElement(sceneId),
			this.convertIdElement(sessionId),
			existingTag,
		);
	}

	public createFromTag(
		tag: string,
	): IdInterface {
		const type: ComponentType|undefined = this.tagHelper.getDataType(tag);
		if (type === undefined) throw new Error('');

		const campaignId: string|undefined = this.tagHelper.getId(ComponentType.Campaign, tag);
		const adventureId: string|undefined = this.tagHelper.getId(ComponentType.Adventure, tag);
		const actId: string|undefined = this.tagHelper.getId(ComponentType.Act, tag);
		const sceneId: string|undefined = this.tagHelper.getId(ComponentType.Scene, tag);
		let sessionId: string | undefined = undefined;
		if (type === ComponentType.Session) {
			sessionId = this.tagHelper.getId(ComponentType.Session, tag);
		}

		return this.create(type, campaignId, adventureId, actId, sceneId, sessionId, tag);
	}

	public createFromTags(
		tags: Array<string>,
	): IdInterface {
		const tag: string|undefined = this.tagHelper.getTag(tags);
		if (tag === undefined) throw new Error('');

		return this.createFromTag(tag);
	}

	private convertIdElement(
		id: string|number|undefined,
	): string|undefined {
		if (id === undefined) return undefined;

		if (typeof id === "number") return id.toString();

		return id;
	}

	createFromID(
		ID: string,
		checksum?: string,
	): IdInterface {
		const [typeString, campaignSettings, ids] = ID.split('-');
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
