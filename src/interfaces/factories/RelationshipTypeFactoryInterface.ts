import {RelationshipType} from "../../database/relationships/enums/RelationshipType";

export interface RelationshipTypeFactoryInterface {
	createRelationshipType(
		readableRelationshipType: string,
	): RelationshipType;

	createReadableRelationshipType(
		type: RelationshipType,
	): string;
}
