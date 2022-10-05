import {AbstractFactory} from "../../abstracts/AbstractFactory";
import {RelationshipFactoryInterface} from "./interfaces/RelationshipFactoryInterface";
import {RelationshipMetadataInterface} from "../../metadatas/relationships/RelationshipMetadataInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {Relationship} from "../Relationship";
import {RelationshipType} from "../enums/RelationshipType";
import {ComponentInterface} from "../../databases/interfaces/ComponentInterface";
import {ComponentStage} from "../../databases/components/enums/ComponentStage";
import {RelationshipListInterface} from "../interfaces/RelationshipListInterface";

export class RelationshipFactory extends AbstractFactory implements RelationshipFactoryInterface {
	public addRelationshipToExistingRelationships(
		relationship: RelationshipInterface,
		existingRelationships:RelationshipListInterface,
	): void {
		if (relationship.component !== undefined && !existingRelationships.existsAlready(relationship.component)) existingRelationships.add(relationship);
	}

	public create(
		type: RelationshipType,
		path: string,
		description: string|undefined = undefined,
		component: ComponentInterface|undefined = undefined,
		existingRelationships:RelationshipListInterface|undefined = undefined,
	): RelationshipInterface {
		const response = new Relationship(
			type,
			path,
			description,
			component,
		);

		if (existingRelationships !== undefined) this.addRelationshipToExistingRelationships(response, existingRelationships);

		return response;
	}

	public createFromMetadata(
		relationship: RelationshipMetadataInterface,
		existingRelationships:RelationshipListInterface|undefined = undefined,
	): RelationshipInterface {
		const response = new Relationship(
			this.factories.relationshipType.createRelationshipType(relationship.type),
			relationship.path,
			relationship.description,
		);

		if (existingRelationships !== undefined) this.addRelationshipToExistingRelationships(response, existingRelationships);

		return response;
	}

	public createFromReverse(
		component: ComponentInterface,
		relationship: RelationshipInterface,
	): RelationshipInterface|undefined {
		if (component.stage === ComponentStage.Plot || component.stage === ComponentStage.Run) return undefined;

		let reverseRelationshipType: RelationshipType|undefined = undefined;
		switch (relationship.type){
			case RelationshipType.Biunivocal:
				reverseRelationshipType = RelationshipType.Reversed;
				break;
			case RelationshipType.Child:
				reverseRelationshipType = RelationshipType.Parent;
				break;
		}

		if (reverseRelationshipType === undefined) return undefined;

		const response = new Relationship(reverseRelationshipType, component.file.path, undefined, component);

		if (relationship.component !== undefined) {
			this.addRelationshipToExistingRelationships(response, relationship.component.getRelationships());
		}

		return response;
	}
}
