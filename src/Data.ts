import {App, CachedMetadata, Component, FrontMatterCache, MetadataCache, TAbstractFile, TFile} from "obsidian";
import {DataType} from "./enums/DataType";
import {RpgFunctions} from "./RpgFunctions";
import {CampaignSetting} from "./enums/CampaignSetting";
import {DateTime} from "obsidian-dataview";
import {PronounFactory} from "./factories/PronounFactory";
import {Pronoun} from "./enums/Pronoun";

export class RpgData extends Component {
	public static index: RpgData;
	private data: RpgDataList;

	public static async initialise(
		app: App,
	) {
		this.index = new RpgData(app);
		this.index.loadCache();
	}

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
		}
	}

	public refreshDataCache(
		file: TFile,
	): void {
		this.loadElement(file);
	}

	private fillNeighbours(
	): void {
		this.getOutlines().forEach((data: OutlineRpgDataInterface) => {
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
		restrictType: boolean = false,
		restrictedToType: DataType|null = null,
	): void {
		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);

		if (metadata?.frontmatter?.tags){
			const fileType = RpgFunctions.getDataType(metadata.frontmatter.tags);

			if (fileType !== null) {
				if (
					!restrictType ||
					(
						(restrictedToType !== null && restrictedToType === fileType) ||
						(restrictedToType === null && (fileType !== DataType.Campaign && fileType !== DataType.Adventure && fileType !== DataType.Session && fileType !== DataType.Scene))
					)
				) {
					switch (fileType) {
						case DataType.Campaign:
							this.data.addElement(new Campaign(file, metadata));
							break;
						case DataType.Adventure:
							this.data.addElement(new Adventure(file, metadata));
							break;
						case DataType.Session:
							this.data.addElement(new Session(file, metadata));
							break;
						case DataType.Scene:
							this.data.addElement(new Scene(file, metadata));
							break;
						case DataType.NonPlayerCharacter:
						case DataType.Character:
							this.data.addElement(new Character(file, metadata));
							break;
						case DataType.Clue:
							this.data.addElement(new Clue(file, metadata));
							break;
						case DataType.Event:
							this.data.addElement(new Event(file, metadata));
							break;
						case DataType.Faction:
							this.data.addElement(new Faction(file, metadata));
							break;
						case DataType.Location:
							this.data.addElement(new Location(file, metadata));
							break;
					}
				}
			}
		}
	}

	public getOutlines(
	): OutlineRpgDataInterface[] {
		return this.data.where((data: RpgDataInterface) =>
			data.isOutline === true
		) as OutlineRpgDataInterface[];
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
	): RpgDataInterface|null {
		const list = this.data.where((data: RpgDataInterface) =>
			data.obsidianId === obsidianId
		);

		return list.length === 1 ? (<RpgDataInterface>list[0]) : null;
	}

	public getElementByName(
		name: string,
	): RpgDataInterface|null {
		const list = this.data.where((data: RpgDataInterface) =>
			data.name === name
		);

		return list.length === 1 ? (<RpgDataInterface>list[0]) : null;
	}
}

export interface RpgDataListInterface {
	elements: RpgDataInterface[];

	getElement(
		obsidianId: string,
	): RpgDataInterface|null;

	addElement(
		element: RpgDataInterface,
	): void;
}

export class RpgDataList implements RpgDataListInterface{
	public elements: RpgDataInterface[] = [];

	public where(
		predicate: any,
	): RpgDataInterface[]|OutlineRpgDataInterface[] {
		return this.elements.filter(predicate);
	}

	public getElement(
		obsidianId: string,
	): RpgDataInterface|null {
		let response = null;

		this.elements.forEach((element: RpgDataInterface) => {
			if (element.obsidianId === obsidianId){
				response = element;
			}
		});

		return response;
	}

	public addElement(
		element: RpgDataInterface,
	): void {
		let isNew = true;

		for (let elementCount = 0; elementCount < this.elements.length; elementCount++) {
			if (this.elements[elementCount].obsidianId === element.obsidianId){
				this.elements[elementCount] = element;
				isNew = false;
			}
		}

		if (isNew) {
			this.elements.push(element);
		}
	}
}

export interface RpgDataInterface {
	type: DataType;

	obsidianId: string;
	isOutline: boolean;

	link: string;
	name: string;
	path: string;
	completed: boolean;

	synopsis: string|null;
	image: string|null;

	campaign: CampaignInterface;

	reload(
		file: TFile,
		metadata: CachedMetadata,
	): void;
}


export abstract class AbstractRpgData implements RpgDataInterface {
	public obsidianId: string;
	public isOutline = false;

	public link: string;
	public name: string;
	public path: string;

	public completed: boolean;
	public synopsis: string|null = null;
	public image: string|null = null;

	public campaign: CampaignInterface;

	protected frontmatter: FrontMatterCache|undefined;

	constructor(
		public type: DataType,
		file: TFile,
		metadata: CachedMetadata,
	) {
		if (type !== DataType.Campaign) this.campaign = RpgData.index.getCampaign(RpgFunctions.getTagId(metadata.frontmatter?.tags, DataType.Campaign))!;
	}

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		this.obsidianId = file.path;

		this.link = '[[' + file.basename + ']]';
		this.name = file.basename;
		this.path = file.path;

		this.frontmatter = metadata.frontmatter;

		this.completed = metadata.frontmatter?.completed ? metadata.frontmatter?.completed : true;
		this.synopsis = metadata.frontmatter?.synopsis;
		this.image = RpgFunctions.getImg(this.name);
	}

	protected initialiseDate(
		date: string|null,
	): Date|null {
		return date ? new Date(date) : null;
	}
}

export interface OutlineRpgDataInterface{
	initialiseNeighbours(): void;
}

export abstract class AbstractOutlineRpgData extends AbstractRpgData implements OutlineRpgDataInterface{
	public isOutline = true;
	constructor(
		type: DataType,
		file: TFile,
		metadata: CachedMetadata,
	) {
		super(type, file, metadata);
	}

	public abstract initialiseNeighbours(
	): void;
}

export interface CampaignInterface extends RpgDataInterface,OutlineRpgDataInterface{
	campaignId: number;
	currentDate: DateTime|null;
	settings: CampaignSetting;
}

export class Campaign extends AbstractOutlineRpgData implements CampaignInterface {
	public campaignId: number;
	public currentDate: DateTime|null;
	public settings: CampaignSetting;

	constructor(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super(DataType.Campaign, file, metadata);

		this.reload(file, metadata);
	}

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		if (this.frontmatter?.tags) this.campaignId = RpgFunctions.getTagId(this.frontmatter?.tags, this.type);
		if (this.frontmatter?.dates?.currentDate) this.currentDate = new Date(this.frontmatter?.dates?.currentDate);
		this.settings = this.frontmatter?.settings ? CampaignSetting[this.frontmatter?.settings as keyof typeof CampaignSetting] : CampaignSetting.Agnostic;
	}

	public initialiseNeighbours(
	): void {
	}
}

export interface AdventureInterface extends RpgDataInterface,OutlineRpgDataInterface {
	adventureId: number;
}

export class Adventure extends AbstractOutlineRpgData implements RpgDataInterface {
	public adventureId: number;

	constructor(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super(DataType.Adventure, file, metadata);

		this.reload(file, metadata);
	}

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		if (metadata.frontmatter?.tags != null) this.adventureId = RpgFunctions.getTagId(metadata.frontmatter?.tags, this.type);
	}

	public initialiseNeighbours(
	): void {
	}
}

export interface SessionInterface extends RpgDataInterface,OutlineRpgDataInterface {
	sessionId: number;
	adventure: AdventureInterface;
	previousSession: SessionInterface|null;
	nextSession: SessionInterface|null;
	date: Date|null;
	irl: Date|null;
}

export class Session extends AbstractOutlineRpgData implements SessionInterface {
	public sessionId: number;
	public date: Date|null;
	public irl: Date|null;

	public adventure: AdventureInterface;
	public previousSession: SessionInterface|null;
	public nextSession: SessionInterface|null;

	constructor(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super(DataType.Session, file, metadata);

		this.reload(file, metadata);
	}

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.sessionId = RpgFunctions.getTagId(metadata.frontmatter?.tags, this.type);
		this.adventure = RpgData.index.getAdventure(this.campaign.campaignId, RpgFunctions.getTagId(this.frontmatter?.tags, DataType.Adventure))!;
		this.date = this.initialiseDate(this.frontmatter?.dates?.session);
		this.irl = this.initialiseDate(this.frontmatter?.dates?.irl);
	}

	public initialiseNeighbours(
	): void {
		if (this.campaign != null && this.adventure != null) {
			this.previousSession = RpgData.index.getSession(this.campaign.campaignId, null, this.sessionId - 1);
			this.nextSession = RpgData.index.getSession(this.campaign.campaignId, null, this.sessionId + 1);
		}
	}
}

export interface SceneInterface extends RpgDataInterface,OutlineRpgDataInterface {
	sceneId: number;
	action: string|null;
	startTime: DateTime|null;
	endTime: DateTime|null;

	adventure: AdventureInterface;
	session: SessionInterface;
	previousScene: SceneInterface|null;
	nextScene: SceneInterface|null;

	get duration(): string;
}

export class Scene extends AbstractOutlineRpgData implements SceneInterface {
	public sceneId: number;
	public action: string|null;
	public startTime: DateTime|null;
	public endTime: DateTime|null;

	public adventure: AdventureInterface;
	public session: SessionInterface;
	public previousScene: SceneInterface|null;
	public nextScene: SceneInterface|null;

	constructor(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super(DataType.Scene, file, metadata);

		this.reload(file, metadata);
	}

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.sceneId = RpgFunctions.getTagId(metadata.frontmatter?.tags, this.type);
		this.adventure = RpgData.index.getAdventure(this.campaign.campaignId, RpgFunctions.getTagId(this.frontmatter?.tags, DataType.Adventure))!;
		this.session = RpgData.index.getSession(this.campaign.campaignId, this.adventure.adventureId, RpgFunctions.getTagId(this.frontmatter?.tags, DataType.Session))!;
		this.startTime = this.initialiseDate(this.frontmatter?.time?.start);
		this.endTime = this.initialiseDate(this.frontmatter?.time?.end);
	}

	public initialiseNeighbours(
	): void {
		if (this.campaign != null && this.adventure != null && this.session != null) {
			this.previousScene = RpgData.index.getScene(this.campaign.campaignId, this.adventure.adventureId, this.session.sessionId, this.sceneId - 1);
			this.nextScene = RpgData.index.getScene(this.campaign.campaignId, this.adventure.adventureId, this.session.sessionId, this.sceneId + 1);
		}
	}

	public get duration(
	): string {
		let response = '';

		if (this.startTime && this.endTime){
			const duration = this.endTime - this.startTime;
			const hours = Math.floor(duration/(1000*60*60));
			const minutes = Math.floor(duration/(1000*60))%60;

			response = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
		}

		return response;
	}
}

export interface CharacterInterface extends RpgDataInterface {
	dob: DateTime|null;
	death: DateTime|null;
	goals: string|null;
	pronoun: Pronoun|null;

	get age(): number|null;
	get isDead(): boolean;
}

export class Character extends AbstractRpgData implements CharacterInterface {
	public dob: DateTime|null;
	public death: DateTime|null;
	public goals: string|null;
	public pronoun: Pronoun|null;

	constructor(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super(RpgFunctions.getDataType(metadata?.frontmatter?.tags) as DataType, file, metadata);

		this.reload(file, metadata);
	}

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.dob = this.initialiseDate(this.frontmatter?.dates?.dob);
		this.death = this.initialiseDate(this.frontmatter?.dates?.death);
		this.goals = this.frontmatter?.goals;
		this.pronoun = this.frontmatter?.pronoun ? PronounFactory.create(this.frontmatter?.pronoun) : null;
	}

	public get age(
	): number|null {
		if (this.dob == null || (this.death == null && this.campaign.currentDate == null)) return null;

		const end = this.death ? this.death : this.campaign.currentDate;
		const duration = end - this.dob;

		const ageDifMs = end.valueOf() - this.dob.valueOf();
		const ageDate = new Date(ageDifMs);

		return (Math.abs(ageDate.getUTCFullYear() - 1970));
	}

	public get isDead(
	): boolean {
		return this.death != null;
	}
}

export interface ClueInterface extends RpgDataInterface {
	found: DateTime|null;

	get isFound(): boolean;
}

export class Clue extends AbstractRpgData implements RpgDataInterface {
	public found: DateTime|null;

	constructor(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super(DataType.Clue, file, metadata);

		this.reload(file, metadata);
	}

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.found = this.initialiseDate(this.frontmatter?.dates?.found);
	}

	public get isFound(
	): boolean {
		return this.found != null;
	}
}

export interface EventInterface extends RpgDataInterface {
	date: DateTime;
}

export class Event extends AbstractRpgData implements EventInterface {
	public date: DateTime;

	constructor(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super(DataType.Event, file, metadata);

		this.reload(file, metadata);
	}

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.date = this.initialiseDate(this.frontmatter?.dates?.event);
	}
}

export interface FactionInterface extends RpgDataInterface {
}

export class Faction extends AbstractRpgData implements FactionInterface {
	constructor(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super(DataType.Faction, file, metadata);

		this.reload(file, metadata);
	}

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);
	}
}

export interface LocationInterface extends RpgDataInterface {
	address: string|null;
}

export class Location extends AbstractRpgData implements LocationInterface {
	public address: string|null;

	constructor(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super(DataType.Location, file, metadata);

		this.reload(file, metadata);
	}

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.address = this.frontmatter?.address;
	}
}
