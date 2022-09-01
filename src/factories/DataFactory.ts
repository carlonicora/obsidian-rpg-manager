import {DataType} from "../io/IoData";
import {Api} from "../api";
import {CampaignDataInterface} from "../data/CampaignData";
import {GenericDataInterface} from "../interfaces/DataInterfaces";
import {DataObject} from "obsidian-dataview";
import {CharacterData} from "../data/CharacterData";
import {LocationData} from "../data/LocationData";
import {ClueData, EventData, FactionData} from "../data";



export class DataFactory {
	static DataFactoryFunctions: { [name: string]: Function } = {
		Character: DataFactory.createCharacter,
		Location: DataFactory.createLocation,
		Faction: DataFactory.createFaction,
		Event: DataFactory.createEvent,
		Clue: DataFactory.createClue,
	};

	public static create(
		type: DataType,
		api: Api,
		campaign: CampaignDataInterface|null,
		current: Record<string, any>,
		record: DataObject,
		additionalInformation: string|null,
	): GenericDataInterface
	{
		return this.DataFactoryFunctions[DataType[type]](api, campaign, current, record, additionalInformation);
	}

	private static createCharacter(
		api: Api,
		campaign: CampaignDataInterface,
		current: Record<string, any>,
		record: DataObject,
		additionalInformation: string|null,
	): CharacterData
	{
		return new CharacterData(
			api,
			record,
			campaign,
			additionalInformation,
		)
	}

	private static createLocation(
		api: Api,
		campaign: CampaignDataInterface,
		current: Record<string, any>,
		record: DataObject,
		additionalInformation: string|null,
	): LocationData
	{
		return new LocationData(
			api,
			record,
			campaign,
			additionalInformation,
		)
	}

	private static createEvent(
		api: Api,
		campaign: CampaignDataInterface,
		current: Record<string, any>,
		record: DataObject,
		additionalInformation: string|null,
	): EventData
	{
		return new EventData(
			api,
			record,
			campaign,
			additionalInformation,
		)
	}

	private static createClue(
		api: Api,
		campaign: CampaignDataInterface,
		current: Record<string, any>,
		record: DataObject,
		additionalInformation: string|null,
	): ClueData
	{
		return new ClueData(
			api,
			record,
			campaign,
			additionalInformation,
		)
	}

	private static createFaction(
		api: Api,
		campaign: CampaignDataInterface,
		current: Record<string, any>,
		record: DataObject,
		additionalInformation: string|null,
	): FactionData
	{
		return new FactionData(
			api,
			record,
			campaign,
			additionalInformation,
		)
	}
}
