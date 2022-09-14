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
import {RpgGenericDataInterface} from "../interfaces/data/RpgGenericDataInterface";

export abstract class AbstractRpgData implements RpgDataInterface {
	public frontmatter: any;

	public tags: Array<string>;

	public completed: boolean;
	public synopsis: string|null = null;
	public additionalInformation: string|null = null;
	public imageSrc: string|null|undefined = undefined;

	protected relationships: Map<string, RelationshipInterface> = new Map();

	private metadata: CachedMetadata;

	constructor(
		protected app: App,
		public tag:string,
		public type: DataType,
		public file: TFile,
	) {
		this.loadBaseData();
		this.loadData();
	}

	private async loadBaseData(
	): Promise<void> {
		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(this.file);
		if (metadata === null) throw new Error('metadata is null');
		this.metadata = metadata;

		this.frontmatter = this.metadata.frontmatter ?? {};
		this.tags = this.app.plugins.getPlugin('rpg-manager').tagManager.sanitiseTags(this.frontmatter?.tags);

		this.completed = this.frontmatter.completed ? this.frontmatter.completed : true;
		this.synopsis = this.frontmatter.synopsis;

		await this.app.plugins.getPlugin('rpg-manager').factories.relationships.read(this.file, this.relationships);
	}

	protected async loadData(
	): Promise<void> {
		if ((<RpgGenericDataInterface>(<unknown>this)).isOutline) await this.checkElementDuplication();
	}

	public async reload(
	): Promise<void> {
		await this.loadBaseData();
		await this.loadData();
	}

	public abstract loadHierarchy(
		dataList: RpgDataListInterface,
	): void;

	public loadRelationships(
		dataList: RpgDataListInterface,
	): void {
		this.relationships.forEach((relationship: RelationshipInterface, name: string) => {
			const elements = dataList.where((data: RpgDataInterface) => data.name === name).elements;
			switch (elements.length){
				case 0:
					relationship.component = undefined;
					break;
				case 1:
					relationship.component = elements[0]
					break;
			}
		});
		if ((<RpgGenericDataInterface>(<unknown>this)).isOutline) this.checkElementDuplication();
	}

	public loadReverseRelationships(
		dataList: RpgDataListInterface,
	): void {
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
	): RpgDataInterface[] {
		const response:RpgDataInterface[] = [];

		this.relationships.forEach((data: RelationshipInterface, name: string) => {
			if (data.component !== undefined && data.component.type === type) {
				response.push(data.component);
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

	protected loadCampaign(
	): CampaignInterface {
		const campaignId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Campaign, this.tag);
		const response = this.app.plugins.getPlugin('rpg-manager').io.getCampaign(campaignId);
		if (response == null) this.throwCorrectError(DataType.Campaign, campaignId);

		return response;
	}

	protected loadAdventure(
		campaignId: number,
	): AdventureInterface {
		const adventureId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Adventure, this.tag);
		const response = this.app.plugins.getPlugin('rpg-manager').io.getAdventure(campaignId, adventureId);
		if (response == null) this.throwCorrectError(DataType.Adventure, campaignId, adventureId);

		return response;
	}

	protected loadSession(
		campaignId: number,
		adventureId: number,
	): SessionInterface {
		const sessionId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Session, this.tag);
		const response = this.app.plugins.getPlugin('rpg-manager').io.getSession(campaignId, adventureId, sessionId);
		if (response == null) this.throwCorrectError(DataType.Session, campaignId, adventureId, sessionId);

		return response;
	}

	protected loadScene(
		campaignId: number,
		adventureId: number,
		sessionId: number,
	): SceneInterface {
		const sceneId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Scene, this.tag);
		const response = this.app.plugins.getPlugin('rpg-manager').io.getScene(campaignId, adventureId, sessionId, sceneId);
		if (response == null) this.throwCorrectError(DataType.Scene, campaignId, adventureId, sessionId, sceneId);

		return response;
	}

	protected checkElementDuplication(
	): void {
		const elementCount = this.app.plugins.getPlugin('rpg-manager').io.elementCount(
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
}
