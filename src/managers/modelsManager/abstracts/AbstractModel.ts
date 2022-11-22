import {ModelInterface} from "../interfaces/ModelInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";
import {DatabaseInterface} from "../../databaseManager/interfaces/DatabaseInterface";
import {AbtPlot} from "../../../services/plotsService/plots/AbtPlot";
import {AbtInterface} from "../../../services/plotsService/interfaces/AbtInterface";
import {StoryCircleInterface} from "../../../services/plotsService/interfaces/StoryCircleInterface";
import {StoryCirclePlot} from "../../../services/plotsService/plots/StoryCirclePlot";
import {RelationshipListInterface} from "../../../services/relationshipsService/interfaces/RelationshipListInterface";
import {RelationshipList} from "../../../services/relationshipsService/RelationshipList";
import {
	ControllerMetadataRelationshipInterface
} from "../../controllerManager/interfaces/ControllerMetadataRelationshipInterface";
import {Md5} from "ts-md5";
import {ComponentNotFoundError} from "../../../core/errors/ComponentNotFoundError";
import {RelationshipType} from "../../../services/relationshipsService/enums/RelationshipType";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";
import {IndexInterface} from "../../../services/indexService/interfaces/IndexInterface";
import {CachedMetadata, TFile} from "obsidian";
import {ComponentStage} from "../../../core/enums/ComponentStage";
import {CampaignInterface} from "../../../components/campaign/interfaces/CampaignInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ImageInterface} from "../../../services/galleryService/interfaces/ImageInterface";
import {ImageMetadataInterface} from "../../../core/interfaces/ImageMetadataInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {RelationshipService} from "../../../services/relationshipsService/RelationshipService";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";
import {ImageService} from "../../../services/imageService/ImageService";
import {CodeblockDomainInterface} from "../../../services/codeblockService/interfaces/CodeblockDomainInterface";

export abstract class AbstractModel implements ModelInterface {
	public index: IndexInterface;
	public file: TFile;
	public stage: ComponentStage = ComponentStage.Element;
	public version: number|undefined=undefined;

	protected metadata: ComponentMetadataInterface|any = {};
	protected frontmatter: any = {};

	private _relationships: RelationshipListInterface = new RelationshipList();
	private _previousMetadata: string|Int32Array|undefined;
	private _previousRelationships: string|Int32Array|undefined;
	private _previousRelationshipsStringified: any[];
	private _campaignSettings: CampaignSetting;

	constructor(
		protected api: RpgManagerApiInterface,
	) {
	}

	get abt(): AbtInterface {
		return new AbtPlot({});
	}

	public get alias(): Array<string> {
		const response: Array<string> = [];

		const metadata:CachedMetadata|null = this.api.app.metadataCache.getFileCache(this.file);
		if (metadata == null)
			return response;

		if (metadata?.frontmatter?.alias != undefined && metadata.frontmatter.alias.length > 0) {
			metadata.frontmatter.alias.forEach((alias: string) => {
				response.push(alias);
			});
		}

		return response;
	}

	public get campaign(): CampaignInterface {
		if (this.index.type === ComponentType.Campaign)
			return <unknown>this as CampaignInterface;

		return this.api.database.readById<CampaignInterface>(this.index.campaignId);
	}

	public get campaignSettings(): CampaignSetting {
		return this._campaignSettings;
	}

	public get hasAbtPlot(): boolean {
		return this.metadata?.plot?.abt !== undefined;
	}

	public get hasStoryCirclePlot(): boolean {
		return this.metadata?.plot?.storycircle !== undefined;
	}

	public get images(): ImageInterface[] {
		const response: ImageInterface[] = [];

		if (this.metadata?.data?.images != undefined && Array.isArray(this.metadata?.data?.images)){
			this.metadata.data.images.forEach((imageMetadata: ImageMetadataInterface) => {
				const image: ImageInterface|undefined = this.api.service(ImageService).createImage(imageMetadata.path, imageMetadata.caption);

				if (image !== undefined)
					response.push(image);
			});
		}

		return response;
	}

	public get isComplete(): boolean {
		return this.metadata?.data?.complete !== false;
	}

	public get link(): string {
		return '[[' + this.file.basename + ']]';
	}

	get storyCircle(): StoryCircleInterface {
		return new StoryCirclePlot({});
	}

	public get synopsis(): string|undefined {
		const response: string|undefined = this.metadata.data?.synopsis;

		if (response === undefined || response === '')
			return undefined;

		return response;
	}

	public getRelationships(
		database: DatabaseInterface|undefined = undefined,
	): RelationshipListInterface {
		this._relationships
			.filter((relationship: RelationshipInterface) => relationship.component === undefined)
			.forEach((relationship: RelationshipInterface) => {
				if (relationship.component === undefined) {
					const path = relationship.path;
					if (relationship.type !== RelationshipType.Undefined){
						relationship.component = (database ?? this.api.database).readByPath(path);
					} else {
						const maybeRelatedComponents = (database ?? this.api.database).read<ModelInterface>((component: ModelInterface) =>
							component.file.basename === path
						);

						if (maybeRelatedComponents.length === 1) {
							/**
							 * @TODO: what is the defaultRelationship for this.indexService.type?
							 */
							relationship.type = RelationshipType.Unidirectional;
							relationship.component = maybeRelatedComponents[0];
							relationship.path = maybeRelatedComponents[0].file.path;
						}
					}
				}
			});

		return this._relationships;
	}

	public initialise(
		campaignSettings: CampaignSetting,
		id: IndexInterface,
		file: TFile,
	): void {
		this._campaignSettings = campaignSettings;
		this.index = id;
		this.file = file;

		const metadataCache: CachedMetadata|null = this.api.app.metadataCache.getFileCache(this.file);
		if (metadataCache !== null)
			this.frontmatter = metadataCache.frontmatter;

	}

	public async initialiseData(
	): Promise<void> {
		return;
	}

	public async initialiseRelationships(
	): Promise<void> {
		this._relationships = new RelationshipList();
		if (this.metadata?.relationships !== undefined){
			await this.metadata.relationships.forEach((relationshipMetadata: ControllerMetadataRelationshipInterface) => {
				if (relationshipMetadata.path !== this.file.path) {
					const relationship = this.api.service(RelationshipService).createRelationshipFromMetadata(relationshipMetadata);

					if (relationship !== undefined)
						this._relationships.add(relationship);

				}
			});
		}
	}

	public async readMetadata(
	): Promise<void> {
		return this.api.service(CodeblockService).read(this.file)
			.then((domain: CodeblockDomainInterface) => {
				this.api.service(RelationshipService).addRelationshipsFromContent(
					domain.originalFileContent,
					domain.codeblock,
					this.stage,
				);

				this.metadata = domain.codeblock;

				return this.initialiseRelationships()
					.then(() => {
						return;
					});

			})
			.catch((e) => {
				if (e.message === 'INVALID YAML') return;
			});
	}

	public async addRelationshipToRelatedElements(
	): Promise<void> {
		const relationships: RelationshipInterface[] = this._relationships.relationships;

		for (let index=0; index<relationships.length; index++){
			if(relationships[index].component !== undefined){
				if (!relationships[index].component?.getRelationships().existsAlready(this)){
					const relationship: RelationshipInterface|undefined = this.api.service(RelationshipService).createRelationshipFromReverse(this, relationships[index]);

					if (relationship !== undefined) {
						relationships[index].component?.getRelationships().add(relationship);

					}
				}

				relationships[index].component?.touch();
			}
		}
	}

	public async addReverseRelationships(
	): Promise<void> {
		const recordset = this.api.database.recordset;
		for (let index = 0; index < recordset.length; index++) {
			const relationships = recordset[index].getRelationships().relationships.filter((relationship: RelationshipInterface) =>
				relationship.component !== undefined &&
				relationship.component.file.path === this.file.path &&
				!this._relationships.existsAlready(recordset[index])
			);

			if (relationships.length === 1){
				const newRelationship: RelationshipInterface | undefined = this.api.service(RelationshipService).createRelationshipFromReverse(recordset[index], relationships[0]);

				if (newRelationship !== undefined)
					this._relationships.add(newRelationship);

			}
		}
	}

	public touch(
		force?: boolean,
	): boolean {
		if (force) {
			if (this.version === undefined)
				this.version = 0;

			this.version++;

			return true;
		}

		const md5 = new Md5();
		md5.appendStr(JSON.stringify(this.metadata));
		const metadataMd5 = md5.end();
		const relationshipsMd5 = this._relationships.md5();

		if (this._previousMetadata !== metadataMd5 || this._previousRelationships !== relationshipsMd5){
			this._previousMetadata = metadataMd5;
			this._previousRelationships = relationshipsMd5;
			this._previousRelationshipsStringified = structuredClone(this._relationships.stringified);

			if (this.version === undefined)
				this.version = 0;

			this.version++;

			return true;
		}

		return false;
	}

	public validateHierarchy(
	): void {
		try {
			this.campaign;
		} catch (e) {
			throw new ComponentNotFoundError(this.api, this.index);
		}
	}
}
