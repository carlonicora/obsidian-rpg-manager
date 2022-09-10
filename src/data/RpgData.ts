import {App, CachedMetadata, Component, TFile} from "obsidian";
import {DataType} from "../enums/DataType";
import {CampaignSetting} from "../enums/CampaignSetting";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";
import {RpgDataList} from "./RpgDataList";
import {RpgOutlineDataInterface} from "../interfaces/data/RpgOutlineDataInterface";
import {RpgElementDataInterface} from "../interfaces/data/RpgElementDataInterface";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {RpgDataListInterface} from "../interfaces/data/RpgDataListInterface";
import {AbstractRpgOutlineData} from "../abstracts/AbstractRpgOutlineData";
import {NoteInterface} from "../interfaces/data/NoteInterface";

export class RpgData extends Component {
	private data: RpgDataList;

	constructor(
		private app: App,
	) {
		super();

		this.data = new RpgDataList(this.app);
	}

	public loadCache(
	): void {
		this.loadElements(DataType.Campaign);
		this.loadElements(DataType.Adventure);
		this.loadElements(DataType.Session);
		this.loadElements(DataType.Scene);
		this.loadElements(DataType.Note);
		this.loadElements();
		this.fillNeighbours();

		this.registerEvent(this.app.metadataCache.on('resolve', (file: TFile) => this.refreshDataCache(file)));
		this.registerEvent(this.app.vault.on('rename', (file: TFile, oldPath: string) => this.renameDataCache(file, oldPath)));
		this.registerEvent(this.app.vault.on('delete', (file: TFile) => this.removeDataCache(file)));
	}

	public removeDataCache(
		file: TFile,
	): void {
		let index: number|null = null;
		for (let dataCounter=0; dataCounter<this.data.elements.length; dataCounter++){
			if (this.data.elements[dataCounter].obsidianId === file.path){
				index = dataCounter;
				break;
			}
		}

		if (index != null){
			this.data.elements.splice(index, 1);
			this.fillNeighbours();
			this.app.workspace.trigger("rpgmanager:refresh-views");
		}
	}

	public renameDataCache(
		file: TFile,
		oldPath: string,
	): void {
		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);

		const data = this.getElementByObsidianId(oldPath);

		if (data != null && metadata != null) {
			data.reload(file, metadata);
			this.fillNeighbours();
			this.app.workspace.trigger("rpgmanager:refresh-views");
		}
	}

	public refreshDataCache(
		file: TFile,
	): void {
		this.loadElement(file);
		this.fillNeighbours();
		this.app.workspace.trigger("rpgmanager:refresh-views");
	}

	private fillNeighbours(
	): void {
		this.getOutlines().elements.forEach((data: RpgOutlineDataInterface) => {
			data.initialiseNeighbours();
		});
	}

	private loadElements(
		type: DataType|null = null,
	): void {
		this.app.vault.getMarkdownFiles().forEach((file: TFile) => {
			this.loadElement(file, true, type);
		});
	}

	private loadElement(
		file: TFile,
		restrictType = false,
		restrictedToType: DataType|null = null,
	): void {
		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);

		if (metadata?.frontmatter?.tags){
			const fileType = this.app.plugins.getPlugin('rpg-manager').functions.getDataType(metadata.frontmatter.tags);

			if (fileType !== null) {
				let settings = CampaignSetting.Agnostic;

				if (fileType === DataType.Campaign) {
					if (metadata?.frontmatter?.settings != null) {
						settings = CampaignSetting[metadata.frontmatter.settings as keyof typeof CampaignSetting];
					}
				} else {
					const campaignId = this.app.plugins.getPlugin('rpg-manager').functions.getTagId(metadata.frontmatter.tags, DataType.Campaign);

					if (campaignId != null){
						const campaign = this.getCampaign(campaignId);
						if (campaign != null){
							settings = campaign.settings;
						}
					}
				}

				if (
					!restrictType ||
					(
						(restrictedToType !== null && restrictedToType === fileType) ||
						(restrictedToType === null && (fileType !== DataType.Campaign && fileType !== DataType.Adventure && fileType !== DataType.Session && fileType !== DataType.Scene))
					)
				) {
					const element: RpgOutlineDataInterface|RpgElementDataInterface = this.app.plugins.getPlugin('rpg-manager').factories.data.create(
						settings,
						fileType,
						file,
						metadata
					);

					if (element instanceof AbstractRpgOutlineData) element.initialiseNeighbours();

					this.data.addElement(element);
				}
			}
		}
	}

	public getOutlines(
	): RpgDataListInterface {
		return this.data.where((data: RpgOutlineDataInterface) =>
			data.isOutline === true
		);
	}

	public getCampaign(
		campaignId: number,
	): CampaignInterface|null {
		const campaigns = this.data.where((campaign: CampaignInterface) =>
			campaign.type === DataType.Campaign &&
			campaign.campaignId === campaignId
		);

		return campaigns.elements.length === 1 ? (<CampaignInterface>campaigns.elements[0]) : null;
	}

	public getCampaigns(
	): RpgDataListInterface {
		return this.data
			.where((data: RpgDataInterface) =>
				data.type === DataType.Campaign
			);
	}

	public getAdventure(
		campaignId: number,
		adventureId: number,
	): AdventureInterface|null {
		const adventures = this.data.where((adventure: AdventureInterface) =>
			adventure.type === DataType.Adventure &&
			adventure.campaign.campaignId === campaignId &&
			adventure.adventureId === adventureId
		);
		return adventures.elements.length === 1 ? (<AdventureInterface>adventures.elements[0]) : null;
	}

	public getSession(
		campaignId: number,
		adventureId: number|null,
		sessionId: number,
	): SessionInterface|null {
		const sessions = this.data.where((session: SessionInterface) =>
			session.type === DataType.Session &&
			session.campaign.campaignId === campaignId &&
			(adventureId ? session.adventure.adventureId === adventureId : true) &&
			session.sessionId === sessionId
		);

		return sessions.elements.length === 1 ? (<SessionInterface>sessions.elements[0]) : null;
	}

	public getNote(
		campaignId: number,
		adventureId: number,
		sessionId: number,
	): NoteInterface|null {
		const notes = this.data.where((note: NoteInterface) =>
			note.type === DataType.Note &&
			note.campaign.campaignId === campaignId &&
			note.adventure.adventureId === adventureId &&
			note.sessionId === sessionId
		);

		return notes.elements.length === 1 ? (<NoteInterface>notes.elements[0]) : null;

	}

	public getScene(
		campaignId: number,
		adventureId: number,
		sessionId: number,
		sceneId: number,
	): SceneInterface|null {
		const scenes = this.data.where((scene: SceneInterface) =>
			scene.type === DataType.Scene &&
			scene.campaign != null &&
			scene.campaign.campaignId === campaignId &&
			scene.adventure != null &&
			scene.adventure.adventureId === adventureId &&
			scene.session != null &&
			scene.session.sessionId === sessionId &&
			scene.sceneId === sceneId
		);

		return scenes.elements.length === 1 ? (<SceneInterface>scenes.elements[0]) : null;
	}

	public getElementByObsidianId(
		obsidianId: string,
	): any {
		const list = this.data.where((data: RpgDataInterface) =>
			data.obsidianId === obsidianId
		);

		return list.elements.length === 1 ? (<RpgOutlineDataInterface|RpgElementDataInterface>list.elements[0]) : null;
	}

	public getElementByName(
		name: string,
	): RpgOutlineDataInterface|RpgElementDataInterface|null {
		const list = this.data.where((data: RpgDataInterface) =>
			data.name === name
		);

		return list.elements.length === 1 ? (<RpgOutlineDataInterface|RpgElementDataInterface>list.elements[0]) : null;
	}

	public getElements(
		predicate: any,
	): RpgDataListInterface {
		return this.data.where(predicate);
	}

	public getSessionList(
		campaignId: number|null = null,
		adventureId: number|null = null,
	): RpgDataListInterface {
		return this.data
			.where((data: SessionInterface) =>
				data.type === DataType.Session &&
				(adventureId ? data.adventure.adventureId === adventureId : true) &&
				(campaignId ? data.campaign.campaignId === campaignId : true)
			);
	}

	public getAdventureList(
		campaignId: number|null = null,
	): RpgDataListInterface {
		return this.data
			.where((data: AdventureInterface) =>
				data.type === DataType.Adventure &&
				(campaignId ? data.campaign.campaignId === campaignId : true)
			);
	}

	public getCharacterList(
		campaignId: number|null = null,
	): RpgDataListInterface {
		return this.data
			.where((data: CharacterInterface) =>
				(data.type === DataType.Character || data.type === DataType.NonPlayerCharacter) &&
				(campaignId ? data.campaign.campaignId === campaignId : true)
			);
	}

	public getPlayerCharacterList(
		campaignId: number|null = null,
	): RpgDataListInterface {
		return this.data
			.where((data: CharacterInterface) =>
				data.type === DataType.Character &&
				(campaignId ? data.campaign.campaignId === campaignId : true)
			);
	}

	public getSceneList(
		campaignId: number,
		adventureId: number,
		sessionId: number,
	): RpgDataListInterface {
		return this.data
			.where((data: SceneInterface) =>
				data.type === DataType.Scene &&
				data.campaign.campaignId === campaignId &&
				data.adventure.adventureId === adventureId &&
				data.session.sessionId === sessionId
			)
			.sort(function (leftData: SceneInterface, rightData: SceneInterface) {
				if (leftData.sceneId > rightData.sceneId) { return 1; }
				if (leftData.sceneId < rightData.sceneId) {return -1; }
				return 0;
			});
	}

	public getType(
		type: DataType,
	): RpgDataListInterface {
		return this.data
			.where((data: RpgDataInterface) =>
				data.type === type,
			);
	}

	public getRelationshipList(
		currentElement: RpgDataInterface,
		type: DataType,
		parentType: DataType|null = null,
	): RpgOutlineDataInterface[]|RpgElementDataInterface[]
	{
		const response: RpgDataInterface[] = [];

		const variableSingular = DataType[type].toLowerCase();
		const variablePlural = variableSingular + 's';

		let comparison;

		if (parentType === null) {
			comparison = function (data: RpgDataInterface): boolean {
				return currentElement.frontmatter?.relationships != undefined &&
					currentElement.frontmatter?.relationships[variablePlural] != undefined &&
					currentElement.frontmatter?.relationships[variablePlural][data.name] !== undefined;
			}.bind(this);
		} else {
			const variableParentSingular = DataType[parentType].toLowerCase();
			const variableParentPlural = variableParentSingular + 's';
			comparison = function (data: RpgDataInterface): boolean {
				return (type !== DataType.Character ? data.type === type : (data.type === DataType.Character || data.type === DataType.NonPlayerCharacter)) &&
					data.frontmatter?.relationships != undefined &&
					data.frontmatter?.relationships[variableParentPlural] != undefined &&
					data.frontmatter?.relationships[variableParentPlural][currentElement.name] !== undefined;
			}.bind(this);
		}

		this.getElements(comparison)
			.sort(function (leftData: RpgDataInterface, rightData: RpgDataInterface) {
				if (leftData.name > rightData.name) { return 1; }
				if (leftData.name < rightData.name) {return -1; }
				return 0;
			})
			.elements
			.forEach((data: RpgDataInterface) => {
				data.additionalInformation = parentType === null ?
					currentElement.frontmatter?.relationships[variablePlural][data.name] :
					data.frontmatter?.relationships[DataType[parentType].toLowerCase() + 's'][currentElement.name];

				response.push(data)
			})

		currentElement.links.forEach((link: string) => {
			const data = this.getElementByName(link);

			if (data != null && data.type === type && !this.contains(response, data)) {
				data.additionalInformation = null;
				response.push(data);
			}
		});

		return response as RpgOutlineDataInterface[]|RpgElementDataInterface[];
	}

	private contains(
		list: RpgDataInterface[],
		newElement: RpgDataInterface
	): boolean {
		let response = false;
		list.forEach((data:RpgDataInterface) => {
			if (data.obsidianId === newElement.obsidianId) response = true;
		});
		return response;
	}
}
