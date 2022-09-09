import {CampaignTemplate} from "../settings/Agnostic/templates/CampaignTemplate";
import {AdventureTemplate} from "../settings/Agnostic/templates/AdventureTemplate";
import {SessionTemplate} from "../settings/Agnostic/templates/SessionTemplate";
import {SceneTemplate} from "../settings/Agnostic/templates/SceneTemplate";
import {CharacterTemplate} from "../settings/Agnostic/templates/CharacterTemplate";
import {NonPlayerCharacterTemplate} from "../settings/Agnostic/templates/NonPlayerCharacterTemplate";
import {LocationTemplate} from "../settings/Agnostic/templates/LocationTemplate";
import {EventTemplate} from "../settings/Agnostic/templates/EventTemplate";
import {ClueTemplate} from "../settings/Agnostic/templates/ClueTemplate";
import {FactionTemplate} from "../settings/Agnostic/templates/FactionTemplate";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {DataType} from "../enums/DataType";
import {NoteTemplate} from "../settings/Agnostic/templates/NoteTemplate";

const TemplatesMap = {
	AgnosticCampaign: CampaignTemplate,
	AgnosticAdventure: AdventureTemplate,
	AgnosticSession: SessionTemplate,
	AgnosticScene: SceneTemplate,
	AgnosticCharacter: CharacterTemplate,
	AgnosticNonPlayerCharacter: NonPlayerCharacterTemplate,
	AgnosticLocation: LocationTemplate,
	AgnosticEvent: EventTemplate,
	AgnosticClue: ClueTemplate,
	AgnosticFaction: FactionTemplate,
	AgnosticNote: NoteTemplate,
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
		createFrontMatterOnly: boolean,
		name: string,
		campaignId: number|null,
		adventureId: number|null,
		sessionId: number|null,
		sceneId: number|null,
	): TemplateClassType<K> {
		let templateKey: SingleTemplateKey<K> = CampaignSetting[settings] + DataType[type] as SingleTemplateKey<K>;
		if (TemplatesMap[templateKey] == null && settings !== CampaignSetting.Agnostic){
			templateKey = CampaignSetting[CampaignSetting.Agnostic] + DataType[type] as SingleTemplateKey<K>;
		}
		return new TemplatesMap[templateKey](this.app, createFrontMatterOnly, name, campaignId, adventureId, sessionId, sceneId);
	}
}
