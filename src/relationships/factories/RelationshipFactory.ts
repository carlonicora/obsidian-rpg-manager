import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {RelationshipFactoryInterface} from "./interfaces/RelationshipFactoryInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {Relationship} from "../Relationship";
import {RelationshipType} from "../enums/RelationshipType";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";
import {ComponentStage} from "../../components/enums/ComponentStage";
import {RelationshipListInterface} from "../interfaces/RelationshipListInterface";
import {
	ControllerMetadataRelationshipInterface
} from "../../controller/interfaces/ControllerMetadataRelationshipInterface";

export class RelationshipFactory extends AbstractFactory implements RelationshipFactoryInterface {
	public create(
		type: RelationshipType,
		path: string,
		description: string|undefined = undefined,
		component: ComponentInterface|undefined = undefined,
		isInContent = false,
		existingRelationships:RelationshipListInterface|undefined = undefined,
	): RelationshipInterface {
		const response = new Relationship(
			type,
			path,
			description,
			component,
			isInContent,
		);

		if (existingRelationships !== undefined) existingRelationships.add(response);

		return response;
	}

	public createFromMetadata(
		relationship: ControllerMetadataRelationshipInterface,
		existingRelationships:RelationshipListInterface|undefined = undefined,
	): RelationshipInterface {
		const response = new Relationship(
			(relationship.type !== undefined ? this.factories.relationshipType.createRelationshipType(relationship.type) : RelationshipType.Undefined),
			relationship.path,
			relationship.description,
			undefined,
			relationship.isInContent ?? false,
		);

		if (existingRelationships !== undefined) existingRelationships.add(response);

		return response;
	}

	public createFromReverse(
		component: ComponentInterface,
		relationship: RelationshipInterface,
	): RelationshipInterface|undefined {
		if (component.stage === ComponentStage.Plot || component.stage === ComponentStage.Run) return undefined;
		if (relationship.component !== null && component.file.path === relationship.component?.file.path) return undefined;

		let reverseRelationshipType: RelationshipType|undefined = undefined;
		switch (relationship.type){
			case RelationshipType.Bidirectional:
				reverseRelationshipType = RelationshipType.Reversed;
				break;
			case RelationshipType.Child:
				reverseRelationshipType = RelationshipType.Parent;
				break;
		}

		if (reverseRelationshipType === undefined) return undefined;

		const response = new Relationship(reverseRelationshipType, component.file.path, undefined, component, true);

		if (relationship.component !== undefined) relationship.component.getRelationships().add(response);

		return response;
	}
}
