import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {ComponentModelInterface} from "../../../../api/componentManager/interfaces/ComponentModelInterface";
import {RelationshipType} from "../../enums/RelationshipType";
import {RelationshipListInterface} from "../../interfaces/RelationshipListInterface";
import {
	ControllerMetadataRelationshipInterface
} from "../../../../core/controller/interfaces/ControllerMetadataRelationshipInterface";

export interface RelationshipFactoryInterface {
	create(
		type: RelationshipType,
		path: string,
		description?: string,
		component?: ComponentModelInterface,
		isInContent?: boolean,
		existingRelationships?: RelationshipListInterface,
	): RelationshipInterface;

	createFromMetadata(
		relationship: ControllerMetadataRelationshipInterface,
		existingRelationships?: RelationshipListInterface,
	): RelationshipInterface;

	createFromReverse(
		component: ComponentModelInterface,
		relationship: RelationshipInterface,
	): RelationshipInterface|undefined;
}
