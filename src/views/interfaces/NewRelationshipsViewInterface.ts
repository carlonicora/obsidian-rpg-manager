import {ViewInterface} from "../../api/viewsManager/interfaces/ViewInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RelationshipType} from "../../services/relationshipsService/enums/RelationshipType";
import {ViewType} from "../../REFACTOR/views/enums/ViewType";
import {NewViewType} from "../../core/enums/NewViewType";

export interface NewRelationshipsViewInterface extends ViewInterface {
	model: ModelInterface;
	containerEl: HTMLElement;
	relatedComponentType: ComponentType;
	relationshipType: RelationshipType;
}
