import {TableResponseElementInterface} from "./interfaces/TableResponseElementInterface";
import {ModelInterface} from "../api/modelsManager/interfaces/ModelInterface";
import {RelationshipInterface} from "../services/relationshipsService/interfaces/RelationshipInterface";
import {ContentInterface} from "./contents/interfaces/ContentInterface";

export class ResponseTableElement implements TableResponseElementInterface {
	public elements: ContentInterface[];

	constructor(
		public component: ModelInterface|undefined = undefined,
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
