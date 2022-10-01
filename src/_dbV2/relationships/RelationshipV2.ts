import {RelationshipV2Interface} from "./interfaces/RelationshipV2Interface";
import {RelationshipV2Type} from "./enums/RelationshipV2Type";

export class RelationshipV2 implements RelationshipV2Interface {
	constructor(
		public type: RelationshipV2Type,
		public path: string,
		public description: string|undefined=undefined,
	) {
	}
}
