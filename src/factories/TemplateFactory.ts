import {CampaignTemplateFactory} from "../settings/Agnostic/factories/CampaignTemplateFactory";
import {AdventureTemplateFactory} from "../settings/Agnostic/factories/AdventureTemplateFactory";
import {SessionTemplateFactory} from "../settings/Agnostic/factories/SessionTemplateFactory";
import {SceneTemplateFactory} from "../settings/Agnostic/factories/SceneTemplateFactory";
import {CharacterTemplateFactory} from "../settings/Agnostic/factories/CharacterTemplateFactory";
import {NonPlayerCharacterTemplateFactory} from "../settings/Agnostic/factories/NonPlayerCharacterTemplateFactory";
import {LocationTemplateFactory} from "../settings/Agnostic/factories/LocationTemplateFactory";
import {EventTemplateFactory} from "../settings/Agnostic/factories/EventTemplateFactory";
import {ClueTemplateFactory} from "../settings/Agnostic/factories/ClueTemplateFactory";
import {FactionTemplateFactory} from "../settings/Agnostic/factories/FactionTemplateFactory";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {DataType} from "../enums/DataType";
import {NoteTemplateFactory} from "../settings/Agnostic/factories/NoteTemplateFactory";
import {VampireNonPlayerCharacterTemplate} from "../settings/Vampire/templates/VampireNonPlayerCharacterTemplate";
import {VampireCharacterTemplate} from "../settings/Vampire/templates/VampireCharacterTemplate";
import {RawCampaignTemplate} from "../settings/Raw/templates/RawCampaignTemplate";
import {VampireCampaignTemplate} from "../settings/Vampire/templates/VampireCampaignTemplate";
import {TimelineTemplateFactory} from "../settings/Agnostic/factories/TimelineTemplateFactory";

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
		campaignId: number|null,
		adventureId: number|null,
		sessionId: number|null,
		sceneId: number|null,
		additionalInformation: any|null = null,
	): TemplateClassType<K> {
		let templateKey: SingleTemplateKey<K> = CampaignSetting[settings] + DataType[type] as SingleTemplateKey<K>;
		if (TemplatesMap[templateKey] == null && settings !== CampaignSetting.Agnostic){
			templateKey = CampaignSetting[CampaignSetting.Agnostic] + DataType[type] as SingleTemplateKey<K>;
		}
		return new TemplatesMap[templateKey](this.app, templateName, name, campaignId, adventureId, sessionId, sceneId, additionalInformation);
	}
}
