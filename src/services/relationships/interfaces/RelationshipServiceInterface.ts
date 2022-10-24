import {RelationshipType} from "../enums/RelationshipType";
import {ComponentType} from "../../../core/enums/ComponentType";

export interface RelationshipServiceInterface {
	getComponentTypeFromListName(
		listName: string,
	): ComponentType;

	getReadableRelationshipType(
		type: RelationshipType,
	): string;

	getTypeFromString(
		readableRelationshipType: string,
	): RelationshipType;
}
