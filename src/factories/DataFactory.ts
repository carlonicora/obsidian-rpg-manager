import {CachedMetadata, TFile} from "obsidian";
import {DataType} from "../enums/DataType";
import {Campaign} from "../settings/Agnostic/data/Campaign";
import {Adventure} from "../settings/Agnostic/data/Adventure";
import {Session} from "../settings/Agnostic/data/Session";
import {Scene} from "../settings/Agnostic/data/Scene";
import {Character} from "../settings/Agnostic/data/Character";
import {Faction} from "../settings/Agnostic/data/Faction";
import {Clue} from "../settings/Agnostic/data/Clue";
import {Location} from "../settings/Agnostic/data/Location";
import {Event} from "../settings/Agnostic/data/Event";
import {Timeline} from "../settings/Agnostic/data/Timeline";
import {Note} from "../settings/Agnostic/data/Note";
import {AbstractFactory} from "../abstracts/AbstractFactory";


const DatasMap = {
	AgnosticCampaign: Campaign,
	AgnosticAdventure: Adventure,
	AgnosticSession: Session,
	AgnosticScene: Scene,
	AgnosticCharacter: Character,
	AgnosticNonPlayerCharacter: Character,
	AgnosticFaction: Faction,
	AgnosticClue: Clue,
	AgnosticLocation: Location,
	AgnosticEvent: Event,
	AgnosticTimeline: Timeline,
	AgnosticNote: Note,
	
	RawCampaign: Campaign,
	RawAdventure: Adventure,
	RawSession: Session,
	RawScene: Scene,
	RawCharacter: Character,
	RawNonPlayerCharacter: Character,
	RawFaction: Faction,
	RawClue: Clue,
	RawLocation: Location,
	RawEvent: Event,
	RawTimeline: Timeline,
	RawNote: Note,

	VampireCampaign: Campaign,
	VampireAdventure: Adventure,
	VampireSession: Session,
	VampireScene: Scene,
	VampireCharacter: Character,
	VampireNonPlayerCharacter: Character,
	VampireFaction: Faction,
	VampireClue: Clue,
	VampireLocation: Location,
	VampireEvent: Event,
	VampireTimeline: Timeline,
	VampireNote: Note,
};
type DatasMapType = typeof DatasMap;
type DataKeys = keyof DatasMapType;
type Tuples<T> = T extends DataKeys ? [T, InstanceType<DatasMapType[T]>] : never;
export type SingleDataKey<K> = [K] extends (K extends DataKeys ? [K] : never) ? K : never;
type DataClassType<A extends DataKeys> = Extract<Tuples<DataKeys>, [A, any]>[1];

export class DataFactory extends AbstractFactory {
	public create<K extends DataKeys>(
		k: SingleDataKey<K>,
		type: DataType,
		file: TFile,
		metadata: CachedMetadata,
	): DataClassType<K> {
		return new DatasMap[k](this.app, type, file, metadata);
	}
}
