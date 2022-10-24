import {NewViewInterface} from "./NewViewInterface";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RelationshipType} from "../../services/relationships/enums/RelationshipType";
import {ViewType} from "../../REFACTOR/views/enums/ViewType";
import {NewViewType} from "../../core/enums/NewViewType";

export interface NewRelationshipsViewInterface extends NewViewInterface {
	model: ComponentModelInterface;
	containerEl: HTMLElement;
	relatedComponentType: ComponentType;
	relationshipType: RelationshipType;
}
