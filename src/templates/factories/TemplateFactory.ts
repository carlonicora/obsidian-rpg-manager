import {CampaignFrontmatterTemplateFactory} from "./frontmatter/CampaignFrontmatterTemplateFactory";
import {AdventureFrontmatterTemplateFactory} from "./frontmatter/AdventureFrontmatterTemplateFactory";
import {ActFrontmatterTemplateFactory} from "./frontmatter/ActFrontmatterTemplateFactory";
import {SceneFrontmatterTemplateFactory} from "./frontmatter/SceneFrontmatterTemplateFactory";
import {CharacterFrontmatterTemplateFactory} from "./frontmatter/CharacterFrontmatterTemplateFactory";
import {NonPlayerCharacterFrontmatterTemplateFactory} from "./frontmatter/NonPlayerCharacterFrontmatterTemplateFactory";
import {LocationFrontmatterTemplateFactory} from "./frontmatter/LocationFrontmatterTemplateFactory";
import {EventFrontmatterTemplateFactory} from "./frontmatter/EventFrontmatterTemplateFactory";
import {ClueFrontmatterTemplateFactory} from "./frontmatter/ClueFrontmatterTemplateFactory";
import {FactionFrontmatterTemplateFactory} from "./frontmatter/FactionFrontmatterTemplateFactory";
import {MusicFrontmatterTemplateFactory} from "./frontmatter/MusicFrontmatterTemplateFactory";
import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {CampaignSetting} from "../../databases/enums/CampaignSetting";
import {ComponentType} from "../../databases/enums/ComponentType";
import {App} from "obsidian";
import {TemplateFactoryInterface} from "./interfaces/TemplateFactoryInterface";
import {ComponentFrontmatterTemplateFactoryInterface} from "./interfaces/ComponentFrontmatterTemplateFactoryInterface";
import {SessionFrontmatterTemplateFactory} from "./frontmatter/SessionFrontmatterTemplateFactory";
import {SubplotFrontmatterTemplateFactory} from "./frontmatter/SubplotFrontmatterTemplateFactory";

export class TemplateFactory extends AbstractFactory implements TemplateFactoryInterface{
	private templateTypeMap: Map<string,any>;

	constructor(
		app: App,
	) {
		super(app);
		this.templateTypeMap = new Map();
		this.templateTypeMap.set('AgnosticCampaign', CampaignFrontmatterTemplateFactory);
		this.templateTypeMap.set('AgnosticAdventure', AdventureFrontmatterTemplateFactory);
		this.templateTypeMap.set('AgnosticAct', ActFrontmatterTemplateFactory);
		this.templateTypeMap.set('AgnosticScene', SceneFrontmatterTemplateFactory);
		this.templateTypeMap.set('AgnosticSession', SessionFrontmatterTemplateFactory);
		this.templateTypeMap.set('AgnosticCharacter', CharacterFrontmatterTemplateFactory);
		this.templateTypeMap.set('AgnosticNonPlayerCharacter', NonPlayerCharacterFrontmatterTemplateFactory);
		this.templateTypeMap.set('AgnosticLocation', LocationFrontmatterTemplateFactory);
		this.templateTypeMap.set('AgnosticEvent', EventFrontmatterTemplateFactory);
		this.templateTypeMap.set('AgnosticClue', ClueFrontmatterTemplateFactory);
		this.templateTypeMap.set('AgnosticFaction', FactionFrontmatterTemplateFactory);
		this.templateTypeMap.set('AgnosticMusic', MusicFrontmatterTemplateFactory);
		this.templateTypeMap.set('AgnosticSubplot', SubplotFrontmatterTemplateFactory);
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
	): ComponentFrontmatterTemplateFactoryInterface {
		let templateKey = CampaignSetting[settings] + ComponentType[type];
		if (!this.templateTypeMap.has(templateKey)) templateKey = CampaignSetting[CampaignSetting.Agnostic] + ComponentType[type];
		if (!this.templateTypeMap.has(templateKey)) throw new Error('Type of template ' + CampaignSetting[settings] + ComponentType[type] + ' cannot be found');

		return new (this.templateTypeMap.get(templateKey))(this.app, templateName, name, campaignId, adventureId, actId, sceneId, sessionId, additionalInformation);
	}
}
