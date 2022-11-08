import {RelationshipType} from "../enums/RelationshipType";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";

export interface RelationshipInterface {
	type: RelationshipType,
	path: string,
	description?: string|undefined,
	component?: ModelInterface|undefined,
	isInContent: boolean,
	isAlsoInContent?: boolean,
}
