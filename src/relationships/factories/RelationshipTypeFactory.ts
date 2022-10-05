import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {RelationshipTypeFactoryInterface} from "./interfaces/RelationshipTypeFactoryInterface";
import {RelationshipType} from "../enums/RelationshipType";

export class RelationshipTypeFactory extends AbstractFactory implements RelationshipTypeFactoryInterface {
	createRelationshipType(
		readableRelationshipType: string,
	): RelationshipType {
		readableRelationshipType = readableRelationshipType[0].toUpperCase() + readableRelationshipType.substring(1).toLowerCase();
		return RelationshipType[readableRelationshipType as keyof typeof RelationshipType];
	}

	createReadableRelationshipType(
		type: RelationshipType,
	): string {
		return RelationshipType[type].toString().toLowerCase();
	}
}
