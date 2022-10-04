import {AbstractFactory} from "../abstracts/AbstractFactory";
import {RelationshipFactoryInterface} from "../interfaces/factories/RelationshipFactoryInterface";
import {RelationshipMetadataInterface} from "../database/interfaces/metadata/RelationshipMetadataInterface";
import {RelationshipInterface} from "../database/relationships/interfaces/RelationshipInterface";
import {Relationship} from "../database/relationships/Relationship";
import {RelationshipType} from "../database/relationships/enums/RelationshipType";
import {ComponentInterface} from "../database/interfaces/ComponentInterface";

export class RelationshipFactory extends AbstractFactory implements RelationshipFactoryInterface {
	createFromMetadata(
		relationship: RelationshipMetadataInterface,
	): RelationshipInterface {
		return new Relationship(
			this.factories.relationshipType.createRelationshipType(relationship.type),
			relationship.path,
			relationship.description,
		)
	}

	createFromReverse(
		component: ComponentInterface,
		relationship: RelationshipInterface,
	): RelationshipInterface|undefined {
		let reverseRelationshipType: RelationshipType|undefined = undefined;
		switch (relationship.type){
			case RelationshipType.Biunivocal:
			case RelationshipType.Univocal:
				reverseRelationshipType = RelationshipType.Reversed;
				break;
			case RelationshipType.Child:
				reverseRelationshipType = RelationshipType.Parent;
				break;
		}

		if (reverseRelationshipType === undefined) return undefined;

		return new Relationship(reverseRelationshipType, component.file.basename, undefined, component);
	}
}
