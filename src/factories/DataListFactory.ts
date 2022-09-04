import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";
import {AdventureList} from "../settings/Agnostic/data/AdventureList";
import {CharacterList} from "../settings/Agnostic/data/CharacterList";
import {ClueList} from "../settings/Agnostic/data/ClueList";
import {EventList} from "../settings/Agnostic/data/EventList";
import {FactionList} from "../settings/Agnostic/data/FactionList";
import {LocationList} from "../settings/Agnostic/data/LocationList";
import {SceneList} from "../settings/Agnostic/data/SceneList";
import {SessionList} from "../settings/Agnostic/data/SessionList";
import {TimelineList} from "../settings/Agnostic/data/TimelineList";

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
