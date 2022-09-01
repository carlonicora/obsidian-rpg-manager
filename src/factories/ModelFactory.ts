import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";
import {
	AdventureModel,
	CampaignModel,
	CampaignNavigationModel,
	ClueModel,
	ErrorModel,
	EventModel,
	FactionModel,
	LocationModel,
	NotesModel,
	NpcModel,
	PcModel,
	SceneModel,
	SceneNavigationModel,
	SessionModel, SessionNavigationModel, TimelineModel
} from "../settings/Agnostic/models";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {App} from "obsidian";

const ModelsMap = {
	AgnosticAdventure: AdventureModel,
	AgnosticCampaign: CampaignModel,
	AgnosticCampaignNavigation: CampaignNavigationModel,
	AgnosticClue: ClueModel,
	AgnosticError: ErrorModel,
	AgnosticEvent: EventModel,
	AgnosticFaction: FactionModel,
	AgnosticLocation: LocationModel,
	AgnosticNotes: NotesModel,
	AgnosticNpc: NpcModel,
	AgnosticPc: PcModel,
	AgnosticScene: SceneModel,
	AgnosticSceneNavigation: SceneNavigationModel,
	AgnosticSession: SessionModel,
	AgnosticSessionNavigation: SessionNavigationModel,
	AgnosticTimeline: TimelineModel,
};
type ModelsMapType = typeof ModelsMap;
type ModelKeys = keyof ModelsMapType;
type Tuples<T> = T extends ModelKeys ? [T, InstanceType<ModelsMapType[T]>] : never;
export type SingleModelKey<K> = [K] extends (K extends ModelKeys ? [K] : never) ? K : never;
type ModelClassType<A extends ModelKeys> = Extract<Tuples<ModelKeys>, [A, any]>[1];

export class ModelFactory {
	static create<K extends ModelKeys>(
		k: SingleModelKey<K>,
		app: App,
		campaign: CampaignDataInterface,
		current: Record<string, any>,
		dv: DataviewInlineApi,
		source: string,
	): ModelClassType<K> {
		return new ModelsMap[k](app, campaign, current, dv, source);
	}
}
