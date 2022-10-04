import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {RelationshipMetadataInterface} from "../../../metadatas/RelationshipMetadataInterface";
import {ComponentInterface} from "../../../databases/interfaces/ComponentInterface";

export interface RelationshipFactoryInterface {
	createFromMetadata(
		relationship: RelationshipMetadataInterface,
	): RelationshipInterface;

	createFromReverse(
		component: ComponentInterface,
		relationship: RelationshipInterface,
	): RelationshipInterface|undefined;
}
