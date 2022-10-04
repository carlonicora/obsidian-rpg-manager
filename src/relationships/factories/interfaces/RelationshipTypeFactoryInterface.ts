import {RelationshipType} from "../../enums/RelationshipType";

export interface RelationshipTypeFactoryInterface {
	createRelationshipType(
		readableRelationshipType: string,
	): RelationshipType;

	createReadableRelationshipType(
		type: RelationshipType,
	): string;
}
