import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RelationshipType} from "../../services/relationshipsService/enums/RelationshipType";
import {NewRelationshipsViewInterface} from "../interfaces/NewRelationshipsViewInterface";
import {NewViewType} from "../../core/enums/NewViewType";

export abstract class NewAbstractRelationshipView implements NewRelationshipsViewInterface {
	public relatedComponentType: ComponentType;
	public relationshipType: RelationshipType;

	constructor(
		public model: ModelInterface,
		public containerEl: HTMLDivElement,
	) {
	}

	public abstract render(): void;
}
