import {RecordInterface} from "../interfaces/database/RecordInterface";
import {App, CachedMetadata, FrontMatterCache, TAbstractFile, TFile} from "obsidian";
import {DataType} from "../enums/DataType";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {BaseCampaignInterface} from "../interfaces/data/BaseCampaignInterface";
import {Id} from "../database/Id";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {MultipleRpgManagerTagsError} from "../errors/MultipleRpgManagerTagsError";
import {RelationshipType} from "../enums/RelationshipType";

export abstract class AbstractRecord implements RecordInterface {
	private static root: string|undefined;

	private static initialiseRoots(
		app: App,
	) {
		const file = app.vault.getAbstractFileByPath('/');
		this.root = app.vault.getResourcePath(file as TFile);
		if (this.root.includes("?")) this.root = this.root.substring(0, this.root.lastIndexOf("?"));
		if (!this.root.endsWith("/")) this.root += "/";
	}

	public basename: string;

	public tags: Array<string>;

	public completed: boolean;
	public synopsis: string|null = null;
	public additionalInformation: string|null = null;
	public imageSrc: string|null|undefined = undefined;
	public imageUrl: string|undefined=undefined;

	public isOutline: boolean;
	public campaign: BaseCampaignInterface;

	public relationships: Map<string, RelationshipInterface>;
	public reverseRelationships: Map<string, RelationshipInterface>;

	constructor(
		protected app: App,
		public file: TFile,
		public id: Id,
	) {
		AbstractRecord.initialiseRoots(this.app);
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
		if (this.image === null) return null;

		const response = new Image(75, 75);
		response.src = this.image;
		response.style.objectFit = 'cover';

		return response;
	}

	public get folder(
	): string {
		const lastSlashPosition = this.path.lastIndexOf('/');
		return (lastSlashPosition !== -1 ? this.path.substring(0, lastSlashPosition + 1) : '/');
	}

	public get image(
	): string|null {
		if (this.imageUrl != null && this.imageUrl !== '') return this.imageUrl;

		let localImage: string|undefined = undefined;
		const imageExtensions = ["jpeg", "jpg", "png", "webp"];

		for (let extensionCount = 0; extensionCount < imageExtensions.length; extensionCount++) {
			const fileName = this.app.vault.config.attachmentFolderPath + '/' + this.basename + '.' + imageExtensions[extensionCount];

			if (this.fileExists(fileName)) {
				if (AbstractRecord.root === undefined) AbstractRecord.initialiseRoots(this.app);
				localImage = AbstractRecord.root + fileName;
				break;
			}
		}

		if (localImage !== undefined) return localImage;


		return null;
	}

	private fileExists(
		path: string
	): boolean {
		const abstractFile = this.app.vault.getAbstractFileByPath(path);
		let response = false;

		if (abstractFile instanceof TAbstractFile) {
			response = true;
		}

		return response;
	}

	public async initialise(
	): Promise<void> {
		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(this.file);
		if (metadata === null) throw new Error('metadata is null');

		this.basename = this.file.basename;

		this.tags = await this.app.plugins.getPlugin('rpg-manager').factories.tags.sanitiseTags(metadata.frontmatter?.tags);

		this.validateTag();

		this.completed = metadata.frontmatter?.completed ?? true;

		this.synopsis = metadata.frontmatter?.synopsis;
		this.imageUrl = metadata.frontmatter?.image;

		await this.initialiseRelationships();
		this.initialiseData(metadata.frontmatter);
	}

	protected validateTag(
	): void {
		let rpgManagerTagCounter = 0;
		(this.tags || []).forEach((tag: string) => {
			if (this.app.plugins.getPlugin('rpg-manager').factories.tags.isRpgManagerTag(tag)) rpgManagerTagCounter++;
		});
		if (rpgManagerTagCounter > 1) throw new MultipleRpgManagerTagsError(this.app, this.id);

		if (!this.id.isValid) throw new TagMisconfiguredError(this.app, this.id);
	}

	protected async initialiseRelationships(
	): Promise<void> {
		this.relationships = await new Map();
		this.reverseRelationships = await new Map();
		await this.app.plugins.getPlugin('rpg-manager').factories.relationships.read(this.file, this.relationships);
	}

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
	}

	public async reload(
	): Promise<void> {
		const metadata: CachedMetadata|null = await this.app.metadataCache.getFileCache(this.file);
		if (metadata === null || metadata.frontmatter === undefined) return;

		this.tags = await this.app.plugins.getPlugin('rpg-manager').factories.tags.sanitiseTags(metadata.frontmatter?.tags);
		this.id = this.app.plugins.getPlugin('rpg-manager').factories.tags.createId(undefined, this.tags);
		await this.validateTag();
		await this.initialise();
		await this.initialiseData(metadata.frontmatter);
	}

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		if (this.id.type !== DataType.Campaign) this.campaign = await database.readSingle<CampaignInterface>(DataType.Campaign, this.id.tag);
	}

	public async loadRelationships(
		database: DatabaseInterface,
	): Promise<void> {
		this.relationships.forEach((relationship: RelationshipInterface, name: string) => {
			const dataList = database.read(
				(data: RecordInterface) => data.name === name,
			);

			switch (dataList.length){
				case 0:
					relationship.component = undefined;
					break;
				case 1:
					relationship.component = dataList[0]
					break;
			}
		});
	}

	public async loadReverseRelationships(
	): Promise<void> {
		if (!this.isOutline) {
			this.relationships.forEach((relationship: RelationshipInterface, name: string) => {
				if (relationship.component !== undefined){
					relationship.component.addReverseRelationship(
						this.name,
						{
							component: this,
							description: (relationship.type === RelationshipType.DirectInFrontmatter ? relationship.description : ''),
							type: (relationship.type === RelationshipType.DirectInFrontmatter ? RelationshipType.ReverseInFrontmatter : RelationshipType.Reverse),
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
		const existingRelationship = this.reverseRelationships.get(name);

		if (existingRelationship === undefined || relationship.type === RelationshipType.ReverseInFrontmatter) this.reverseRelationships.set(name, relationship);
	}

	public getRelationships(
		type: DataType,
		requiredRelationshipType: RelationshipType = RelationshipType.Direct|RelationshipType.DirectInFrontmatter,
	): Array<RelationshipInterface> {
		const response:Array<RelationshipInterface> = [];

		this.reverseRelationships.forEach((relationship: RelationshipInterface, name: string) => {
			if (
				relationship.component !== undefined &&
				(type & relationship.component.id.type) == relationship.component.id.type &&
				(relationship.type & requiredRelationshipType) === relationship.type
			) {
				response.push(relationship);
			}
		});

		this.relationships.forEach((relationship: RelationshipInterface, name: string) => {
			if (
				relationship.component !== undefined &&
				(type & relationship.component.id.type) == relationship.component.id.type &&
				(relationship.type & requiredRelationshipType) === relationship.type
			) {
				response.push(relationship);
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
}
