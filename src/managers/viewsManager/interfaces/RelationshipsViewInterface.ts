import {StaticViewInterface} from "../../staticViewsManager/interfaces/StaticViewInterface";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {RelationshipType} from "../../../services/relationshipsService/enums/RelationshipType";

export interface RelationshipsViewInterface extends StaticViewInterface {
	model: ModelInterface;
	containerEl: HTMLElement;
	relatedComponentType: ComponentType;
	relationshipType: RelationshipType|undefined;

	render(
	): void;
}
