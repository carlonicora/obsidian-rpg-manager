import {RelationshipInterface} from "../../src/services/relationshipsService/interfaces/RelationshipInterface";
import {ModelInterface} from "../../src/managers/modelsManager/interfaces/ModelInterface";

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
