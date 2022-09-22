import {AbstractFactory} from "../abstracts/AbstractFactory";
import {IdFactoryInterface} from "../interfaces/factories/IdFactoryInterface";
import {RecordType} from "../enums/RecordType";
import {IdInterface} from "../interfaces/data/IdInterface";
import {Id} from "../database/Id";

export class IdFactory extends AbstractFactory implements IdFactoryInterface {
	public create(
		type: RecordType,
		campaignId: string|number|undefined,
		adventureId: string|number|undefined=undefined,
		sessionId: string|number|undefined=undefined,
		sceneId: string|number|undefined=undefined,
		existingTag: string|undefined=undefined,
	): IdInterface {
		return new Id(
			this.app,
			type,
			this.convertIdElement(campaignId),
			this.convertIdElement(adventureId),
			this.convertIdElement(sessionId),
			this.convertIdElement(sceneId),
			existingTag,
		);
	}

	public createFromTag(
		tag: string,
	): IdInterface|undefined {
		const type: RecordType|undefined = this.tagHelper.getDataType(tag);
		if (type === undefined) return undefined;

		const campaignId: string|undefined = this.tagHelper.getId(RecordType.Campaign, tag);
		const adventureId: string|undefined = this.tagHelper.getId(RecordType.Adventure, tag);
		const sessionId: string|undefined = this.tagHelper.getId(RecordType.Session, tag);
		const sceneId: string|undefined = this.tagHelper.getId(RecordType.Scene, tag);

		return this.create(type, campaignId, adventureId, sessionId, sceneId, tag);
	}

	public createFromTags(
		tags: Array<string>,
	): IdInterface|undefined {
		const tag: string|undefined = this.tagHelper.getTag(tags);
		if (tag === undefined) return undefined;

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
