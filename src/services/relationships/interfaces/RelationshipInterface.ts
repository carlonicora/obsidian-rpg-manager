import {RelationshipType} from "../enums/RelationshipType";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";

export interface RelationshipInterface {
	type: RelationshipType,
	path: string,
	description?: string|undefined,
	component?: ComponentModelInterface|undefined,
	isInContent: boolean,
}
