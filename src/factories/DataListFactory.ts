import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";
import {
	AdventureList,
	CharacterList,
	ClueList,
	EventList,
	FactionList,
	LocationList,
	SceneList, SessionList, TimelineList
} from "../settings/Agnostic/data";

const DataListsMap = {
	AgnosticAdventureList: AdventureList,
	AgnosticCharacterList: CharacterList,
	AgnosticClueList: ClueList,
	AgnosticEventList: EventList,
	AgnosticFactionList: FactionList,
	AgnosticLocationList: LocationList,
	AgnosticSceneList: SceneList,
	AgnosticSessionList: SessionList,
	AgnosticTimelineList: TimelineList,
};
type DataListsMapType = typeof DataListsMap;
type DataListKeys = keyof DataListsMapType;
type Tuples<T> = T extends DataListKeys ? [T, InstanceType<DataListsMapType[T]>] : never;
export type SingleDataListKey<K> = [K] extends (K extends DataListKeys ? [K] : never) ? K : never;
type DataListClassType<A extends DataListKeys> = Extract<Tuples<DataListKeys>, [A, any]>[1];

export class DataListFactory {
	static create<K extends DataListKeys>(
		k: SingleDataListKey<K>,
		campaign: CampaignDataInterface,
	): DataListClassType<K> {
		return new DataListsMap[k](campaign);
	}
}
