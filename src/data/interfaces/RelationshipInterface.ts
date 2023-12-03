import { RelationshipType } from "../enums/RelationshipType";
import { ElementInterface } from "./ElementInterface";

export interface RelationshipInterface {
	type: RelationshipType;
	id: string;
	description?: string | undefined;
	component?: ElementInterface | undefined;
	isInContent: boolean;
	isAlsoInContent?: boolean;
}
