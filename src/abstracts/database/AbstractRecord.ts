import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {App, CachedMetadata, TFile} from "obsidian";
import {DataType} from "../../enums/DataType";
import {CampaignInterface} from "../../interfaces/data/CampaignInterface";
import {DatabaseInterface} from "../../interfaces/database/DatabaseInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {BaseCampaignInterface} from "../../interfaces/data/BaseCampaignInterface";
import {DataId} from "../../interfaces/DataId";

export abstract class AbstractRecord implements RecordInterface {
	public dataId: DataId|undefined;

	public frontmatter: any;

	public basename: string;

	public tags: Array<string>;

	public completed: boolean;
	public synopsis: string|null = null;
	public additionalInformation: string|null = null;
	public imageSrc: string|null|undefined = undefined;

	public isOutline: boolean;
	public campaign: BaseCampaignInterface;

	protected relationships: Map<string, RelationshipInterface>;

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
		this.basename = this.file.basename + '';

		this.completed = this.frontmatter.completed ? this.frontmatter.completed : true;
		this.synopsis = this.frontmatter.synopsis;

		this.relationships = await new Map();
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
		database: DatabaseInterface,
	): Promise<void> {
		if (this.type !== DataType.Campaign) {
			this.campaign = database.readSingle<CampaignInterface>(database, DataType.Campaign, this.tag);
		}
	}

	public async loadRelationships(
		database: DatabaseInterface,
	): Promise<void> {
		this.relationships.forEach((relationship: RelationshipInterface, name: string) => {
			const dataList = database.read(
				(data: RecordInterface) => data.name === name,
				undefined,
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
		requiresReversedRelationship = false,
	): RecordInterface[] {
		const response:RecordInterface[] = [];

		this.relationships.forEach((data: RelationshipInterface, name: string) => {
			if (data.component !== undefined && (type & data.component.type) == data.component.type) {
				if (!requiresReversedRelationship || data.isReverse) response.push(data.component);
			}
		});

		return response;
	}

	public hasRelationship(
		name: string
	): boolean {
		return this.relationships.has(name);
	}

	protected initialiseDate(
		date: string|null,
	): Date|null {
		if (date == null) return null;

		const response = new Date(date);
		return response;
	}
}
