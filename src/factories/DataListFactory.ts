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
	AgnosticAdventure: AdventureList,
	AgnosticCharacter: CharacterList,
	AgnosticClue: ClueList,
	AgnosticEvent: EventList,
	AgnosticFaction: FactionList,
	AgnosticLocation: LocationList,
	AgnosticScene: SceneList,
	AgnosticSession: SessionList,
	AgnosticTimeline: TimelineList,
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
