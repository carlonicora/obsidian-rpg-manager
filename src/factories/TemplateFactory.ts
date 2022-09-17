import {CampaignTemplateFactory} from "./templates/CampaignTemplateFactory";
import {AdventureTemplateFactory} from "./templates/AdventureTemplateFactory";
import {SessionTemplateFactory} from "./templates/SessionTemplateFactory";
import {SceneTemplateFactory} from "./templates/SceneTemplateFactory";
import {CharacterTemplateFactory} from "./templates/CharacterTemplateFactory";
import {NonPlayerCharacterTemplateFactory} from "./templates/NonPlayerCharacterTemplateFactory";
import {LocationTemplateFactory} from "./templates/LocationTemplateFactory";
import {EventTemplateFactory} from "./templates/EventTemplateFactory";
import {ClueTemplateFactory} from "./templates/ClueTemplateFactory";
import {FactionTemplateFactory} from "./templates/FactionTemplateFactory";
import {NoteTemplateFactory} from "./templates/NoteTemplateFactory";
import {TimelineTemplateFactory} from "./templates/TimelineTemplateFactory";
import {VampireCharacterTemplate} from "../rpgs/Vampire/templates/VampireCharacterTemplate";
import {VampireNonPlayerCharacterTemplate} from "../rpgs/Vampire/templates/VampireNonPlayerCharacterTemplate";
import {RawCampaignTemplate} from "../rpgs/Raw/templates/RawCampaignTemplate";
import {VampireCampaignTemplate} from "../rpgs/Vampire/templates/VampireCampaignTemplate";
import {MusicTemplateFactory} from "./templates/MusicTemplateFactory";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {DataType} from "../enums/DataType";

const TemplatesMap = {
	AgnosticCampaign: CampaignTemplateFactory,
	AgnosticAdventure: AdventureTemplateFactory,
	AgnosticSession: SessionTemplateFactory,
	AgnosticScene: SceneTemplateFactory,
	AgnosticCharacter: CharacterTemplateFactory,
	AgnosticNonPlayerCharacter: NonPlayerCharacterTemplateFactory,
	AgnosticLocation: LocationTemplateFactory,
	AgnosticEvent: EventTemplateFactory,
	AgnosticClue: ClueTemplateFactory,
	AgnosticFaction: FactionTemplateFactory,
	AgnosticNote: NoteTemplateFactory,
	AgnosticTimeline: TimelineTemplateFactory,
	VampireCharacter: VampireCharacterTemplate,
	VampireNonPlayerCharacter: VampireNonPlayerCharacterTemplate,
	RawCampaign: RawCampaignTemplate,
	VampireCampaign: VampireCampaignTemplate,
	AgnosticMusic: MusicTemplateFactory,
};
type TemplatesMapType = typeof TemplatesMap;
type TemplateKeys = keyof TemplatesMapType;
type Tuples<T> = T extends TemplateKeys ? [T, InstanceType<TemplatesMapType[T]>] : never;
type SingleTemplateKey<K> = [K] extends (K extends TemplateKeys ? [K] : never) ? K : never;
type TemplateClassType<A extends TemplateKeys> = Extract<Tuples<TemplateKeys>, [A, any]>[1];

export class TemplateFactory extends AbstractFactory {
	public create<K extends TemplateKeys>(
		settings: CampaignSetting,
		type: DataType,
		templateName: string,
		name: string,
		campaignId: number|undefined,
		adventureId: number|undefined,
		sessionId: number|undefined,
		sceneId: number|undefined,
		additionalInformation: any|null = null,
	): TemplateClassType<K> {
		let templateKey: SingleTemplateKey<K> = CampaignSetting[settings] + DataType[type] as SingleTemplateKey<K>;
		if (TemplatesMap[templateKey] == null && settings !== CampaignSetting.Agnostic){
			templateKey = CampaignSetting[CampaignSetting.Agnostic] + DataType[type] as SingleTemplateKey<K>;
		}
		return new TemplatesMap[templateKey](this.app, templateName, name, campaignId, adventureId, sessionId, sceneId, additionalInformation);
	}
}
