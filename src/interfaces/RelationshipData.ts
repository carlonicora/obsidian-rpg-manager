import { RelationshipType } from "src/enums/RelationshipType";

export type RelationshipData = {
	from: string;
	fromLocation: number;
	to: string;
	toLocation: number;
	type: RelationshipType;
	descriptionFrom?: string;
	descriptionTo?: string;
};
