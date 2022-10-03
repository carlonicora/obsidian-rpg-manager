import {CampaignFrontmatterTemplateFactory} from "../templates/frontmatter/CampaignFrontmatterTemplateFactory";
import {AdventureFrontmatterTemplateFactory} from "../templates/frontmatter/AdventureFrontmatterTemplateFactory";
import {ActFrontmatterTemplateFactory} from "../templates/frontmatter/ActFrontmatterTemplateFactory";
import {SceneFrontmatterTemplateFactory} from "../templates/frontmatter/SceneFrontmatterTemplateFactory";
import {CharacterFrontmatterTemplateFactory} from "../templates/frontmatter/CharacterFrontmatterTemplateFactory";
import {NonPlayerCharacterFrontmatterTemplateFactory} from "../templates/frontmatter/NonPlayerCharacterFrontmatterTemplateFactory";
import {LocationFrontmatterTemplateFactory} from "../templates/frontmatter/LocationFrontmatterTemplateFactory";
import {EventFrontmatterTemplateFactory} from "../templates/frontmatter/EventFrontmatterTemplateFactory";
import {ClueFrontmatterTemplateFactory} from "../templates/frontmatter/ClueFrontmatterTemplateFactory";
import {FactionFrontmatterTemplateFactory} from "../templates/frontmatter/FactionFrontmatterTemplateFactory";
import {MusicFrontmatterTemplateFactory} from "../templates/frontmatter/MusicFrontmatterTemplateFactory";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {ComponentType} from "../enums/ComponentType";
import {App} from "obsidian";
import {TemplateFactoryInterface} from "../interfaces/factories/TemplateFactoryInterface";
import {ComponentFrontmatterTemplateFactoryInterface} from "../interfaces/factories/ComponentFrontmatterTemplateFactoryInterface";
import {SessionFrontmatterTemplateFactory} from "../templates/frontmatter/SessionFrontmatterTemplateFactory";
import {SubplotFrontmatterTemplateFactory} from "../templates/frontmatter/SubplotFrontmatterTemplateFactory";

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
