import {RelationshipType} from "../enums/RelationshipType";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";

export interface RelationshipInterface {
	component?: ComponentV2Interface|undefined,
	description: string,
	type: RelationshipType,
}
