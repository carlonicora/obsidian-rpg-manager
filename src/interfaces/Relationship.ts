import { RelationshipLocation } from "src/enums/RelationshipLocation";
import { RelationshipType } from "src/enums/RelationshipType";
import { Element } from "./Element";
import { RelationshipData } from "./RelationshipData";

export type Relationship = {
	data: RelationshipData;

	get from(): Element;
	get to(): Element;
	get type(): RelationshipType;
	get description(): string | undefined;
	get fromHasNoLocation(): boolean;
	get toHasNoLocation(): boolean;

	fromContainsLocation: (location: RelationshipLocation) => boolean;
	toContainsLocation: (location: RelationshipLocation) => boolean;
	addContentRelationships: () => void;
};
