import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {ComponentInterface} from "../../../databases/interfaces/ComponentInterface";
import {RelationshipType} from "../../enums/RelationshipType";
import {RelationshipListInterface} from "../../interfaces/RelationshipListInterface";
import {
	ControllerMetadataRelationshipInterface
} from "../../../metadatas/controllers/ControllerMetadataRelationshipInterface";

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
		isInContent?: boolean,
		existingRelationships?: RelationshipListInterface,
	): RelationshipInterface;

	createFromMetadata(
		relationship: ControllerMetadataRelationshipInterface,
		existingRelationships?: RelationshipListInterface,
	): RelationshipInterface;

	createFromReverse(
		component: ComponentInterface,
		relationship: RelationshipInterface,
	): RelationshipInterface|undefined;
}
