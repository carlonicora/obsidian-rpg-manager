import {RelationshipInterface} from "./interfaces/RelationshipInterface";
import {RelationshipType} from "./enums/RelationshipType";
import {ComponentInterface} from "../databases/interfaces/ComponentInterface";

export class Relationship implements RelationshipInterface {
	constructor(
		public type: RelationshipType,
		public path: string,
		public description: string|undefined=undefined,
		public component: ComponentInterface|undefined=undefined,
		public isInContent: boolean = false,
	) {
	}
}
