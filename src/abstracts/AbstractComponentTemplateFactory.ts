import {ComponentTemplateFactoryInterface} from "../interfaces/ComponentTemplateFactoryInterface";
import {App, stringifyYaml} from "obsidian";
import {FileContentManager} from "../helpers/FileContentManager";
import {TemplateInterface} from "../interfaces/TemplateInterface";
import {RecordType} from "../enums/RecordType";
import {CampaignTemplate} from "../templates/notes/CampaignTemplate";
import {AdventureTemplate} from "../templates/notes/AdventureTemplate";
import {CharacterTemplate} from "../templates/notes/CharacterTemplate";
import {NonPlayerCharacterTemplate} from "../templates/notes/NonPlayerCharacterTemplate";
import {ClueTemplate} from "../templates/notes/ClueTemplate";
import {LocationTemplate} from "../templates/notes/LocationTemplate";
import {FactionTemplate} from "../templates/notes/FactionTemplate";
import {EventTemplate} from "../templates/notes/EventTemplate";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {ActTemplate} from "../templates/notes/ActTemplate";
import {SceneTemplate} from "../templates/notes/SceneTemplate";
import {SessionTemplate} from "../templates/notes/SessionTemplate";
import {SubplotTemplate} from "../templates/notes/SubplotTemplate";

export abstract class AbstractComponentTemplateFactory extends AbstractRpgManager implements ComponentTemplateFactoryInterface {
	protected internalTemplate: TemplateInterface|undefined;

	constructor(
		app: App,
		protected templateName: string,
		protected name: string,
		protected campaignId: number|undefined,
		protected adventureId: number|undefined,
		protected actId: number|undefined,
		protected sceneId: number|undefined,
		protected sessionId: number|undefined,
		protected additionalInformation: any|null,
	) {
		super(app);
	}

	public async generateData(
	): Promise<string> {
		let templateFrontmatter: any|undefined;
		let templateContent: string|undefined;

		if (this.templateName != null && this.templateName != ""){
			if (this.templateName.startsWith('internal')){
				switch (RecordType[this.templateName.substring(8) as keyof typeof RecordType]){
					case RecordType.Campaign:
						this.internalTemplate = new CampaignTemplate(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case RecordType.Adventure:
						this.internalTemplate = new AdventureTemplate(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case RecordType.Act:
						this.internalTemplate = new ActTemplate(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case RecordType.Scene:
						this.internalTemplate = new SceneTemplate(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case RecordType.Session:
						this.internalTemplate = new SessionTemplate(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case RecordType.Character:
						this.internalTemplate = new CharacterTemplate(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case RecordType.NonPlayerCharacter:
						this.internalTemplate = new NonPlayerCharacterTemplate(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case RecordType.Clue:
						this.internalTemplate = new ClueTemplate(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case RecordType.Location:
						this.internalTemplate = new LocationTemplate(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case RecordType.Faction:
						this.internalTemplate = new FactionTemplate(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case RecordType.Event:
						this.internalTemplate = new EventTemplate(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case RecordType.Subplot:
						this.internalTemplate = new SubplotTemplate(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;

				}
			} else {
				const templateContentManager = new FileContentManager(this.app, this.templateName);
				await templateContentManager.parse();

				templateFrontmatter = templateContentManager.templateFrontMatter;
				templateContent = templateContentManager.templateContent;
			}
		}

		const frontmatter = {
			alias: [],
			tags: [],
			completed: false,
		};

		this.addFrontmatterData(frontmatter);
		this.mergeFrontmatters(frontmatter, templateFrontmatter);

		const initialCodeblock: string|undefined = this.generateInitialCodeBlock();
		const lastCodeblock: string|undefined = this.generateLastCodeBlock();

		if (this.internalTemplate !== undefined){
			templateContent = this.internalTemplate.getContent();
		}

		return this.generateResponse(frontmatter, initialCodeblock, templateContent, lastCodeblock);
	}

	private generateResponse(
		frontmatter: any,
		initialCodeBlock: string|undefined,
		mainContent: string|undefined,
		lastCodeBlock: string|undefined,
	): string {
		let response = '';

		const frontmatterString = stringifyYaml(frontmatter);
		const frontmatterParsedString = frontmatterString.replaceAll('{}', '');
		response = '---\n' + frontmatterParsedString + '---\n';
		if (initialCodeBlock !== undefined) response += initialCodeBlock;
		response += mainContent ?? '\n';
		if (lastCodeBlock !== undefined) response += lastCodeBlock;

		return response;
	}

	private mergeFrontmatters(
		frontmatter: any,
		additionalFrontMatter: any|undefined,
	): void {
		if (additionalFrontMatter != null){
			Object.entries(frontmatter).forEach(([frontmatterElementName, frontmatterElementValue]: [string, any]) => {

				if (typeof frontmatterElementValue !== 'object'){
					if (additionalFrontMatter[frontmatterElementName] != null) frontmatter[frontmatterElementName] = additionalFrontMatter[frontmatterElementName];
				} else {
					if (this.isArray(frontmatterElementValue)) {
						if (additionalFrontMatter[frontmatterElementName] != null) {
							if (this.isArray(additionalFrontMatter[frontmatterElementName])) {
								Object.entries(additionalFrontMatter[frontmatterElementName]).forEach(([additionalFrontmatterElementName, additionalFrontmatterElementValue]: [string, any]) => {
									let index: number | undefined;
									Object.entries(frontmatterElementValue).forEach(([frontmatterSubElementName, frontmatterSubElementValue]: [string, any]) => {
										if (additionalFrontmatterElementValue === frontmatterSubElementValue) index = +frontmatterSubElementName;
									});

									if (index === undefined) {
										if (
											!(additionalFrontmatterElementValue as string).startsWith('rpgm/template/') &&
											this.tagHelper.getTemplateDataType([additionalFrontmatterElementValue]) === undefined
										) {
											frontmatterElementValue[frontmatterElementValue.length] = additionalFrontmatterElementValue;
										}
									}
								});
							} else {
								this.mergeFrontmatters(frontmatterElementValue, additionalFrontMatter[frontmatterElementName]);
							}
						}
					} else {
						this.mergeFrontmatters(frontmatterElementValue, additionalFrontMatter[frontmatterElementName]);
					}
				}

				if (typeof frontmatter[frontmatterElementValue] === 'object' && additionalFrontMatter[frontmatterElementName] != null){
					frontmatter[frontmatterElementName] = additionalFrontMatter[frontmatterElementName];
				}
			});

			Object.entries(additionalFrontMatter).forEach(([name, childFrontmatter]: [string, any]) => {
				if (frontmatter[name] == null) {
					if (typeof childFrontmatter === 'string') {
						if (!(childFrontmatter as string).startsWith('rpgm/template')) frontmatter[name] = childFrontmatter;
					} else {
						frontmatter[name] = childFrontmatter;
					}
				}
			});
		}
	}

	private isArray(
		list: object
	): boolean{
		let response = false;

		Object.entries(list).forEach(([index, value]: [string, any]) => {
			if (!isNaN(+index)){
				response = true;
			}
		});

		return response;
	}

	protected addFrontmatterData(
		frontmatter: any,
	): any {
		frontmatter.synopsis = "";
	}

	protected generateInitialCodeBlock(
	): string|undefined {
		return undefined;
	}

	protected generateLastCodeBlock(
	): string|undefined {
		return undefined;
	}

	protected generateRpgManagerCodeBlock(
		model: string,
		additionalInformation: any|undefined = undefined,
	): string {
		let response = '```RpgManager\n';
		response += model + '\n';

		if (additionalInformation !== undefined){
			response += stringifyYaml(additionalInformation);
		}

		response += '```\n';

		return response;
	}
}
