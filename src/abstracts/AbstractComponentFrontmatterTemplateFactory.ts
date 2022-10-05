import {ComponentFrontmatterTemplateFactoryInterface} from "../templates/factories/interfaces/ComponentFrontmatterTemplateFactoryInterface";
import {App, stringifyYaml} from "obsidian";
import {FileContentManager} from "../helpers/FileContentManager";
import {ComponentNotesTemplateFactoryInterface} from "../templates/factories/interfaces/ComponentNotesTemplateFactoryInterface";
import {ComponentType} from "../databases/enums/ComponentType";
import {CampaignNotesTemplateFactory} from "../templates/factories/notes/CampaignNotesTemplateFactory";
import {AdventureNotesTemplateFactory} from "../templates/factories/notes/AdventureNotesTemplateFactory";
import {CharacterNotesTemplateFactory} from "../templates/factories/notes/CharacterNotesTemplateFactory";
import {NonPlayerCharacterNotesTemplateFactory} from "../templates/factories/notes/NonPlayerCharacterNotesTemplateFactory";
import {ClueNotesTemplateFactory} from "../templates/factories/notes/ClueNotesTemplateFactory";
import {LocationNotesTemplateFactory} from "../templates/factories/notes/LocationNotesTemplateFactory";
import {FactionNotesTemplateFactory} from "../templates/factories/notes/FactionNotesTemplateFactory";
import {EventNotesTemplateFactory} from "../templates/factories/notes/EventNotesTemplateFactory";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {ActNotesTemplateFactory} from "../templates/factories/notes/ActNotesTemplateFactory";
import {SceneNotesTemplateFactory} from "../templates/factories/notes/SceneNotesTemplateFactory";
import {SessionNotesTemplateFactory} from "../templates/factories/notes/SessionNotesTemplateFactory";
import {SubplotNotesTemplateFactory} from "../templates/factories/notes/SubplotNotesTemplateFactory";

export abstract class AbstractComponentFrontmatterTemplateFactory extends AbstractRpgManager implements ComponentFrontmatterTemplateFactoryInterface {
	protected internalTemplate: ComponentNotesTemplateFactoryInterface|undefined;

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
				switch (ComponentType[this.templateName.substring(8) as keyof typeof ComponentType]){
					case ComponentType.Campaign:
						this.internalTemplate = new CampaignNotesTemplateFactory(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Adventure:
						this.internalTemplate = new AdventureNotesTemplateFactory(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Act:
						this.internalTemplate = new ActNotesTemplateFactory(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Scene:
						this.internalTemplate = new SceneNotesTemplateFactory(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Session:
						this.internalTemplate = new SessionNotesTemplateFactory(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Character:
						this.internalTemplate = new CharacterNotesTemplateFactory(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.NonPlayerCharacter:
						this.internalTemplate = new NonPlayerCharacterNotesTemplateFactory(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Clue:
						this.internalTemplate = new ClueNotesTemplateFactory(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Location:
						this.internalTemplate = new LocationNotesTemplateFactory(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Faction:
						this.internalTemplate = new FactionNotesTemplateFactory(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Event:
						this.internalTemplate = new EventNotesTemplateFactory(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Subplot:
						this.internalTemplate = new SubplotNotesTemplateFactory(this.app, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
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
		let response: string;

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
		additionalInformation: any|undefined = undefined,
	): string {
		let response = '```RpgManager\n';

		if (additionalInformation !== undefined){
			response += stringifyYaml(additionalInformation);
		}

		response += '```\n';

		return response.replaceAll("''", "").replaceAll('""', '').replaceAll('{}', '');
	}
}
