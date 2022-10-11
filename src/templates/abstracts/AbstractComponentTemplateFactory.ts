import {ComponentTemplateFactoryInterface} from "../factories/interfaces/ComponentTemplateFactoryInterface";
import {App, stringifyYaml} from "obsidian";
import {FileContentManager} from "../../helpers/FileContentManager";
import {ComponentNotesTemplateFactoryInterface} from "../factories/interfaces/ComponentNotesTemplateFactoryInterface";
import {ComponentType} from "../../databases/enums/ComponentType";
import {CampaignNotesTemplateFactory} from "../factories/notes/CampaignNotesTemplateFactory";
import {AdventureNotesTemplateFactory} from "../factories/notes/AdventureNotesTemplateFactory";
import {CharacterNotesTemplateFactory} from "../factories/notes/CharacterNotesTemplateFactory";
import {NonPlayerCharacterNotesTemplateFactory} from "../factories/notes/NonPlayerCharacterNotesTemplateFactory";
import {ClueNotesTemplateFactory} from "../factories/notes/ClueNotesTemplateFactory";
import {LocationNotesTemplateFactory} from "../factories/notes/LocationNotesTemplateFactory";
import {FactionNotesTemplateFactory} from "../factories/notes/FactionNotesTemplateFactory";
import {EventNotesTemplateFactory} from "../factories/notes/EventNotesTemplateFactory";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {ActNotesTemplateFactory} from "../factories/notes/ActNotesTemplateFactory";
import {SceneNotesTemplateFactory} from "../factories/notes/SceneNotesTemplateFactory";
import {SessionNotesTemplateFactory} from "../factories/notes/SessionNotesTemplateFactory";
import {SubplotNotesTemplateFactory} from "../factories/notes/SubplotNotesTemplateFactory";
import {ControllerMetadataDataInterface} from "../../metadatas/controllers/ControllerMetadataDataInterface";
import {ControllerMetadataInterface} from "../../metadatas/controllers/ControllerMetadataInterface";
import {Md5} from "ts-md5";

export abstract class AbstractComponentTemplateFactory extends AbstractRpgManager implements ComponentTemplateFactoryInterface {
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

		const dataCodeblock: string = this.generateDataCodeBlock();
		const initialCodeblock: string = this.generateInitialCodeBlock();
		const lastCodeblock: string|undefined = this.generateLastCodeBlock();

		if (this.internalTemplate !== undefined){
			templateContent = this.internalTemplate.getContent();
		}

		const idCodeBlock: string  = this.generateRpgManagerIDCodeBlock(this.generateID())

		return this.generateResponse(frontmatter, dataCodeblock, initialCodeblock, templateContent, lastCodeblock, idCodeBlock);
	}

	private generateResponse(
		frontmatter: any,
		dataCodebBlock: string|undefined,
		initialCodeBlock: string|undefined,
		mainContent: string|undefined,
		lastCodeBlock: string|undefined,
		idCodeBlock: string,
	): string {
		let response: string;

		const frontmatterString = stringifyYaml(frontmatter);
		const frontmatterParsedString = frontmatterString.replaceAll('{}', '');
		response = '---\n' + frontmatterParsedString + '---\n';
		response += dataCodebBlock;
		response += initialCodeBlock;
		response += mainContent ?? '\n';
		if (lastCodeBlock !== undefined) response += lastCodeBlock;
		response += idCodeBlock;

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

	protected generateDataCodeBlock(
	): string {
		return '';
	}

	protected generateInitialCodeBlock(
	): string {
		return '';
	}

	protected generateLastCodeBlock(
	): string|undefined {
		return undefined;
	}

	protected generateID(
	): string {
		return '';
	}

	protected generateRpgManagerDataCodeBlock(
		metadata: ControllerMetadataDataInterface,
	): string {
		let response = '```RpgManagerData\n';
		response += stringifyYaml(metadata);
		response += '```\n';

		return response.replaceAll("''", "").replaceAll('""', '').replaceAll('{}', '');
	}

	protected generateRpgManagerCodeBlock(
		metadata: ControllerMetadataInterface,
	): string {
		let response = '```RpgManager\n';
		response += stringifyYaml(metadata);
		response += '```\n';

		return response.replaceAll("''", "").replaceAll('""', '').replaceAll('{}', '');
	}

	protected generateRpgManagerIDCodeBlock(
		ID: string,
	): string {
		const metadata = {
			id: ID,
			checksum: Md5.hashStr(ID),
		};

		let response = '```RpgManagerID\n';
		response += stringifyYaml(metadata);
		response += '```\n';

		return response;
	}
}
