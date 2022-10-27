import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RelationshipType} from "../../services/relationshipsService/enums/RelationshipType";
import {NewRelationshipsViewInterface} from "../interfaces/NewRelationshipsViewInterface";

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
