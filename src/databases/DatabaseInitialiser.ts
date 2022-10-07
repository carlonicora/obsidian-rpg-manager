import {CampaignSetting} from "./enums/CampaignSetting";
import {App, CachedMetadata, TFile} from "obsidian";
import {RpgErrorInterface} from "../errors/interfaces/RpgErrorInterface";
import {FactoriesInterface} from "../factories/interfaces/FactoriesInterface";
import {TagHelper} from "./TagHelper";
import {ComponentType} from "./enums/ComponentType";
import {DatabaseErrorModal} from "../modals/DatabaseErrorModal";
import {IdInterface} from "./interfaces/IdInterface";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {MultipleTagsError} from "../errors/MultipleTagsError";
import {ComponentInterface} from "./interfaces/ComponentInterface";
import {DatabaseInterface} from "./interfaces/DatabaseInterface";
import {RelationshipInterface} from "../relationships/interfaces/RelationshipInterface";
import {ComponentStage} from "./components/enums/ComponentStage";
import {ComponentDuplicatedError} from "../errors/ComponentDuplicatedError";

export class DatabaseInitialiser {
	private static campaignSettings: Map<number, CampaignSetting> = new Map();
	private static misconfiguredTags: Map<TFile, RpgErrorInterface> = new Map();
	private static app: App;

	private static factories: FactoriesInterface;
	private static tagHelper: TagHelper;

	public static async initialise(
		app: App,
	): Promise<DatabaseInterface> {
		this.app = app;
		this.misconfiguredTags = await new Map();

		this.factories = this.app.plugins.getPlugin('rpg-manager').factories;
		this.tagHelper = this.app.plugins.getPlugin('rpg-manager').tagHelper;

		const response: DatabaseInterface = await this.factories.database.create();

		await this._loadCampaignSettings();

		const components: Array<ComponentInterface> = [];
		const markdownFiles: TFile[] = app.vault.getMarkdownFiles();
		for (let index=0; index<markdownFiles.length; index++){
			try {
				await this.createComponent(markdownFiles[index])
					.then((component: ComponentInterface | undefined) => {
						if (component === undefined) return undefined;

						if (component.stage == ComponentStage.Plot || component.stage === ComponentStage.Run) {
							let error: Error | undefined = undefined;
							try {
								const duplicate = response.readSingle(component.id.type, component.id);
								error = new ComponentDuplicatedError(this.app, component.id, [duplicate], component);
							} catch (e) {
								//no need to trap anything here
							}

							if (error !== undefined) throw error;
						}

						response.create(component);
						components.push(component);
					});
			} catch (e) {
				this.misconfiguredTags.set(markdownFiles[index], e);
			}
		}

		await Promise.all(components);
		response.ready();

		const metadata: Array<Promise<void>> = [];
		await components.forEach((component: ComponentInterface) => {
			try {
				metadata.push(component.readMetadata());
			} catch (e) {
				this.misconfiguredTags.set(component.file, e);
			}
		})

		Promise.all(metadata)
			.then(() => {
				this._initialiseRelationships(response);
			})

		if (this.misconfiguredTags.size > 0){
			new DatabaseErrorModal(this.app, this.misconfiguredTags).open();
		}

		return response;
	}

	/**
	 * Creates a Component from an Obsidian TFile
	 *
	 * @param file
	 * @private
	 */
	public static async createComponent(
		file: TFile,
	): Promise<ComponentInterface|undefined> {
		const metadata: CachedMetadata | null = this.app.metadataCache.getFileCache(file);
		if (metadata == null) return undefined;

		const tags = this.tagHelper.sanitiseTags(metadata?.frontmatter?.tags);
		if (tags.length === 0) return undefined;

		if (!this.tagHelper.hasRpgManagerTags(tags)) return undefined;

		let rpgManagerTagCounter = 0;
		for (let tagIndex = 0; tagIndex < tags.length; tagIndex++) {
			if (this.tagHelper.isRpgManagerTag(tags[tagIndex])) rpgManagerTagCounter++;
			if (rpgManagerTagCounter > 1) throw new MultipleTagsError(this.app, undefined);
		}

		const id: IdInterface | undefined = this.factories.id.createFromTags(tags);
		if (!id.isValid) throw new TagMisconfiguredError(this.app, id);

		const settings = this.campaignSettings.get(id.campaignId) ?? CampaignSetting.Agnostic;

		return await this.factories.component.create(
			settings,
			file,
			id,
		);
	}

	/**
	 * PRIVATE METHODS
	 */
	private static _loadCampaignSettings(
	): void {
		this.app.vault.getMarkdownFiles().forEach((file: TFile) => {
			const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
			if (metadata?.frontmatter?.tags != null) {
				const tags = this.tagHelper.sanitiseTags(metadata.frontmatter.tags);
				if (tags.length === 0) return;

				const tag = this.tagHelper.getTag(tags);
				if (tag === undefined) return;

				const type = this.tagHelper.getDataType(tag);
				if (type === undefined) return;

				if (type === ComponentType.Campaign){
					const id = this.factories.id.createFromTag(tag);
					try {
						const settings = metadata?.frontmatter?.settings != undefined ?
							CampaignSetting[metadata.frontmatter.settings as keyof typeof CampaignSetting] :
							CampaignSetting.Agnostic;
						this.campaignSettings.set(id.campaignId, settings);
					} catch (e) {
						//No need to trap the errors here
					}
				}
			}
		});
	}

	private static async _initialiseRelationships(
		database: DatabaseInterface,
	): Promise<void> {
		await database.recordset.forEach((component: ComponentInterface) => {
			component.initialiseRelationships();
		});

		await database.recordset.forEach((component: ComponentInterface) => {
			component.getRelationships(database).forEach((relationship: RelationshipInterface) => {
				if (relationship.component !== undefined){
					this.factories.relationship.createFromReverse(component, relationship);
				}
			});
		});

		await database.recordset.forEach((component: ComponentInterface) => {
			component.touch();
		});
	}

	public static async reinitialiseRelationships(
		database: DatabaseInterface,
	): Promise<void> {
		return this._initialiseRelationships(database);
	}
}
