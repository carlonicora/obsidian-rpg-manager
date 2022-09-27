import {ComponentInterface} from "./database/ComponentInterface";
import {RelationshipType} from "../enums/RelationshipType";

export interface RelationshipInterface {
	component?: ComponentInterface|undefined,
	description: string,
	type: RelationshipType,
}
