import {ServiceInterface} from "../../api/servicesManager/interfaces/ServiceInterface";
import {RelationshipType} from "./enums/RelationshipType";
import {RelationshipServiceInterface} from "./interfaces/RelationshipServiceInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {RelationshipListInterface} from "./interfaces/RelationshipListInterface";
import {RelationshipInterface} from "./interfaces/RelationshipInterface";
import {Relationship} from "./Relationship";
import {
	ControllerMetadataRelationshipInterface
} from "../../api/controllerManager/interfaces/ControllerMetadataRelationshipInterface";
import {ComponentStage} from "../../core/enums/ComponentStage";

export class RelationshipService implements RelationshipServiceInterface, ServiceInterface {
	public createRelationship(
		type: RelationshipType,
		path: string,
		description: string|undefined = undefined,
		component: ModelInterface|undefined = undefined,
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

	public createRelationshipFromMetadata(
		relationship: ControllerMetadataRelationshipInterface,
		existingRelationships:RelationshipListInterface|undefined = undefined,
	): RelationshipInterface {
		const response = new Relationship(
			(relationship.type !== undefined ? this.getTypeFromString(relationship.type) : RelationshipType.Undefined),
			relationship.path,
			relationship.description,
			undefined,
			relationship.isInContent ?? false,
		);

		if (existingRelationships !== undefined) existingRelationships.add(response);

		return response;
	}

	public createRelationshipFromReverse(
		component: ModelInterface,
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

	public getComponentTypeFromListName(
		listName: string,
	): ComponentType {
		let response: ComponentType|undefined = undefined;

		switch(listName.toLowerCase()){
			case 'adventures':
				response = ComponentType.Adventure;
				break;
			case 'acts':
				response = ComponentType.Act;
				break;
			case 'scenes':
				response = ComponentType.Scene;
				break;
			case 'sessions':
				response = ComponentType.Session;
				break;
			case 'pcs':
				response = ComponentType.Character;
				break;
			case 'npcs':
				response = ComponentType.NonPlayerCharacter;
				break;
			case 'clues':
				response = ComponentType.Clue;
				break;
			case 'events':
				response = ComponentType.Event;
				break;
			case 'factions':
				response = ComponentType.Faction;
				break;
			case 'locations':
				response = ComponentType.Location;
				break;
			case 'musics':
				response = ComponentType.Music;
				break;
			case 'subplots':
				response = ComponentType.Subplot;
				break;
		}

		//TODO remove empty error
		if (response === undefined)
			throw new Error('');

		return response;
	}

	public getReadableRelationshipType(
		type: RelationshipType,
	): string {
		return RelationshipType[type].toString().toLowerCase();
	}

	public getTypeFromString(
		readableRelationshipType: string,
	): RelationshipType {
		readableRelationshipType = readableRelationshipType[0].toUpperCase() + readableRelationshipType.substring(1).toLowerCase();
		return RelationshipType[readableRelationshipType as keyof typeof RelationshipType];
	}
}
