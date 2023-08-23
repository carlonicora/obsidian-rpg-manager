import { RelationshipType } from "src/data/enums/RelationshipType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RelationshipInterface } from "src/data/interfaces/RelationshipInterface";

export class RelationshipFactory {
	static createFromRpgManagerBlock(relationshipDefinition: any): RelationshipInterface | undefined {
		const relationshipName = relationshipDefinition.type.charAt(0).toUpperCase() + relationshipDefinition.type.slice(1);
		const relationshipType = RelationshipType[relationshipName as keyof typeof RelationshipType];

		if (relationshipType === undefined) return undefined;

		const response: RelationshipInterface = {
			type: relationshipType,
			path: relationshipDefinition.path,
			isInContent: false,
		};

		if (relationshipDefinition.description !== undefined) response.description = relationshipDefinition.description;

		return response;
	}

	static createFromElement(type: RelationshipType, element: ElementInterface): RelationshipInterface {
		return {
			type: type,
			path: element.path,
			isInContent: false,
		};
	}

	static createFromContent(type: RelationshipType, path: string): RelationshipInterface {
		return {
			type: type,
			path: path,
			isInContent: true,
		};
	}

	static createFromReverse(
		relationship: RelationshipInterface,
		element: ElementInterface
	): RelationshipInterface | undefined {
		if (relationship.type === RelationshipType.Unidirectional) return undefined;

		let reverseRelationshipType: RelationshipType = RelationshipType.Bidirectional;
		switch (relationship.type) {
			case RelationshipType.Child:
				reverseRelationshipType = RelationshipType.Parent;
				break;
			case RelationshipType.Parent:
				reverseRelationshipType = RelationshipType.Child;
				break;
			case RelationshipType.Bidirectional:
				reverseRelationshipType = RelationshipType.Reversed;
				break;
		}

		return {
			type: reverseRelationshipType,
			path: element.path,
			component: element,
			isInContent: relationship.isInContent,
			isAlsoInContent: relationship.isAlsoInContent,
		};
	}
}
