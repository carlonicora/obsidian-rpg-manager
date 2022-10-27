import {ViewInterface} from "../../managers/viewsManager/interfaces/ViewInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RelationshipType} from "../../services/relationshipsService/enums/RelationshipType";

export interface NewRelationshipsViewInterface extends ViewInterface {
	model: ModelInterface;
	containerEl: HTMLElement;
	relatedComponentType: ComponentType;
	relationshipType: RelationshipType;
}
