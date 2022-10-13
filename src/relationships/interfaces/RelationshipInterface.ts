import {RelationshipType} from "../enums/RelationshipType";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";

export interface RelationshipInterface {
	type: RelationshipType,
	path: string,
	description?: string|undefined,
	component?: ComponentInterface|undefined,
	isInContent: boolean,
}
