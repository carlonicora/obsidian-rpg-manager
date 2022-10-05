import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {RelationshipMetadataInterface} from "../../../metadatas/relationships/RelationshipMetadataInterface";
import {ComponentInterface} from "../../../databases/interfaces/ComponentInterface";
import {RelationshipType} from "../../enums/RelationshipType";
import {RelationshipListInterface} from "../../interfaces/RelationshipListInterface";

export interface RelationshipFactoryInterface {
	addRelationshipToExistingRelationships(
		relationship: RelationshipInterface,
		existingRelationships?: RelationshipListInterface,
	): void;

	create(
		type: RelationshipType,
		path: string,
		description?: string,
		component?: ComponentInterface,
		existingRelationships?: RelationshipListInterface,
	): RelationshipInterface;

	createFromMetadata(
		relationship: RelationshipMetadataInterface,
		existingRelationships?: RelationshipListInterface,
	): RelationshipInterface;

	createFromReverse(
		component: ComponentInterface,
		relationship: RelationshipInterface,
	): RelationshipInterface|undefined;
}
