import { RelationshipType } from "src/enums/RelationshipType";

export type RelationshipData = {
	id: string;
	from: string;
	to: string;
	type: RelationshipType;
	descriptionFrom?: string;
	descriptionTo?: string;
};
