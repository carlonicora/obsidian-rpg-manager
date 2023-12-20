import { RelationshipLocation } from "src/enums/RelationshipLocation";
import { RelationshipType } from "src/enums/RelationshipType";
import { Element } from "./Element";
import { RelationshipData } from "./RelationshipData";

export type Relationship = {
	data: RelationshipData;

	get id(): string;
	get from(): Element;
	get to(): Element;
	get type(): RelationshipType;
	get location(): RelationshipLocation;
	get description(): string | undefined;

	addContentRelationships: () => void;
};
