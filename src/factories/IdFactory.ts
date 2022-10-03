import {AbstractFactory} from "../abstracts/AbstractFactory";
import {IdFactoryInterface} from "../interfaces/factories/IdFactoryInterface";
import {ComponentType} from "../enums/ComponentType";
import {IdInterface} from "../interfaces/IdInterface";
import {Id} from "../database/Id";

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
}
