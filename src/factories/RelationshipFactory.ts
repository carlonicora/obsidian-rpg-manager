import { RelationshipType } from "src/data/enums/RelationshipType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RelationshipInterface } from "src/data/interfaces/RelationshipInterface";

export class RelationshipFactory {
	/**
	 * Create a RelationshipInterface object from a given RPG manager block.
	 *
	 * @param {any} relationshipDefinition - The relationship definition.
	 * @return {RelationshipInterface | undefined} The created RelationshipInterface object, or undefined if the relationship type is not valid.
	 */
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

	/**
	 * Creates a new RelationshipInterface object based on the given RelationshipType and ElementInterface.
	 *
	 * @param {RelationshipType} type - The type of the relationship.
	 * @param {ElementInterface} element - The element to create the relationship from.
	 * @return {RelationshipInterface} The created RelationshipInterface object.
	 */
	static createFromElement(type: RelationshipType, element: ElementInterface): RelationshipInterface {
		return {
			type: type,
			path: element.path,
			isInContent: false,
		};
	}

	/**
	 * Creates a RelationshipInterface object from the given type and path.
	 *
	 * @param {RelationshipType} type - The type of the relationship.
	 * @param {string} path - The path of the relationship.
	 * @return {RelationshipInterface} A RelationshipInterface object with the specified type, path, and isInContent value set to false.
	 */
	static createFromCodeblock(type: RelationshipType, path: string): RelationshipInterface {
		return {
			type: type,
			path: path,
			isInContent: false,
		};
	}

	/**
	 * Creates a RelationshipInterface object based on the provided type and path.
	 *
	 * @param {RelationshipType} type - The type of the relationship.
	 * @param {string} path - The path of the relationship.
	 * @return {RelationshipInterface} - The created RelationshipInterface object.
	 */
	static createFromContent(type: RelationshipType, path: string): RelationshipInterface {
		return {
			type: type,
			path: path,
			isInContent: true,
		};
	}

	/**
	 * Creates a reverse relationship based on the given relationship and element.
	 * 
	 * @param relationship - The original relationship.
	 * @param element - The element associated with the relationship.
	 * @returns The reverse relationship or undefined if the original relationship is unidirectional.
	 */
	static createFromReverse(
		relationship: RelationshipInterface,
		element: ElementInterface
	): RelationshipInterface | undefined {
		if (relationship.type === RelationshipType.Unidirectional) return undefined;

		let reverseRelationshipType: RelationshipType = RelationshipType.Bidirectional;

		// Determine the reverse relationship type based on the original relationship type
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

		// Create the reverse relationship object
		return {
			type: reverseRelationshipType,
			path: element.path,
			component: element,
			isInContent: relationship.isInContent,
			isAlsoInContent: relationship.isAlsoInContent,
		};
	}
}
