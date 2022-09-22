import {RecordType} from "../../enums/RecordType";
import {IdInterface} from "../data/IdInterface";

export interface IdFactoryInterface {
	create(
		type: RecordType,
		campaignId: number,
		adventureId?: number|undefined,
		sessionId?: number|undefined,
		sceneId?: number|undefined,
	): IdInterface|undefined;

	createFromTag(
		tag: string,
	): IdInterface|undefined;

	createFromTags(
		tags: Array<string>,
	): IdInterface|undefined;
}
