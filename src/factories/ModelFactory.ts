import {AdventureModel} from "../models/AdventureModel";
import {CampaignModel} from "../models/CampaignModel";
import {CampaignNavigationModel} from "../models/CampaignNavigationModel";
import {ClueModel} from "../models/ClueModel";
import {ErrorModel} from "../models/ErrorModel";
import {EventModel} from "../models/EventModel";
import {FactionModel} from "../models/FactionModel";
import {LocationModel} from "../models/LocationModel";
import {NoteModel} from "../models/NoteModel";
import {NpcModel} from "../models/NpcModel";
import {PcModel} from "../models/PcModel";
import {SceneModel} from "../models/SceneModel";
import {SceneNavigationModel} from "../models/SceneNavigationModel";
import {SessionModel} from "../models/SessionModel";
import {SessionNavigationModel} from "../models/SessionNavigationModel";
import {TimelineModel} from "../models/TimelineModel";
import {AdventureNavigationModel} from "../models/AdventureNavigationModel";
import {RpgOutlineDataInterface} from "../interfaces/data/RpgOutlineDataInterface";
import {RpgElementDataInterface} from "../interfaces/data/RpgElementDataInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {RawNpcModel} from "../settings/Raw/models/RawNpcModel";
import {MusicModel} from "../models/MusicModel";

const ModelsMap = {
	AgnosticAdventure: AdventureModel,
	AgnosticAdventureNavigation: AdventureNavigationModel,
	AgnosticCampaign: CampaignModel,
	AgnosticCampaignNavigation: CampaignNavigationModel,
	AgnosticClue: ClueModel,
	AgnosticError: ErrorModel,
	AgnosticEvent: EventModel,
	AgnosticFaction: FactionModel,
	AgnosticLocation: LocationModel,
	AgnosticNote: NoteModel,
	AgnosticNpc: NpcModel,
	AgnosticPc: PcModel,
	AgnosticScene: SceneModel,
	AgnosticSceneNavigation: SceneNavigationModel,
	AgnosticSession: SessionModel,
	AgnosticSessionNavigation: SessionNavigationModel,
	AgnosticTimeline: TimelineModel,
	RawNpc: RawNpcModel,
	AgnosticMusic: MusicModel,
};
type ModelsMapType = typeof ModelsMap;
type ModelKeys = keyof ModelsMapType;
type Tuples<T> = T extends ModelKeys ? [T, InstanceType<ModelsMapType[T]>] : never;
type SingleModelKey<K> = [K] extends (K extends ModelKeys ? [K] : never) ? K : never;
type ModelClassType<A extends ModelKeys> = Extract<Tuples<ModelKeys>, [A, any]>[1];

export class ModelFactory extends AbstractFactory {
	public create<K extends ModelKeys>(
		settings: CampaignSetting,
		modelName: string,
		currentElement: RpgOutlineDataInterface|RpgElementDataInterface,
		source: string,
		sourcePath: string,
		sourceMeta: any,
	): ModelClassType<K> {
		let modelKey: SingleModelKey<K> = CampaignSetting[settings] + modelName as SingleModelKey<K>;
		if (ModelsMap[modelKey] == null && settings !== CampaignSetting.Agnostic){
			modelKey = CampaignSetting[CampaignSetting.Agnostic] + modelName as SingleModelKey<K>;
		}
		return new ModelsMap[modelKey](this.app, currentElement, source, sourcePath, sourceMeta);
	}
}
