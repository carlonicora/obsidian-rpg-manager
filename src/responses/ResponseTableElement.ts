import {TableResponseElementInterface} from "./interfaces/TableResponseElementInterface";
import {ComponentModelInterface} from "../api/componentManager/interfaces/ComponentModelInterface";
import {RelationshipInterface} from "../services/relationships/interfaces/RelationshipInterface";
import {ContentInterface} from "./contents/interfaces/ContentInterface";

export class ResponseTableElement implements TableResponseElementInterface {
	public elements: ContentInterface[];

	constructor(
		public component: ComponentModelInterface|undefined = undefined,
		public relationship: RelationshipInterface,
	) {
		this.elements = [];
	}

	public addElement(
		content: ContentInterface,
	): void {
		this.elements.push(content);
	}
}
