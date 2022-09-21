import {DataType} from "../../enums/DataType";
import {IdInterface} from "../data/IdInterface";

export interface IdFactoryInterface {create(
		type: DataType,
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
