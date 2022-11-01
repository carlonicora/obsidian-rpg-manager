import {StaticViewInterface} from "../../staticViewsManager/interfaces/StaticViewInterface";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {RelationshipType} from "../../../services/relationshipsService/enums/RelationshipType";
import {RelationshipListInterface} from "../../../services/relationshipsService/interfaces/RelationshipListInterface";

export interface RelationshipsViewInterface extends StaticViewInterface {
	model: ModelInterface;
	containerEl: HTMLElement;
	relatedComponentType: ComponentType;
	relationshipType: RelationshipType|undefined;

	render(
		alternativeRelationships?: RelationshipListInterface,
	): void;
}
