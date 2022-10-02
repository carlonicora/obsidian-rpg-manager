import {RelationshipV2Type} from "../../_dbV2/relationships/enums/RelationshipV2Type";

export interface RelationshipTypeFactoryInterface {
	createRelationshipType(
		readableRelationshipType: string,
	): RelationshipV2Type;

	createReadableRelationshipType(
		type: RelationshipV2Type,
	): string;
}
