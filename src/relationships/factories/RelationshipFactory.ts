import {AbstractFactory} from "../../abstracts/AbstractFactory";
import {RelationshipFactoryInterface} from "./interfaces/RelationshipFactoryInterface";
import {RelationshipMetadataInterface} from "../../metadatas/relationships/RelationshipMetadataInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {Relationship} from "../Relationship";
import {RelationshipType} from "../enums/RelationshipType";
import {ComponentInterface} from "../../databases/interfaces/ComponentInterface";

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
