import { RpgManagerRelationship } from "src/data/RpgManagerRelationship";
import { RelationshipLocation } from "src/enums/RelationshipLocation";
import { RelationshipType } from "src/enums/RelationshipType";
import { RPGManager } from "src/interfaces/RPGManager";
import { Relationship } from "src/interfaces/Relationship";
import { RelationshipData } from "src/interfaces/RelationshipData";

export class RelationshipFactory {
	static create(data: RelationshipData, api: RPGManager): Relationship[] {
		const response: Relationship[] = [];

		response.push(new RpgManagerRelationship(data, api, true, RelationshipLocation.OnlyMetadata));

		if (data.type !== RelationshipType.Unidirectional)
			response.push(new RpgManagerRelationship(data, api, false, RelationshipLocation.OnlyMetadata));

		return response;
	}
}
