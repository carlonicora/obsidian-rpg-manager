import {
	AdventureData,
	CampaignData,
	CharacterData,
	ClueData,
	EventData,
	FactionData,
	LocationData, SceneData, SessionData
} from "../settings/Agnostic/data";
import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";
import {VampireCharacterData} from "../settings/Vampire/data";
import {RawCharacterData} from "../settings/Raw/data";

const DatasMap = {
	AgnosticCampaign: CampaignData,
	AgnosticAdventure: AdventureData,
	AgnosticSession: SessionData,
	AgnosticScene: SceneData,
	AgnosticCharacter: CharacterData,
	AgnosticNonPlayerCharacter: CharacterData,
	AgnosticClue: ClueData,
	AgnosticEvent: EventData,
	AgnosticFaction: FactionData,
	AgnosticLocation: LocationData,
	RawCharacter: RawCharacterData,
	VampireCharacter: VampireCharacterData,
};
type DatasMapType = typeof DatasMap;
type DataKeys = keyof DatasMapType;
type Tuples<T> = T extends DataKeys ? [T, InstanceType<DatasMapType[T]>] : never;
export type SingleDataKey<K> = [K] extends (K extends DataKeys ? [K] : never) ? K : never;
type DataClassType<A extends DataKeys> = Extract<Tuples<DataKeys>, [A, any]>[1];

export class DataFactory {
	static create<K extends DataKeys>(
		k: SingleDataKey<K>,
		current: Record<string, any>,
		campaign: CampaignDataInterface,
		additionalInformation = '',
	): DataClassType<K> {
		return new DatasMap[k](current, campaign, additionalInformation);
	}
}
