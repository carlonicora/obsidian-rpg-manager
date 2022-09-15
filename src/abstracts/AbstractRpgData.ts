import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";
import {App, CachedMetadata, TFile} from "obsidian";
import {DataType} from "../enums/DataType";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {ElementNotFoundError} from "../errors/ElementNotFoundError";
import {NoteInterface} from "../interfaces/data/NoteInterface";
import {ElementDuplicated} from "../errors/ElementDuplicated";
import {HiddenError} from "../errors/HiddenError";
import {RpgDataListInterface} from "../interfaces/data/RpgDataListInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {BaseCampaignInterface} from "../interfaces/data/BaseCampaignInterface";

export abstract class AbstractRpgData implements RpgDataInterface {
	public frontmatter: any;

	public tags: Array<string>;

	public completed: boolean;
	public synopsis: string|null = null;
	public additionalInformation: string|null = null;
	public imageSrc: string|null|undefined = undefined;

	public isOutline: boolean;
	public campaign: BaseCampaignInterface;

	protected relationships: Map<string, RelationshipInterface> = new Map();

	private metadata: CachedMetadata;

	constructor(
		protected app: App,
		public tag:string,
		public type: DataType,
		public file: TFile,
	) {
	}

	public async initialise(
	): Promise<void> {
		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(this.file);
		if (metadata === null) throw new Error('metadata is null');

		this.metadata = metadata;
		this.frontmatter = this.metadata.frontmatter ?? {};
		this.tags = this.app.plugins.getPlugin('rpg-manager').tagManager.sanitiseTags(this.frontmatter?.tags);

		this.completed = this.frontmatter.completed ? this.frontmatter.completed : true;
		this.synopsis = this.frontmatter.synopsis;

		await this.app.plugins.getPlugin('rpg-manager').factories.relationships.read(this.file, this.relationships);

		this.loadData();
	}

	protected loadData(
	): void {
	}

	public async reload(
	): Promise<void> {
		await this.initialise();
		await this.loadData();
	}

	public async loadHierarchy(
		dataList: RpgDataListInterface,
	): Promise<void> {
		if (this.type !== DataType.Campaign) this.campaign = this.loadCampaign(dataList);
	}

	public async loadRelationships(
	): Promise<void> {
		this.relationships.forEach((relationship: RelationshipInterface, name: string) => {
			const elements = this.app.plugins.getPlugin('rpg-manager').io.getElements((data: RpgDataInterface) => data.name === name).elements;
			switch (elements.length){
				case 0:
					relationship.component = undefined;
					break;
				case 1:
					relationship.component = elements[0]
					break;
			}
		});
	}

	public async loadReverseRelationships(
	): Promise<void> {
		if (!this.isOutline) {
			this.relationships.forEach((relationship: RelationshipInterface, name: string) => {
				if (relationship.component !== undefined && relationship.isInFrontmatter === true){
					relationship.component.addReverseRelationship(
						this.name,
						{
							component: this,
							description: relationship.description,
							isReverse: true,
							isInFrontmatter: true,
						}
					)
				}
			});
		}
	}

	public addReverseRelationship(
		name: string,
		relationship: RelationshipInterface,
	): void {
		this.relationships.set(name, relationship);
	}

	public get name(
	): string {
		return this.file.basename;
	}

	public get path(
	): string {
		return this.file.path;
	}

	public get link(
	): string {
		return '[[' + this.name + ']]'
	}

	public get imageSrcElement(
	): HTMLElement|null {
		if (this.imageSrc === null) return null;

		return this.app.plugins.getPlugin('rpg-manager').functions.getImgElement(this.image);
	}

	public get folder(
	): string {
		const lastSlashPosition = this.path.lastIndexOf('/');
		return (lastSlashPosition !== -1 ? this.path.substring(0, lastSlashPosition + 1) : '/');
	}

	public get image(
	): string|null {
		return this.app.plugins.getPlugin('rpg-manager').functions.getImg(this.name);
	}

	public getRelationships(
		type: DataType,
		isReversedRelationship = false,
	): RpgDataInterface[] {
		const response:RpgDataInterface[] = [];

		this.relationships.forEach((data: RelationshipInterface, name: string) => {
			if (data.component !== undefined && data.component.type === type) {
				if (isReversedRelationship) {
					if (data.isInFrontmatter) response.push(data.component);
				} else {
					response.push(data.component);
				}

			}
		});

		return response;
	}

	protected initialiseDate(
		date: string|null,
	): Date|null {
		if (date == null) return null;

		const response = new Date(date);
		return response;
	}

	/*
	private throwCorrectError(
		type: DataType,
		campaignId: number,
		adventureId: number|null = null,
		sessionId: number|null = null,
		sceneId: number|null = null,
	): never {
		if (this.app.plugins.getPlugin('rpg-manager').io.elementCount(type, campaignId, adventureId, sessionId, sceneId) > 0){
			if (type === this.type) {
				throw new ElementDuplicated(this.app, type, this.tag, campaignId, adventureId, sessionId, sceneId);
			} else {
				throw new HiddenError(this.app, type, this.tag, campaignId, adventureId, sessionId, sceneId);
			}
		} else {
			throw new ElementNotFoundError(this.app, type, this.tag, campaignId, adventureId, sessionId, sceneId);
		}
	}

	 */

	protected loadCampaign(
		dataList: RpgDataListInterface,
	): CampaignInterface {
		const campaignId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Campaign, this.tag);
		const campaigns: RpgDataInterface[] = dataList
			.where((data: CampaignInterface) =>
				data.type === DataType.Campaign &&
				data.campaignId === campaignId
			)
			.elements;

		if (campaigns.length === 0) throw new ElementNotFoundError(this.app, DataType.Campaign, this.tag, campaignId);
		if (campaigns.length > 1) throw new ElementDuplicated(this.app, DataType.Campaign, this.tag, campaignId);

		return campaigns[0] as CampaignInterface;
	}

	protected loadAdventure(
		dataList: RpgDataListInterface,
		campaignId: number,
	): AdventureInterface {
		const adventureId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Adventure, this.tag);
		const adventures: RpgDataInterface[] = dataList
			.where((data: AdventureInterface) =>
				data.type === DataType.Adventure &&
				data.campaign.campaignId === campaignId &&
				data.adventureId === adventureId
			)
			.elements;

		if (adventures.length === 0) throw new ElementNotFoundError(this.app, DataType.Adventure, this.tag, campaignId, adventureId);
		if (adventures.length > 1) throw new ElementDuplicated(this.app, DataType.Adventure, this.tag, campaignId, adventureId);

		return adventures[0] as AdventureInterface;
	}

	protected loadSession(
		dataList: RpgDataListInterface,
		campaignId: number,
		adventureId: number,
	): SessionInterface {
		const sessionId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Session, this.tag);
		const sessions: RpgDataInterface[] = dataList
			.where((data: SessionInterface) =>
				data.type === DataType.Session &&
				data.campaign.campaignId === campaignId &&
				data.adventure.adventureId === adventureId &&
				data.sessionId === sessionId
			)
			.elements;

		if (sessions.length === 0) throw new ElementNotFoundError(this.app, DataType.Session, this.tag, campaignId, adventureId, sessionId);
		if (sessions.length > 1) throw new ElementDuplicated(this.app, DataType.Session, this.tag, campaignId, adventureId, sessionId);

		return sessions[0] as SessionInterface;
	}

	protected loadScene(
		dataList: RpgDataListInterface,
		campaignId: number,
		adventureId: number,
		sessionId: number,
	): SceneInterface {
		const sceneId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Scene, this.tag);
		const scenes: RpgDataInterface[] = dataList
			.where((data: SceneInterface) =>
				data.type === DataType.Session &&
				data.campaign.campaignId === campaignId &&
				data.adventure.adventureId === adventureId &&
				data.session.sessionId === sessionId &&
				data.sceneId === sceneId
			)
			.elements;

		if (scenes.length === 0) throw new ElementNotFoundError(this.app, DataType.Scene, this.tag, campaignId, adventureId, sessionId, sceneId);
		if (scenes.length > 1) throw new ElementDuplicated(this.app, DataType.Scene, this.tag, campaignId, adventureId, sessionId, sceneId);

		return scenes[0] as SceneInterface;
	}

	public validateId(
		dataList: RpgDataListInterface,
	): void {
		const elementCount = this.elementCount(
			dataList,
			this.type,
			(<CampaignInterface>(<unknown>this))?.campaignId,
			(<AdventureInterface>(<unknown>this))?.adventureId ?? (<SessionInterface|SceneInterface|NoteInterface>(<unknown>this))?.adventure?.adventureId,
			(<SessionInterface|NoteInterface>(<unknown>this))?.sessionId ?? (<SceneInterface>(<unknown>this))?.session?.sessionId,
			(<SceneInterface>(<unknown>this))?.sceneId,
		);

		if (elementCount > 1) throw new ElementDuplicated(
			this.app,
			this.type,
			this.path,
			(<CampaignInterface>(<unknown>this))?.campaignId,
			(<AdventureInterface>(<unknown>this))?.adventureId ?? (<SessionInterface|SceneInterface|NoteInterface>(<unknown>this))?.adventure?.adventureId,
			(<SessionInterface|NoteInterface>(<unknown>this))?.sessionId ?? (<SceneInterface>(<unknown>this))?.session?.sessionId,
			(<SceneInterface>(<unknown>this))?.sceneId,
		);
	}

	public elementCount(
		dataList: RpgDataListInterface,
		type: DataType,
		campaignId: number,
		adventureId: number|null = null,
		sessionId: number|null = null,
		sceneId: number|null = null,
	): number {
		let predicate: any;

		switch (type){
			case DataType.Campaign:
				predicate = (campaign: CampaignInterface) =>
					campaign.type === DataType.Campaign &&
					campaign.campaignId === campaignId;
				break;
			case DataType.Adventure:
				predicate = (adventure: AdventureInterface) =>
					adventure.type === DataType.Adventure &&
					adventure.campaign.campaignId === campaignId &&
					adventure.adventureId === adventureId;
				break;
			case DataType.Session:
			case DataType.Note:
				predicate = (session: SessionInterface|NoteInterface) =>
					session.type === DataType.Adventure &&
					session.campaign.campaignId === campaignId &&
					session.adventure.adventureId === adventureId &&
					session.sessionId === sessionId;
				break;
			case DataType.Scene:
				predicate = (scene: SceneInterface) =>
					scene.type === DataType.Adventure &&
					scene.campaign.campaignId === campaignId &&
					scene.adventure.adventureId === adventureId &&
					scene.session.sessionId === sessionId &&
					scene.sceneId === sceneId;
				break;
		}

		return dataList.where(predicate).elements.length;
	}
}
