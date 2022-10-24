import {ServiceInterface} from "../../api/servicesManager/interfaces/ServiceInterface";
import {RelationshipType} from "./enums/RelationshipType";
import {RelationshipServiceInterface} from "./interfaces/RelationshipServiceInterface";
import {ComponentType} from "../../core/enums/ComponentType";

export class RelationshipService implements RelationshipServiceInterface, ServiceInterface {
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
