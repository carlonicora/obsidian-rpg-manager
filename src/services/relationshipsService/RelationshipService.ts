import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {RelationshipType} from "./enums/RelationshipType";
import {RelationshipServiceInterface} from "./interfaces/RelationshipServiceInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {RelationshipListInterface} from "./interfaces/RelationshipListInterface";
import {RelationshipInterface} from "./interfaces/RelationshipInterface";
import {Relationship} from "./Relationship";
import {
	ControllerMetadataRelationshipInterface
} from "../../managers/controllerManager/interfaces/ControllerMetadataRelationshipInterface";
import {ComponentStage} from "../../core/enums/ComponentStage";
import {TableField} from "./enums/TableField";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {
	RpgManagerAdvancedSettingsListElementInterface
} from "../../settings/interfaces/RpgManagerAdvancedSettingsListElementInterface";
import {
	RpgManagerAdvancedSettingsListsInterface
} from "../../settings/interfaces/RpgManagerAdvancedSettingsListsInterface";
import {LoggerService} from "../loggerService/LoggerService";
import {LogMessageType} from "../loggerService/enums/LogMessageType";
import {
	ControllerMetadataDataInterface
} from "../../managers/controllerManager/interfaces/ControllerMetadataDataInterface";

export class RelationshipService extends AbstractService implements RelationshipServiceInterface, ServiceInterface {
	public async addRelationshipsFromContent(
		fileContent: string,
		metadata: ControllerMetadataDataInterface,
		stage: ComponentStage,
	): Promise<void> {
		if (metadata.relationships == undefined)
			metadata.relationships = [];

		let content = fileContent;
		let indexOfRelationship: number = content.indexOf('[[');
		while (indexOfRelationship !== -1){
			content = content.substring(content.indexOf('[[') + 2);
			const endLinkIndex = content.indexOf(']]');
			if (endLinkIndex === -1) break;

			const nameAndAlias = content.substring(0, endLinkIndex);
			const aliasIndex = nameAndAlias.indexOf('|');
			let basename: string;
			if (aliasIndex === -1){
				basename = nameAndAlias;
			} else {
				basename = nameAndAlias.substring(0, aliasIndex);
			}

			let path: string|undefined = undefined;
			const allFiles = this.api.app.vault.getMarkdownFiles();
			for (let filesIndex=0; filesIndex<allFiles.length; filesIndex++){
				if (allFiles[filesIndex].basename === basename){
					path = allFiles[filesIndex].path;
					break;
				}
			}

			if (path !== undefined) {
				let relationshipAlreadyExists = false;
				for(let relationshipsIndex=0; relationshipsIndex<metadata.relationships.length; relationshipsIndex++){
					if (metadata.relationships[relationshipsIndex].path === path) {
						relationshipAlreadyExists = true;
						break;
					}
				}

				if (!relationshipAlreadyExists) {
					let relationship: RelationshipType | undefined = undefined;
					if (stage === ComponentStage.Run || stage === ComponentStage.Plot) {
						relationship = RelationshipType.Unidirectional;
					} else {
						relationship = RelationshipType.Bidirectional;
					}

					metadata.relationships?.push({
						type: this.getReadableRelationshipType(relationship),
						path: path,
						isInContent: true,
					});
				}
			} else {
				metadata.relationships?.push({
					type: undefined,
					path: basename,
					isInContent: true,
				});
			}

			indexOfRelationship = content.indexOf('[[');
		}
	}

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
		if (component.stage === ComponentStage.Plot || component.stage === ComponentStage.Run)
			return undefined;

		if (relationship.component !== null && component.file.path === relationship.component?.file.path)
			return undefined;

		let reverseRelationshipType: RelationshipType|undefined = undefined;
		switch (relationship.type){
			case RelationshipType.Bidirectional:
				reverseRelationshipType = RelationshipType.Reversed;
				break;
			case RelationshipType.Child:
				reverseRelationshipType = RelationshipType.Parent;
				break;
		}

		if (reverseRelationshipType === undefined)
			return undefined;

		const response = new Relationship(reverseRelationshipType, component.file.path, undefined, component, true);

		if (relationship.component !== undefined)
			relationship.component.getRelationships().add(response);

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

		if (response === undefined) {
			this.api.service(LoggerService).createError(LogMessageType.System, 'The requested list (' + listName + ') does not exist');
			throw new Error('The requested list (' + listName + ') does not exist');
		}

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

	public getTableFields(
		relationshipComponentType: ComponentType,
	): TableField[] {
		//TODO change the name "AdventureList" and so on to something related to the Campaign Settings and Component Type
		let fieldList: RpgManagerAdvancedSettingsListsInterface | undefined = undefined;
		switch (relationshipComponentType){
			case ComponentType.Adventure:
				fieldList = this.api.settings.advanced.Agnostic.AdventureList;
				break;
			case ComponentType.Act:
				fieldList = this.api.settings.advanced.Agnostic.ActList;
				break;
			case ComponentType.Scene:
				fieldList = this.api.settings.advanced.Agnostic.SceneList;
				break;
			case ComponentType.Session:
				fieldList = this.api.settings.advanced.Agnostic.SessionList;
				break;
			case ComponentType.Subplot:
				fieldList = this.api.settings.advanced.Agnostic.SubplotList;
				break;
			case ComponentType.Character:
				fieldList = this.api.settings.advanced.Agnostic.CharacterList;
				break;
			case ComponentType.Clue:
				fieldList = this.api.settings.advanced.Agnostic.ClueList;
				break;
			case ComponentType.Event:
				fieldList = this.api.settings.advanced.Agnostic.EventList;
				break;
			case ComponentType.Faction:
				fieldList = this.api.settings.advanced.Agnostic.FactionList;
				break;
			case ComponentType.Location:
				fieldList = this.api.settings.advanced.Agnostic.LocationList;
				break;
			case ComponentType.Music:
				fieldList = this.api.settings.advanced.Agnostic.MusicList;
				break;
			case ComponentType.NonPlayerCharacter:
				fieldList = this.api.settings.advanced.Agnostic.NonPlayerCharacterList;
				break;
		}

		const response: TableField[] = [];

		fieldList?.fields.forEach((element: RpgManagerAdvancedSettingsListElementInterface) => {
			if (element.checked)
				response.push(element.field);

		});

		return response;
	}

	public getTableFieldInline(
		relationshipComponentType: ComponentType,
		field: TableField,
	): boolean {
		switch (field){
			case TableField.Name:
			case TableField.Synopsis:
			case TableField.Url:
				return false;
				break;
			default:
				return true;
				break;
		}
	}
}
