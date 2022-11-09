import {RelationshipType} from "../enums/RelationshipType";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {RelationshipListInterface} from "./RelationshipListInterface";
import {RelationshipInterface} from "./RelationshipInterface";
import {
	ControllerMetadataRelationshipInterface
} from "../../../managers/controllerManager/interfaces/ControllerMetadataRelationshipInterface";
import {TableField} from "../enums/TableField";
import {
	ControllerMetadataDataInterface
} from "../../../managers/controllerManager/interfaces/ControllerMetadataDataInterface";
import {ComponentStage} from "../../../core/enums/ComponentStage";

export interface RelationshipServiceInterface {
	addRelationshipsFromContent(
		fileContent: string,
		metadata: ControllerMetadataDataInterface,
		stage: ComponentStage,
	): Promise<void>;

	createRelationship(
		type: RelationshipType,
		path: string,
		description?: string,
		component?: ModelInterface,
		isInContent?: boolean,
		existingRelationships?: RelationshipListInterface,
	): RelationshipInterface;

	createRelationshipFromMetadata(
		relationship: ControllerMetadataRelationshipInterface,
	): RelationshipInterface;

	createRelationshipFromReverse(
		component: ModelInterface,
		relationship: RelationshipInterface,
	): RelationshipInterface|undefined;

	getComponentTypeFromListName(
		listName: string,
	): ComponentType;

	getReadableRelationshipType(
		type: RelationshipType,
	): string;

	getTypeFromString(
		readableRelationshipType: string,
	): RelationshipType;

	getTableFields(
		relationshipComponentType: ComponentType,
	): TableField[];

	getTableFieldInline(
		relationshipComponentType: ComponentType,
		field: TableField,
	): boolean;
}
