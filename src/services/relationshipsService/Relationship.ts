import {RelationshipInterface} from "./interfaces/RelationshipInterface";
import {RelationshipType} from "./enums/RelationshipType";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";

export class Relationship implements RelationshipInterface {
	constructor(
		public type: RelationshipType,
		public path: string,
		public description: string|undefined=undefined,
		public component: ModelInterface|undefined=undefined,
		public isInContent: boolean = false,
	) {
	}
}
