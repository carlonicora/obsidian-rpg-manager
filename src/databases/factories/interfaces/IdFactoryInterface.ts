import {ComponentType} from "../../enums/ComponentType";
import {IdInterface} from "../../interfaces/IdInterface";

export interface IdFactoryInterface {
	create(
		type: ComponentType,
		campaignId: string|number,
		adventureId?: string|number|undefined,
		actId?: string|number|undefined,
		sceneId?: string|number|undefined,
		sessionId?: string|number|undefined,
		existingTag?: string|undefined,
	): IdInterface;

	createFromTag(
		tag: string,
	): IdInterface;

	createFromTags(
		tags: Array<string>,
	): IdInterface;
}
