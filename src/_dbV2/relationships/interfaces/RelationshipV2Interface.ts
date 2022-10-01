import {RelationshipV2Type} from "../enums/RelationshipV2Type";
import {ComponentV2Interface} from "../../interfaces/ComponentV2Interface";

export interface RelationshipV2Interface {
	type: RelationshipV2Type,
	path: string,
	description?: string|undefined,
	component?: ComponentV2Interface|undefined,
}
