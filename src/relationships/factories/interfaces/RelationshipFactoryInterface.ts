import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";
import {RelationshipType} from "../../enums/RelationshipType";
import {RelationshipListInterface} from "../../interfaces/RelationshipListInterface";
import {
	ControllerMetadataRelationshipInterface
} from "../../../controller/interfaces/ControllerMetadataRelationshipInterface";

export interface RelationshipFactoryInterface {
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
