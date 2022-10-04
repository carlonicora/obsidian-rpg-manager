import {RelationshipInterface} from "../../database/relationships/interfaces/RelationshipInterface";
import {RelationshipMetadataInterface} from "../../database/interfaces/metadata/RelationshipMetadataInterface";
import {ComponentInterface} from "../../database/interfaces/ComponentInterface";

export interface RelationshipFactoryInterface {
	createFromMetadata(
		relationship: RelationshipMetadataInterface,
	): RelationshipInterface;

	createFromReverse(
		component: ComponentInterface,
		relationship: RelationshipInterface,
	): RelationshipInterface|undefined;
}
