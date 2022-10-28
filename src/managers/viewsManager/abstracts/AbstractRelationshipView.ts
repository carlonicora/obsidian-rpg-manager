import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {RelationshipType} from "../../../services/relationshipsService/enums/RelationshipType";
import {NewRelationshipsViewInterface} from "../interfaces/NewRelationshipsViewInterface";

export abstract class AbstractRelationshipView implements NewRelationshipsViewInterface {
	public relatedComponentType: ComponentType;
	public relationshipType: RelationshipType;

	constructor(
		public model: ModelInterface,
		public containerEl: HTMLDivElement,
	) {
	}

	public abstract render(): void;
}
