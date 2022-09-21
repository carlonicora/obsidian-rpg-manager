import {AbstractFactory} from "../abstracts/AbstractFactory";
import {IdFactoryInterface} from "../interfaces/factories/IdFactoryInterface";
import {DataType} from "../enums/DataType";
import {IdInterface} from "../interfaces/data/IdInterface";
import {Id} from "../database/Id";

export class IdFactory extends AbstractFactory implements IdFactoryInterface {
	public create(
		type: DataType,
		campaignId: number,
		adventureId: number|undefined=undefined,
		sessionId: number|undefined=undefined,
		sceneId: number|undefined=undefined,
	): IdInterface {
		return new Id(this.app, type, campaignId, adventureId, sessionId, sceneId);
	}

	public createFromTag(
		tag: string,
	): IdInterface|undefined {
		const type: DataType|undefined = this.tagHelper.getDataType(tag);
		if (type === undefined) return undefined;

		const campaignId: number|undefined = this.tagHelper.getId(DataType.Campaign, tag);
		if (campaignId === undefined) return undefined;

		const adventureId: number|undefined = this.tagHelper.getId(DataType.Campaign, tag);
		const sessionId: number|undefined = this.tagHelper.getId(DataType.Campaign, tag);
		const sceneId: number|undefined = this.tagHelper.getId(DataType.Campaign, tag);

		return this.create(type, campaignId, adventureId, sessionId, sceneId)
	}

	public createFromTags(
		tags: Array<string>,
	): IdInterface|undefined {
		const tag: string|undefined = this.tagHelper.getTag(tags);
		if (tag === undefined) return undefined;

		return this.createFromTag(tag);
	}
}
