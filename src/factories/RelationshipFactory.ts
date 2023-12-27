import { RpgManagerRelationship } from "src/data/RpgManagerRelationship";
import { RPGManager } from "src/interfaces/RPGManager";
import { Relationship } from "src/interfaces/Relationship";
import { RelationshipData } from "src/interfaces/RelationshipData";

export class RelationshipFactory {
	static create(data: RelationshipData, api: RPGManager): Relationship {
		return new RpgManagerRelationship(data, api, true);
	}
}
