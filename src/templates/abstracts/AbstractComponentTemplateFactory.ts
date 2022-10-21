import {ComponentTemplateFactoryInterface} from "../factories/interfaces/ComponentTemplateFactoryInterface";
import {App} from "obsidian";
import {FileContentManager} from "../../helpers/FileContentManager";
import {ComponentNotesTemplateFactoryInterface} from "../factories/interfaces/ComponentNotesTemplateFactoryInterface";
import {ComponentType} from "../../components/enums/ComponentType";
import {CampaignNotesTemplateFactory} from "../../components/components/campaign/templates/CampaignNotesTemplateFactory";
import {AdventureNotesTemplateFactory} from "../../components/components/adventure/templates/AdventureNotesTemplateFactory";
import {CharacterNotesTemplateFactory} from "../../components/components/character/templates/CharacterNotesTemplateFactory";
import {NonPlayerCharacterNotesTemplateFactory} from "../../components/components/character/templates/NonPlayerCharacterNotesTemplateFactory";
import {ClueNotesTemplateFactory} from "../../components/components/clue/templates/ClueNotesTemplateFactory";
import {LocationNotesTemplateFactory} from "../../components/components/location/templates/LocationNotesTemplateFactory";
import {FactionNotesTemplateFactory} from "../../components/components/faction/templates/FactionNotesTemplateFactory";
import {EventNotesTemplateFactory} from "../../components/components/event/templates/EventNotesTemplateFactory";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {ActNotesTemplateFactory} from "../../components/components/act/templates/ActNotesTemplateFactory";
import {SceneNotesTemplateFactory} from "../../components/components/scene/templates/SceneNotesTemplateFactory";
import {SessionNotesTemplateFactory} from "../../components/components/session/templates/SessionNotesTemplateFactory";
import {SubplotNotesTemplateFactory} from "../../components/components/subplot/templates/SubplotNotesTemplateFactory";
import {ControllerMetadataDataInterface} from "../../controller/interfaces/ControllerMetadataDataInterface";
import {ControllerMetadataInterface} from "../../controller/interfaces/ControllerMetadataInterface";
import {Md5} from "ts-md5";
import {YamlHelper} from "../../helpers/YamlHelper";

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
		this._mergeFrontmatters(frontmatter, templateFrontmatter);

		const dataCodeblock: string = this.generateDataCodeBlock();
		const initialCodeblock: string = this.generateInitialCodeBlock();
		const lastCodeblock: string|undefined = this.generateLastCodeBlock();

		if (this.internalTemplate !== undefined){
			templateContent = this.internalTemplate.getContent();
		}

		const idCodeBlock: string  = this.generateRpgManagerIDCodeBlock(this.generateID())

		return this._generateResponse(frontmatter, dataCodeblock, initialCodeblock, templateContent, lastCodeblock, idCodeBlock);
	}

	private _generateResponse(
		frontmatter: any,
		dataCodebBlock: string|undefined,
		initialCodeBlock: string|undefined,
		mainContent: string|undefined,
		lastCodeBlock: string|undefined,
		idCodeBlock: string,
	): string {
		let response: string;

		const frontmatterString = YamlHelper.stringify(frontmatter);
		const frontmatterParsedString = frontmatterString.replaceAll('{}', '');
		response = '---\n' + frontmatterParsedString + '---\n';
		response += dataCodebBlock;
		response += initialCodeBlock;
		response += mainContent ?? '\n';
		if (lastCodeBlock !== undefined) response += lastCodeBlock;
		response += idCodeBlock;

		return response;
	}

	private _mergeFrontmatters(
		frontmatter: any,
		additionalFrontMatter: any|undefined,
	): void {
		if (additionalFrontMatter != null){
			Object.entries(frontmatter).forEach(([frontmatterElementName, frontmatterElementValue]: [string, any]) => {

				if (typeof frontmatterElementValue !== 'object'){
					if (additionalFrontMatter[frontmatterElementName] != null) frontmatter[frontmatterElementName] = additionalFrontMatter[frontmatterElementName];
				} else {
					if (this._isArray(frontmatterElementValue)) {
						if (additionalFrontMatter[frontmatterElementName] != null) {
							if (this._isArray(additionalFrontMatter[frontmatterElementName])) {
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
								this._mergeFrontmatters(frontmatterElementValue, additionalFrontMatter[frontmatterElementName]);
							}
						}
					} else {
						this._mergeFrontmatters(frontmatterElementValue, additionalFrontMatter[frontmatterElementName]);
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

	private _isArray(
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
		response += YamlHelper.stringify(metadata);
		response += '```\n';

		return response.replaceAll("''", "").replaceAll('""', '').replaceAll('{}', '');
	}

	protected generateRpgManagerCodeBlock(
		metadata: ControllerMetadataInterface,
	): string {
		let response = '```RpgManager\n';
		response += YamlHelper.stringify(metadata);
		response += '```\n';

		return response.replaceAll("''", "").replaceAll('""', '').replaceAll('{}', '');
	}

	protected generateRpgManagerIDCodeBlock(
		id: string,
	): string {
		const metadata = {
			id: id,
			checksum: Md5.hashStr(id),
		};

		let response = '```RpgManagerID\n';
		response += '### DO NOT EDIT MANUALLY IF NOT INSTRUCTED TO DO SO ###\n';
		response += YamlHelper.stringify(metadata);
		response += '```\n';

		return response;
	}
}
