import {DataType} from "../io/IoData";
import {RpgFunctions} from "../functions/RpgFunctions";
import {CampaignDataInterface} from "../data/CampaignData";
import {GenericDataInterface} from "../interfaces/DataInterfaces";
import {DataObject} from "obsidian-dataview";
import {CharacterData} from "../data/CharacterData";
import {LocationData} from "../data/LocationData";
import {ClueData, EventData, FactionData} from "../data";

export class DataFactory {
	public static create(
		type: DataType,
		functions: RpgFunctions,
		campaign: CampaignDataInterface|null,
		current: Record<string, any>,
		record: DataObject,
		additionalInformation: string|null,
	): GenericDataInterface
	{
		//@ts-ignore
		return this['create' + DataType[type]](functions, campaign, current, record, additionalInformation);
	}

	private static createCharacter(
		functions: RpgFunctions,
		campaign: CampaignDataInterface|null,
		current: Record<string, any>,
		record: DataObject,
		additionalInformation: string|null,
	): CharacterData
	{
		return new CharacterData(
			functions,
			record,
			campaign,
			additionalInformation,
		)
	}

	private static createLocation(
		functions: RpgFunctions,
		campaign: CampaignDataInterface|null,
		current: Record<string, any>,
		record: DataObject,
		additionalInformation: string|null,
	): LocationData
	{
		return new LocationData(
			functions,
			record,
			additionalInformation,
		)
	}

	private static createEvent(
		functions: RpgFunctions,
		campaign: CampaignDataInterface|null,
		current: Record<string, any>,
		record: DataObject,
		additionalInformation: string|null,
	): EventData
	{
		return new EventData(
			functions,
			record,
			campaign,
			additionalInformation,
		)
	}

	private static createClue(
		functions: RpgFunctions,
		campaign: CampaignDataInterface|null,
		current: Record<string, any>,
		record: DataObject,
		additionalInformation: string|null,
	): ClueData
	{
		return new ClueData(
			functions,
			record,
			additionalInformation,
		)
	}

	private static createFaction(
		functions: RpgFunctions,
		campaign: CampaignDataInterface|null,
		current: Record<string, any>,
		record: DataObject,
		additionalInformation: string|null,
	): FactionData
	{
		return new FactionData(
			functions,
			record,
			campaign,
			additionalInformation,
		)
	}
}
