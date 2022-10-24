import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RelationshipType} from "../../services/relationships/enums/RelationshipType";
import {NewRelationshipsViewInterface} from "../interfaces/NewRelationshipsViewInterface";
import {NewViewType} from "../../core/enums/NewViewType";

export abstract class NewAbstractRelationshipView implements NewRelationshipsViewInterface {
	constructor(
		public model: ComponentModelInterface,
		public relatedType: ComponentType,
		public relationshipType: RelationshipType,
		public containerEl: HTMLDivElement,
	) {
	}

	get type(): NewViewType {
		return NewViewType.Relationships;
	}

	public abstract render(): void;
}
