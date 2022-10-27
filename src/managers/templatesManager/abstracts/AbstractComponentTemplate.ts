import {ComponentNotesInterface} from "../interfaces/ComponentNotesInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignNotesTemplate} from "../../../components/campaign/templates/CampaignNotesTemplate";
import {AdventureNotesTemplate} from "../../../components/adventure/templates/AdventureNotesTemplate";
import {CharacterNotesTemplate} from "../../../components/character/templates/CharacterNotesTemplate";
import {NonPlayerCharacterNotesTemplate} from "../../../components/character/templates/NonPlayerCharacterNotesTemplate";
import {ClueNotesTemplate} from "../../../components/clue/templates/ClueNotesTemplate";
import {LocationNotesTemplate} from "../../../components/location/templates/LocationNotesTemplate";
import {FactionNotesTemplate} from "../../../components/faction/templates/FactionNotesTemplate";
import {EventNotesTemplate} from "../../../components/event/templates/EventNotesTemplate";
import {ActNotesTemplate} from "../../../components/act/templates/ActNotesTemplate";
import {SceneNotesTemplate} from "../../../components/scene/templates/SceneNotesTemplate";
import {SessionNotesTemplate} from "../../../components/session/templates/SessionNotesTemplate";
import {SubplotNotesTemplate} from "../../../components/subplot/templates/SubplotNotesTemplate";
import {ControllerMetadataDataInterface} from "../../controllerManager/interfaces/ControllerMetadataDataInterface";
import {ControllerMetadataInterface} from "../../controllerManager/interfaces/ControllerMetadataInterface";
import {Md5} from "ts-md5";
import {TemplateInterface} from "../interfaces/TemplateInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {TagService} from "../../../services/tagService/TagService";
import {YamlService} from "../../../services/yamlService/YamlService";
import {FileContentManager} from "../workers/FileContentManager";

export abstract class AbstractComponentTemplate implements TemplateInterface {
	protected internalTemplate: ComponentNotesInterface|undefined;

	constructor(
		protected api: RpgManagerApiInterface,
		protected templateName: string,
		protected name: string,
		protected campaignId: number|undefined,
		protected adventureId: number|undefined,
		protected actId: number|undefined,
		protected sceneId: number|undefined,
		protected sessionId: number|undefined,
		protected additionalInformation: any|null,
	) {
	}

	public async generateData(
	): Promise<string> {
		let templateFrontmatter: any|undefined;
		let templateContent: string|undefined;

		if (this.templateName != null && this.templateName != ""){
			if (this.templateName.startsWith('internal')){
				switch (ComponentType[this.templateName.substring(8) as keyof typeof ComponentType]){
					case ComponentType.Campaign:
						this.internalTemplate = new CampaignNotesTemplate(this.api, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Adventure:
						this.internalTemplate = new AdventureNotesTemplate(this.api, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Act:
						this.internalTemplate = new ActNotesTemplate(this.api, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Scene:
						this.internalTemplate = new SceneNotesTemplate(this.api, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Session:
						this.internalTemplate = new SessionNotesTemplate(this.api, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Character:
						this.internalTemplate = new CharacterNotesTemplate(this.api, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.NonPlayerCharacter:
						this.internalTemplate = new NonPlayerCharacterNotesTemplate(this.api, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Clue:
						this.internalTemplate = new ClueNotesTemplate(this.api, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Location:
						this.internalTemplate = new LocationNotesTemplate(this.api, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Faction:
						this.internalTemplate = new FactionNotesTemplate(this.api, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Event:
						this.internalTemplate = new EventNotesTemplate(this.api, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;
					case ComponentType.Subplot:
						this.internalTemplate = new SubplotNotesTemplate(this.api, this.name, this.campaignId, this.adventureId, this.actId, this.sceneId, this.sessionId, this.additionalInformation);
						break;

				}
			} else {
				const templateContentManager = new FileContentManager(this.api, this.templateName);
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

		const idCodeBlock: string  = this.generateRpgManagerIDCodeBlock(this.generateID());

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

		const frontmatterString = this.api.service(YamlService).stringify(frontmatter);
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
											this.api.service(TagService).getTemplateDataType([additionalFrontmatterElementValue]) === undefined
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
		response += this.api.service(YamlService).stringify(metadata);
		response += '```\n';

		return response.replaceAll("''", "").replaceAll('""', '').replaceAll('{}', '');
	}

	protected generateRpgManagerCodeBlock(
		metadata: ControllerMetadataInterface,
	): string {
		let response = '```RpgManager\n';
		response += this.api.service(YamlService).stringify(metadata);
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
		response += this.api.service(YamlService).stringify(metadata);
		response += '```\n';

		return response;
	}
}
