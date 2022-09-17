import {TemplateFactoryInterface} from "../interfaces/TemplateFactoryInterface";
import {App, stringifyYaml} from "obsidian";
import {FileContentManager} from "../helpers/FileContentManager";
import {RpgCodeBlockInterface} from "../interfaces/RpgCodeBlockInterface";
import {TemplateInterface} from "../interfaces/TemplateInterface";
import {DataType} from "../enums/DataType";
import {CampaignTemplate} from "../templates/CampaignTemplate";
import {AdventureTemplate} from "../templates/AdventureTemplate";
import {CharacterTemplate} from "../templates/CharacterTemplate";
import {NonPlayerCharacterTemplate} from "../templates/NonPlayerCharacterTemplate";
import {ClueTemplate} from "../templates/ClueTemplate";
import {LocationTemplate} from "../templates/LocationTemplate";
import {FactionTemplate} from "../templates/FactionTemplate";
import {EventTemplate} from "../templates/EventTemplate";
import {NoteTemplate} from "../templates/NoteTemplate";
import {TimelineTemplate} from "../templates/TimelineTemplate";

export abstract class AbstractTemplateFactory implements TemplateFactoryInterface {
	protected internalTemplate: TemplateInterface|undefined;

	constructor(
		protected app: App,
		protected templateName: string,
		protected name: string,
		protected campaignId: number|undefined,
		protected adventureId: number|undefined,
		protected sessionId: number|undefined,
		protected sceneId: number|undefined,
		protected additionalInformation: any|null,
	) {
	}

	public async generateData(
	): Promise<string> {
		let templateFrontmatter: any|undefined;
		let templateContent: string|undefined;

		if (this.templateName != null && this.templateName != ""){
			if (this.templateName.startsWith('internal')){
				switch (DataType[this.templateName.substring(8) as keyof typeof DataType]){
					case DataType.Campaign:
						this.internalTemplate = new CampaignTemplate(this.app, this.name, this.campaignId, this.adventureId, this.sessionId, this.sceneId, this.additionalInformation);
						break;
					case DataType.Adventure:
						this.internalTemplate = new CampaignTemplate(this.app, this.name, this.campaignId, this.adventureId, this.sessionId, this.sceneId, this.additionalInformation);
						break;
					case DataType.Session:
						this.internalTemplate = new CampaignTemplate(this.app, this.name, this.campaignId, this.adventureId, this.sessionId, this.sceneId, this.additionalInformation);
						break;
					case DataType.Scene:
						this.internalTemplate = new AdventureTemplate(this.app, this.name, this.campaignId, this.adventureId, this.sessionId, this.sceneId, this.additionalInformation);
						break;
					case DataType.Character:
						this.internalTemplate = new CharacterTemplate(this.app, this.name, this.campaignId, this.adventureId, this.sessionId, this.sceneId, this.additionalInformation);
						break;
					case DataType.NonPlayerCharacter:
						this.internalTemplate = new NonPlayerCharacterTemplate(this.app, this.name, this.campaignId, this.adventureId, this.sessionId, this.sceneId, this.additionalInformation);
						break;
					case DataType.Clue:
						this.internalTemplate = new ClueTemplate(this.app, this.name, this.campaignId, this.adventureId, this.sessionId, this.sceneId, this.additionalInformation);
						break;
					case DataType.Location:
						this.internalTemplate = new LocationTemplate(this.app, this.name, this.campaignId, this.adventureId, this.sessionId, this.sceneId, this.additionalInformation);
						break;
					case DataType.Faction:
						this.internalTemplate = new FactionTemplate(this.app, this.name, this.campaignId, this.adventureId, this.sessionId, this.sceneId, this.additionalInformation);
						break;
					case DataType.Event:
						this.internalTemplate = new EventTemplate(this.app, this.name, this.campaignId, this.adventureId, this.sessionId, this.sceneId, this.additionalInformation);
						break;
					case DataType.Note:
						this.internalTemplate = new NoteTemplate(this.app, this.name, this.campaignId, this.adventureId, this.sessionId, this.sceneId, this.additionalInformation);
						break;
					case DataType.Timeline:
						this.internalTemplate = new TimelineTemplate(this.app, this.name, this.campaignId, this.adventureId, this.sessionId, this.sceneId, this.additionalInformation);
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

		const initialCodeblock: RpgCodeBlockInterface|undefined = this.generateInitialCodeBlock();
		const lastCodeblock: RpgCodeBlockInterface|undefined = this.generateLastCodeBlock();

		if (this.internalTemplate !== undefined){
			templateContent = this.internalTemplate.getContent();
		}

		return this.generateResponse(frontmatter, initialCodeblock, templateContent, lastCodeblock);
	}

	private generateResponse(
		frontmatter: any,
		initialCodeBlock: RpgCodeBlockInterface|undefined,
		mainContent: string|undefined,
		lastCodeBlock: RpgCodeBlockInterface|undefined,
	): string {
		let response = '';

		const frontmatterString = stringifyYaml(frontmatter);
		const frontmatterParsedString = frontmatterString.replaceAll('{}', '');
		response = '---\n' + frontmatterParsedString + '\n---\n';
		if (initialCodeBlock !== undefined) response += initialCodeBlock.toString();
		response += mainContent ?? '\n';
		if (lastCodeBlock !== undefined) response += lastCodeBlock.toString();

		return response;
	}

	private mergeFrontmatters(
		frontmatter: any,
		additionalFrontMatter: any|undefined,
	): void {
		if (additionalFrontMatter !== undefined){
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
										if (!(additionalFrontmatterElementValue as string).startsWith('rpgm/template/')) frontmatterElementValue[frontmatterElementValue.length] = additionalFrontmatterElementValue;
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
				if (frontmatter[name] == null && !(childFrontmatter as string).startsWith('rpgm/template')) {
					frontmatter[name] = childFrontmatter;
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
		frontmatter.image = "";
	}

	protected generateInitialCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return undefined;
	}

	protected generateLastCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return undefined;
	}
}
