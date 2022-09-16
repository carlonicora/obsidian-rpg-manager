import {App, CachedMetadata, Component, TFile} from "obsidian";
import {Database} from "./Database";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {DataType} from "../enums/DataType";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {RpgError} from "../errors/RpgError";
import {HiddenError} from "../errors/HiddenError";
import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {CampaignSetting} from "../enums/CampaignSetting";
import {DatabaseInitialiserInterface} from "../interfaces/database/DatabaseInitialiserInterface";
import {AbstractOutlineData} from "../abstracts/database/AbstractOutlineData";
import {MisconfiguredDataModal} from "../modals/MisconfiguredDataModal";

export class DatabaseManager extends Component implements DatabaseInitialiserInterface {
	private misconfiguredTags: Map<RecordInterface, RpgErrorInterface> = new Map();
	private campaignSettings: Map<number, CampaignSetting> = new Map();
	private database: DatabaseInterface;

	constructor(
		private app: App,
		database: DatabaseInterface|undefined=undefined,
	) {
		super();

		if (database !== undefined){
			this.database = database;
		} else {
			this.database = new Database(this.app);
		}
		this.loadCampaignSettings();
	}

	public async initialise(
	): Promise<DatabaseInterface> {
		return this.fetch()
			.then(() => {
				return this.refresh(true);
			});
	}

	public async updateFile(
		file: TFile,
	): Promise<RecordInterface|undefined> {
		return this.loadComponent(file)
			.then((record: RecordInterface) => {
				if (record !== undefined) this.database.update(record);
				return this.refresh()
					.then(() => {
						return record;
					});
			});
	}

	private async refresh(
		isInitialising = false,
	): Promise<DatabaseInterface> {
		return this.addHierarchy(DataType.Campaign)
			.then(() => {
				return this.setRelationships()
					.then(() => {
						if (isInitialising && this.misconfiguredTags.size > 0) new MisconfiguredDataModal(this.app, this.misconfiguredTags).open();
						return this.database;
					});
			});
	}

	private async loadComponent(
		file: TFile,
	): Promise<RecordInterface|undefined> {
		let response: RecordInterface|undefined;

		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
		if (metadata == null) return;

		const dataTags = this.app.plugins.getPlugin('rpg-manager').tagManager.sanitiseTags(metadata?.frontmatter?.tags);
		const dataTag = this.app.plugins.getPlugin('rpg-manager').tagManager.getDataTag(dataTags);
		if (dataTag == undefined) return;

		const dataType = this.app.plugins.getPlugin('rpg-manager').tagManager.getDataType(undefined, dataTag);
		if (dataType === undefined) return;

		const campaignId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Campaign, dataTag);
		const settings = this.campaignSettings.get(campaignId);
		if (campaignId !== undefined && settings !== undefined) {
			response = this.app.plugins.getPlugin('rpg-manager').factories.data.create(
				settings,
				dataTag,
				dataType,
				file
			);
			await response.initialise();
		}

		return response;
	}

	private loadCampaignSettings(
	): void {
		this.app.vault.getMarkdownFiles().forEach((file: TFile) => {
			const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
			if (metadata !== null) {
				const dataTags = this.app.plugins.getPlugin('rpg-manager').tagManager.sanitiseTags(metadata?.frontmatter?.tags);
				if (this.app.plugins.getPlugin('rpg-manager').tagManager.getDataType(dataTags) === DataType.Campaign){
					const campaignId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Campaign, undefined, dataTags);
					if (campaignId !== undefined){
						const settings = metadata?.frontmatter?.settings !== undefined ?
							CampaignSetting[metadata?.frontmatter?.settings as keyof typeof CampaignSetting] :
							CampaignSetting.Agnostic;
						this.campaignSettings.set(campaignId, settings);
					}
				}
			}
		});
	}

	private async fetch(
	): Promise<void> {
		const markdownFiles: TFile[] = this.app.vault.getMarkdownFiles();
		for (let index=0; index<markdownFiles.length; index++){
			const data:RecordInterface|undefined = await this.loadComponent(markdownFiles[index]);
			if (data !== undefined) {
				try {
					if (data instanceof AbstractOutlineData) data.checkDuplicates(this.database);
					this.database.create(data);
				} catch (e) {
					if (e instanceof RpgError) {
						const isHidden: boolean = e instanceof HiddenError;
						if (!isHidden) this.misconfiguredTags.set(data, e as RpgErrorInterface);
					} else {
						throw e;
					}
				}
			}
		}
	}

	private async addHierarchy(
		dataType: DataType|undefined,
	): Promise<void> {
		const query = (data: RecordInterface) =>
			( dataType !== undefined ? (dataType & data.type) === data.type : data.isOutline === false);

		const data: RecordInterface[] = this.database.read(query, undefined);

		for (let index=0; index<data.length; index++){
			await data[index].loadHierarchy(this.database);
			try {
				this.database.create(data[index]);
			} catch (e) {
				if (e instanceof RpgError) {
					const isHidden: boolean = e instanceof HiddenError;
					if (!isHidden) this.misconfiguredTags.set(data[index], e as RpgErrorInterface);
				} else {
					throw e;
				}
			}
		}

		if (dataType === undefined) return;

		switch (dataType) {
			case DataType.Campaign:
				return await this.addHierarchy(DataType.Adventure);
				break;
			case DataType.Adventure:
				return await this.addHierarchy(DataType.Session);
				break;
			case DataType.Session:
				return await this.addHierarchy(DataType.Scene);
				break;
			case DataType.Scene:
				return await this.addHierarchy(DataType.Note);
				break;
			case DataType.Note:
				return await this.addHierarchy(undefined);
				break;
			default:
				return;
				break;
		}
	}

	private async setRelationships(
	): Promise<void> {
		for (let index=0; index<this.database.elements.length; index++){
			await this.database.elements[index].loadRelationships(this.database);
		}
		for (let index=0; index<this.database.elements.length; index++){
			if (!this.database.elements[index].isOutline) {
				await this.database.elements[index].loadReverseRelationships(this.database);
			}
		}
	}
}
