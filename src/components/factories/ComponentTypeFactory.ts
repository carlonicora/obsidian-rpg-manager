import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {ComponentTypeFactoryInterface} from "./interfaces/ComponentTypeFactoryInterface";
import {ComponentType} from "../enums/ComponentType";
import {LogMessageType} from "../../loggers/enums/LogMessageType";

export class ComponentTypeFactory extends AbstractFactory implements ComponentTypeFactoryInterface {
	private _contentTypeMap: Map<ComponentType, string> = new Map<ComponentType, string>([
		[ComponentType.Campaign, 'campaign'],
		[ComponentType.Adventure, 'adventure'],
		[ComponentType.Act, 'act'],
		[ComponentType.Scene, 'scene'],
		[ComponentType.Session, 'session'],
		[ComponentType.Subplot, 'subplot'],
		[ComponentType.NonPlayerCharacter, 'npc'],
		[ComponentType.Character, 'pc'],
		[ComponentType.Clue, 'clue'],
		[ComponentType.Event, 'event'],
		[ComponentType.Faction, 'faction'],
		[ComponentType.Location, 'location'],
		[ComponentType.Music, 'music'],
	]);

	createComponentType(
		readableContentType: string,
	): ComponentType {
		let response: ComponentType|undefined=undefined;

		this._contentTypeMap.forEach((value: string, type: ComponentType) => {
			if (value === readableContentType.toLowerCase()) response = type;
		});

		if (response === undefined) {
			this.factories.logger.error(LogMessageType.ComponentInitialisation, 'wrong component type: ' + readableContentType, this);
			throw new Error('wrong component type: ' + readableContentType);
		}

		return response;
	}

	createReadableComponentType(
		type: ComponentType,
	): string {
		const response: string|undefined = this._contentTypeMap.get(type);

		if (response === undefined) {
			this.factories.logger.error(LogMessageType.ComponentInitialisation, 'Non existing component type: ' + type, this);
			throw new Error('Non existing component type: ' + type);
		}

		return response;
	}
}
