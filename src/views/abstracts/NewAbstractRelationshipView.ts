import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RelationshipType} from "../../services/relationships/enums/RelationshipType";
import {NewRelationshipsViewInterface} from "../interfaces/NewRelationshipsViewInterface";
import {NewViewType} from "../../core/enums/NewViewType";

export abstract class NewAbstractRelationshipView implements NewRelationshipsViewInterface {
	public relatedComponentType: ComponentType;
	public relationshipType: RelationshipType;

	constructor(
		public model: ComponentModelInterface,
		public containerEl: HTMLDivElement,
	) {
	}

	public abstract render(): void;
}
