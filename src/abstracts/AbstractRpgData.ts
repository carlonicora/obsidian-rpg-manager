import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";
import {App, CachedMetadata, FrontMatterCache, LinkCache, TFile} from "obsidian";
import {DataType} from "../enums/DataType";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {ElementNotFoundError} from "../errors/ElementNotFoundError";
import {NoteInterface} from "../interfaces/data/NoteInterface";
import {ElementDuplicated} from "../errors/ElementDuplicated";
import {HiddenError} from "../errors/HiddenError";

export abstract class AbstractRpgData implements RpgDataInterface {
	public obsidianId: string;

	public link: string;
	public name: string;
	public path: string;

	public tags: Array<string>;
	public tag: string|undefined;

	public links: Array<string>;

	public completed: boolean;
	public synopsis: string|null = null;
	public additionalInformation: string|null = null;
	public imageSrc: string|null|undefined = undefined;

	public frontmatter: FrontMatterCache|undefined;

	constructor(
		protected app: App,
		public type: DataType,
		file: TFile,
		metadata: CachedMetadata,
	) {
		this.reload(file, metadata);
	}

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		this.obsidianId = file.path;

		this.link = '[[' + file.basename + ']]';
		this.name = file.basename;
		this.path = file.path;

		this.tags = this.app.plugins.getPlugin('rpg-manager').tagManager.sanitiseTags(metadata.frontmatter?.tags);
		this.tag = this.app.plugins.getPlugin('rpg-manager').tagManager.getDataTag(
			this.tags
		);

		this.links = [];

		(metadata.links || []).forEach((link: LinkCache) => {
			this.links.push(link.link);
		});

		this.frontmatter = metadata.frontmatter;

		this.completed = metadata.frontmatter?.completed ? metadata.frontmatter?.completed : true;
		this.synopsis = metadata.frontmatter?.synopsis;
		//this.imageSrc = this.app.plugins.getPlugin('rpg-manager').functions.getImg(this.name);
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
		type: DataType
	): RpgDataInterface[] {
		const response: RpgDataInterface[] = [];

		const relationships: any = this.frontmatter?.relationships[DataType[type].toLowerCase() + 's'];
		if (relationships != null){
			Object.entries(relationships).forEach(([key, value], index) => {
				const data = this.app.plugins.getPlugin('rpg-manager').io.getElementByName(key);
				if (data != null){
					data.additionalInformation = <string>value;
					response.push(data);
				}
			});
		}

		return response;
	}

	protected initialiseDate(
		date: string|null,
	): Date|null {
		if (date == null) return null;

		const response = new Date(date);
		response.setTime(response.getTime() + response.getTimezoneOffset() * 60 * 1000);
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
