import {RelationshipInterface} from "./interfaces/RelationshipInterface";
import {RelationshipType} from "./enums/RelationshipType";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";

export class Relationship implements RelationshipInterface {
	constructor(
		public type: RelationshipType,
		public path: string,
		public description: string|undefined=undefined,
		public component: ComponentModelInterface|undefined=undefined,
		public isInContent: boolean = false,
	) {
	}
}
