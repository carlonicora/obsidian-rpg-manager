import {RelationshipV2Type} from "../enums/RelationshipV2Type";

export interface RelationshipV2Interface {
	type: RelationshipV2Type,
	path: string,
	description?: string|undefined,
}
