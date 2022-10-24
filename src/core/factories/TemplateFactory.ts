import {CampaignTemplateFactory} from "../../components/campaign/templates/CampaignTemplateFactory";
import {AdventureTemplateFactory} from "../../components/adventure/templates/AdventureTemplateFactory";
import {ActTemplateFactory} from "../../components/act/templates/ActTemplateFactory";
import {SceneTemplateFactory} from "../../components/scene/templates/SceneTemplateFactory";
import {CharacterTemplateFactory} from "../../components/character/templates/CharacterTemplateFactory";
import {NonPlayerCharacterTemplateFactory} from "../../components/character/templates/NonPlayerCharacterTemplateFactory";
import {LocationTemplateFactory} from "../../components/location/templates/LocationTemplateFactory";
import {EventTemplateFactory} from "../../components/event/templates/EventTemplateFactory";
import {ClueTemplateFactory} from "../../components/clue/templates/ClueTemplateFactory";
import {FactionTemplateFactory} from "../../components/faction/templates/FactionTemplateFactory";
import {MusicTemplateFactory} from "../../components/music/templates/MusicTemplateFactory";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {ComponentType} from "../enums/ComponentType";
import {App} from "obsidian";
import {TemplateFactoryInterface} from "../interfaces/TemplateFactoryInterface";
import {ComponentTemplateFactoryInterface} from "../interfaces/ComponentTemplateFactoryInterface";
import {SessionTemplateFactory} from "../../components/session/templates/SessionTemplateFactory";
import {SubplotTemplateFactory} from "../../components/subplot/templates/SubplotTemplateFactory";

export class TemplateFactory extends AbstractFactory implements TemplateFactoryInterface{
	private _templateTypeMap: Map<string,any>;

	constructor(
		app: App,
	) {
		super(app);
		this._templateTypeMap = new Map();
		this._templateTypeMap.set('AgnosticCampaign', CampaignTemplateFactory);
		this._templateTypeMap.set('AgnosticAdventure', AdventureTemplateFactory);
		this._templateTypeMap.set('AgnosticAct', ActTemplateFactory);
		this._templateTypeMap.set('AgnosticScene', SceneTemplateFactory);
		this._templateTypeMap.set('AgnosticSession', SessionTemplateFactory);
		this._templateTypeMap.set('AgnosticCharacter', CharacterTemplateFactory);
		this._templateTypeMap.set('AgnosticNonPlayerCharacter', NonPlayerCharacterTemplateFactory);
		this._templateTypeMap.set('AgnosticLocation', LocationTemplateFactory);
		this._templateTypeMap.set('AgnosticEvent', EventTemplateFactory);
		this._templateTypeMap.set('AgnosticClue', ClueTemplateFactory);
		this._templateTypeMap.set('AgnosticFaction', FactionTemplateFactory);
		this._templateTypeMap.set('AgnosticMusic', MusicTemplateFactory);
		this._templateTypeMap.set('AgnosticSubplot', SubplotTemplateFactory);
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
		if (!this._templateTypeMap.has(templateKey)) templateKey = CampaignSetting[CampaignSetting.Agnostic] + ComponentType[type];
		if (!this._templateTypeMap.has(templateKey)) throw new Error('Type of template ' + CampaignSetting[settings] + ComponentType[type] + ' cannot be found');

		return new (this._templateTypeMap.get(templateKey))(this.app, templateName, name, campaignId, adventureId, actId, sceneId, sessionId, additionalInformation);
	}
}
