import {RecordType} from "../../enums/RecordType";
import {IdInterface} from "../data/IdInterface";

export interface IdFactoryInterface {
	create(
		type: RecordType,
		campaignId: string|number,
		adventureId?: string|number|undefined,
		actId?: string|number|undefined,
		sceneId?: string|number|undefined,
		existingTag?: string|undefined,
	): IdInterface;

	createFromTag(
		tag: string,
	): IdInterface;

	createFromTags(
		tags: Array<string>,
	): IdInterface;
}
