import {RecordType} from "../../enums/RecordType";
import {IdInterface} from "../data/IdInterface";

export interface IdFactoryInterface {
	create(
		type: RecordType,
		campaignId: string|number,
		adventureId?: string|number|undefined,
		sessionId?: string|number|undefined,
		sceneId?: string|number|undefined,
		existingTag?: string|undefined,
	): IdInterface|undefined;

	createFromTag(
		tag: string,
	): IdInterface|undefined;

	createFromTags(
		tags: Array<string>,
	): IdInterface|undefined;
}
