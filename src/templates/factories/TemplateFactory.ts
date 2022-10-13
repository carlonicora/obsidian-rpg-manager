import {CampaignTemplateFactory} from "../../components/components/campaign/templates/CampaignTemplateFactory";
import {AdventureTemplateFactory} from "../../components/components/adventure/templates/AdventureTemplateFactory";
import {ActTemplateFactory} from "../../components/components/act/templates/ActTemplateFactory";
import {SceneTemplateFactory} from "../../components/components/scene/templates/SceneTemplateFactory";
import {CharacterTemplateFactory} from "../../components/components/character/templates/CharacterTemplateFactory";
import {NonPlayerCharacterTemplateFactory} from "../../components/components/character/templates/NonPlayerCharacterTemplateFactory";
import {LocationTemplateFactory} from "../../components/components/location/templates/LocationTemplateFactory";
import {EventTemplateFactory} from "../../components/components/event/templates/EventTemplateFactory";
import {ClueTemplateFactory} from "../../components/components/clue/templates/ClueTemplateFactory";
import {FactionTemplateFactory} from "../../components/components/faction/templates/FactionTemplateFactory";
import {MusicTemplateFactory} from "../../components/components/music/templates/MusicTemplateFactory";
import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {CampaignSetting} from "../../components/components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../components/enums/ComponentType";
import {App} from "obsidian";
import {TemplateFactoryInterface} from "./interfaces/TemplateFactoryInterface";
import {ComponentTemplateFactoryInterface} from "./interfaces/ComponentTemplateFactoryInterface";
import {SessionTemplateFactory} from "../../components/components/session/templates/SessionTemplateFactory";
import {SubplotTemplateFactory} from "../../components/components/subplot/templates/SubplotTemplateFactory";

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
		this.templateTypeMap.set('AgnosticMusic', MusicTemplateFactory);
		this.templateTypeMap.set('AgnosticSubplot', SubplotTemplateFactory);
	}

	public create(
		settings: CampaignSetting,
		type: ComponentType,
		templateName: string,
		name: string,
		campaignId: number|undefined,
		adventureId: number|undefined,
		actId: number|undefined,
		sceneId: number|undefined,
		sessionId: number|undefined,
		additionalInformation: any|null = null,
	): ComponentTemplateFactoryInterface {
		let templateKey = CampaignSetting[settings] + ComponentType[type];
		if (!this.templateTypeMap.has(templateKey)) templateKey = CampaignSetting[CampaignSetting.Agnostic] + ComponentType[type];
		if (!this.templateTypeMap.has(templateKey)) throw new Error('Type of template ' + CampaignSetting[settings] + ComponentType[type] + ' cannot be found');

		return new (this.templateTypeMap.get(templateKey))(this.app, templateName, name, campaignId, adventureId, actId, sceneId, sessionId, additionalInformation);
	}
}
