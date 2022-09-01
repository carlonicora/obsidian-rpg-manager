import {
	CharacterData,
	ClueData,
	EventData,
	FactionData,
	LocationData
} from "../settings/Agnostic/data";
import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";

const DatasMap = {
	AgnosticCharacterDate: CharacterData,
	AgnosticClueData: ClueData,
	AgnosticEventData: EventData,
	AgnosticFactionData: FactionData,
	AgnosticLocationData: LocationData,
};
type DatasMapType = typeof DatasMap;
type DataKeys = keyof DatasMapType;
type Tuples<T> = T extends DataKeys ? [T, InstanceType<DatasMapType[T]>] : never;
export type SingleDataKey<K> = [K] extends (K extends DataKeys ? [K] : never) ? K : never;
type DataClassType<A extends DataKeys> = Extract<Tuples<DataKeys>, [A, any]>[1];

export class DataFactory {
	static create<K extends DataKeys>(
		k: SingleDataKey<K>,
		campaign: CampaignDataInterface,
		current: Record<string, any>,
		additionalInformation: string,
	): DataClassType<K> {
		return new DatasMap[k](current, campaign, additionalInformation);
	}
}
