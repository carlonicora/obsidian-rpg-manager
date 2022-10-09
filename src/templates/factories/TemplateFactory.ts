import {CampaignTemplateFactory} from "./frontmatter/CampaignTemplateFactory";
import {AdventureTemplateFactory} from "./frontmatter/AdventureTemplateFactory";
import {ActTemplateFactory} from "./frontmatter/ActTemplateFactory";
import {SceneTemplateFactory} from "./frontmatter/SceneTemplateFactory";
import {CharacterTemplateFactory} from "./frontmatter/CharacterTemplateFactory";
import {NonPlayerCharacterTemplateFactory} from "./frontmatter/NonPlayerCharacterTemplateFactory";
import {LocationTemplateFactory} from "./frontmatter/LocationTemplateFactory";
import {EventTemplateFactory} from "./frontmatter/EventTemplateFactory";
import {ClueTemplateFactory} from "./frontmatter/ClueTemplateFactory";
import {FactionTemplateFactory} from "./frontmatter/FactionTemplateFactory";
import {MusicTemplateFactory} from "./frontmatter/MusicTemplateFactory";
import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {CampaignSetting} from "../../databases/enums/CampaignSetting";
import {ComponentType} from "../../databases/enums/ComponentType";
import {App} from "obsidian";
import {TemplateFactoryInterface} from "./interfaces/TemplateFactoryInterface";
import {ComponentTemplateFactoryInterface} from "./interfaces/ComponentTemplateFactoryInterface";
import {SessionTemplateFactory} from "./frontmatter/SessionTemplateFactory";
import {SubplotTemplateFactory} from "./frontmatter/SubplotTemplateFactory";

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
