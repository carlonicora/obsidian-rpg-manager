import {RelationshipV2Interface} from "./interfaces/RelationshipV2Interface";
import {RelationshipV2Type} from "./enums/RelationshipV2Type";
import {ComponentV2Interface} from "../interfaces/ComponentV2Interface";

export class RelationshipV2 implements RelationshipV2Interface {
	constructor(
		public type: RelationshipV2Type,
		public path: string,
		public description: string|undefined=undefined,
		public component: ComponentV2Interface|undefined=undefined,
	) {
	}
}
