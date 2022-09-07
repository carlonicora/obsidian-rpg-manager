import {App, CachedMetadata, Component, TFile} from "obsidian";
import {DataType} from "../enums/DataType";
import {CampaignSetting} from "../enums/CampaignSetting";
import {DataFactory, SingleDataKey} from "../factories/DataFactory";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";
import {RpgDataList} from "./RpgDataList";
import {RpgOutlineDataInterface} from "../interfaces/data/RpgOutlineDataInterface";
import {RpgElementDataInterface} from "../interfaces/data/RpgElementDataInterface";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";

export class RpgData extends Component {
	private data: RpgDataList;

	constructor(
		private app: App,
	) {
		super();

		this.data = new RpgDataList();
	}

	public loadCache(
	): void {
		this.loadElements(DataType.Campaign);
		this.loadElements(DataType.Adventure);
		this.loadElements(DataType.Session);
		this.loadElements(DataType.Scene);
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
			this.app.workspace.trigger("rpgmanager:refresh-views");
		}
	}

	public refreshDataCache(
		file: TFile,
	): void {
		this.loadElement(file);
		this.app.workspace.trigger("rpgmanager:refresh-views");
	}

	private fillNeighbours(
	): void {
		this.getOutlines().forEach((data: RpgOutlineDataInterface) => {
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
				if (fileType !== DataType.Campaign) {
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
					this.data.addElement(
						DataFactory.create(
							CampaignSetting[settings] + DataType[fileType] as SingleDataKey<any>,
							this.app,
							fileType,
							file,
							metadata
						)
					);
					/*
					switch (fileType) {
						case DataType.Campaign:
							this.data.addElement(new Campaign(DataType.Campaign, file, metadata));
							break;
						case DataType.Adventure:
							this.data.addElement(new Adventure(DataType.Adventure, file, metadata));
							break;
						case DataType.Session:
							this.data.addElement(new Session(DataType.Session, file, metadata));
							break;
						case DataType.Scene:
							this.data.addElement(new Scene(DataType.Scene, file, metadata));
							break;
						case DataType.NonPlayerCharacter:
							this.data.addElement(new Character(DataType.NonPlayerCharacter, file, metadata));
							break;
						case DataType.Character:
							this.data.addElement(new Character(DataType.Character, file, metadata));
							break;
						case DataType.Clue:
							this.data.addElement(new Clue(DataType.Clue, file, metadata));
							break;
						case DataType.Event:
							this.data.addElement(new Event(DataType.Event, file, metadata));
							break;
						case DataType.Faction:
							this.data.addElement(new Faction(DataType.Faction, file, metadata));
							break;
						case DataType.Location:
							this.data.addElement(new Location(DataType.Location, file, metadata));
							break;
					}
					*/
				}
			}
		}
	}

	public getOutlines(
	): RpgOutlineDataInterface[] {
		return this.data.where((data: RpgOutlineDataInterface) =>
			data.isOutline === true
		) as RpgOutlineDataInterface[];
	}

	public getCampaign(
		campaignId: number,
	): CampaignInterface|null {
		const campaigns = this.data.where((campaign: CampaignInterface) =>
			campaign.type === DataType.Campaign &&
			campaign.campaignId === campaignId
		);

		return campaigns.length === 1 ? (<CampaignInterface>campaigns[0]) : null;
	}

	public getCampaigns(
	): CampaignInterface[] {
		return this.data
			.where((data: RpgDataInterface) =>
				data.type === DataType.Campaign
			) as CampaignInterface[];
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
		return adventures.length === 1 ? (<AdventureInterface>adventures[0]) : null;
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

		return sessions.length === 1 ? (<SessionInterface>sessions[0]) : null;
	}

	public getScene(
		campaignId: number,
		adventureId: number,
		sessionId: number,
		sceneId: number,
	): SceneInterface|null {
		const scenes = this.data.where((scene: SceneInterface) =>
			scene.type === DataType.Session &&
			scene.campaign != null &&
			scene.campaign.campaignId === campaignId &&
			scene.adventure != null &&
			scene.adventure.adventureId === adventureId &&
			scene.session != null &&
			scene.session.sessionId === sessionId &&
			scene.sceneId === sceneId
		);

		return scenes.length === 1 ? (<SceneInterface>scenes[0]) : null;
	}

	public getElementByObsidianId(
		obsidianId: string,
	): RpgOutlineDataInterface|RpgElementDataInterface|null {
		const list = this.data.where((data: RpgDataInterface) =>
			data.obsidianId === obsidianId
		);

		return list.length === 1 ? (<RpgOutlineDataInterface|RpgElementDataInterface>list[0]) : null;
	}

	public getElementByName(
		name: string,
	): RpgOutlineDataInterface|RpgElementDataInterface|null {
		const list = this.data.where((data: RpgDataInterface) =>
			data.name === name
		);

		return list.length === 1 ? (<RpgOutlineDataInterface|RpgElementDataInterface>list[0]) : null;
	}

	public getElements(
		predicate: any,
	): RpgOutlineDataInterface[]|RpgElementDataInterface[] {
		return this.data.where(predicate) as RpgOutlineDataInterface[]|RpgElementDataInterface[];
	}

	public getSessionList(
		adventureId: number|null = null,
	): SessionInterface[] {
		return this.data
			.where((data: SessionInterface) =>
				data.type === DataType.Session &&
				(adventureId ? data.adventure.adventureId === adventureId : true)
			) as SessionInterface[];
	}

	public getAdventureList(
		campaignId: number|null = null,
	): AdventureInterface[] {
		return this.data
			.where((data: AdventureInterface) =>
				data.type === DataType.Adventure &&
				(campaignId ? data.campaign.campaignId === campaignId : true)
			) as AdventureInterface[];
	}

	public getCharacterList(
	): CharacterInterface[] {
		return this.data
			.where((data: CharacterInterface) =>
				(data.type === DataType.Character || data.type === DataType.NonPlayerCharacter)
			) as CharacterInterface[];
	}

	public getSceneList(
		campaignId: number,
		adventureId: number,
		sessionId: number,
	): SceneInterface[] {
		return this.data
			.where((data: SceneInterface) =>
				data.type === DataType.Scene &&
				data.campaign.campaignId === campaignId &&
				data.adventure.adventureId === adventureId &&
				data.session.sessionId === sessionId
			) as SceneInterface[];
	}

	public getType(
		type: DataType,
	): RpgOutlineDataInterface[]|RpgElementDataInterface[] {
		return this.data
			.where((data: RpgDataInterface) =>
				data.type === type,
			) as RpgOutlineDataInterface[]|RpgElementDataInterface[];
	}

	public getRelationshipList(
		currentElement: RpgDataInterface,
		type: DataType,
		parentType: DataType|null = null,
		//sorting: ArrayFunc<any, any>|null = null,
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
			//.sort(
			//	(sorting !== null ? sorting : defaultSorting)
			//)
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
