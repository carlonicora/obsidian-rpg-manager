import {CampaignTemplateFactory} from "./templates/CampaignTemplateFactory";
import {AdventureTemplateFactory} from "./templates/AdventureTemplateFactory";
import {ActTemplateFactory} from "./templates/ActTemplateFactory";
import {SceneTemplateFactory} from "./templates/SceneTemplateFactory";
import {CharacterTemplateFactory} from "./templates/CharacterTemplateFactory";
import {NonPlayerCharacterTemplateFactory} from "./templates/NonPlayerCharacterTemplateFactory";
import {LocationTemplateFactory} from "./templates/LocationTemplateFactory";
import {EventTemplateFactory} from "./templates/EventTemplateFactory";
import {ClueTemplateFactory} from "./templates/ClueTemplateFactory";
import {FactionTemplateFactory} from "./templates/FactionTemplateFactory";
import {VampireCharacterTemplate} from "../rpgs/Vampire/templates/VampireCharacterTemplate";
import {VampireNonPlayerCharacterTemplate} from "../rpgs/Vampire/templates/VampireNonPlayerCharacterTemplate";
import {RawCampaignTemplate} from "../rpgs/Raw/templates/RawCampaignTemplate";
import {VampireCampaignTemplate} from "../rpgs/Vampire/templates/VampireCampaignTemplate";
import {MusicTemplateFactory} from "./templates/MusicTemplateFactory";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {RecordType} from "../enums/RecordType";
import {App} from "obsidian";
import {TemplateFactoryInterface} from "../interfaces/factories/TemplateFactoryInterface";
import {ComponentTemplateFactoryInterface} from "../interfaces/ComponentTemplateFactoryInterface";
import {SessionTemplateFactory} from "./templates/SessionTemplateFactory";

export class TemplateFactory extends AbstractFactory implements TemplateFactoryInterface{
	private templateTypeMap: Map<string,any>;

	constructor(
		app: App,
	) {
		super(app);
		this.templateTypeMap = new Map();
		this.templateTypeMap.set('AgnosticCampaign', CampaignTemplateFactory);
		this.templateTypeMap.set('AgnosticAdventure', AdventureTemplateFactory);
		this.templateTypeMap.set('AgnosticAct', ActTemplateFactory);
		this.templateTypeMap.set('AgnosticScene', SceneTemplateFactory);
		this.templateTypeMap.set('AgnosticSession', SessionTemplateFactory);
		this.templateTypeMap.set('AgnosticCharacter', CharacterTemplateFactory);
		this.templateTypeMap.set('AgnosticNonPlayerCharacter', NonPlayerCharacterTemplateFactory);
		this.templateTypeMap.set('AgnosticLocation', LocationTemplateFactory);
		this.templateTypeMap.set('AgnosticEvent', EventTemplateFactory);
		this.templateTypeMap.set('AgnosticClue', ClueTemplateFactory);
		this.templateTypeMap.set('AgnosticFaction', FactionTemplateFactory);
		this.templateTypeMap.set('VampireCharacter', VampireCharacterTemplate);
		this.templateTypeMap.set('VampireNonPlayerCharacter', VampireNonPlayerCharacterTemplate);
		this.templateTypeMap.set('RawCampaign', RawCampaignTemplate);
		this.templateTypeMap.set('VampireCampaign', VampireCampaignTemplate);
		this.templateTypeMap.set('AgnosticMusic', MusicTemplateFactory);
	}

	public create(
		settings: CampaignSetting,
		type: RecordType,
		templateName: string,
		name: string,
		campaignId: number|undefined,
		adventureId: number|undefined,
		actId: number|undefined,
		sceneId: number|undefined,
		sessionId: number|undefined,
		additionalInformation: any|null = null,
	): ComponentTemplateFactoryInterface {
		let templateKey = CampaignSetting[settings] + RecordType[type];
		if (!this.templateTypeMap.has(templateKey)) templateKey = CampaignSetting[CampaignSetting.Agnostic] + RecordType[type];
		if (!this.templateTypeMap.has(templateKey)) throw new Error('Type of template ' + CampaignSetting[settings] + RecordType[type] + ' cannot be found');

		return new (this.templateTypeMap.get(templateKey))(this.app, templateName, name, campaignId, adventureId, actId, sceneId, sessionId, additionalInformation);
	}
}
