import {TableResponseElementInterface} from "./interfaces/TableResponseElementInterface";
import {ComponentInterface} from "../components/interfaces/ComponentInterface";
import {RelationshipInterface} from "../relationships/interfaces/RelationshipInterface";
import {ContentInterface} from "./contents/interfaces/ContentInterface";

export class ResponseTableElement implements TableResponseElementInterface {
	public elements: Array<ContentInterface>;

	constructor(
		public component: ComponentInterface|undefined = undefined,
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
