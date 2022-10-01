import {CampaignSetting} from "../enums/CampaignSetting";
import {App, CachedMetadata, TFile} from "obsidian";
import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {FactoriesInterface} from "../interfaces/FactoriesInterface";
import {TagHelper} from "../helpers/TagHelper";
import {ComponentType} from "../enums/ComponentType";
import {DatabaseErrorModal} from "../modals/DatabaseErrorModal";
import {IdInterface} from "../interfaces/components/IdInterface";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {MultipleTagsError} from "../errors/MultipleTagsError";
import {ComponentV2Interface} from "./interfaces/ComponentV2Interface";
import {DatabaseV2Interface} from "./interfaces/DatabaseV2Interface";

export class DatabaseV2Initialiser {
	private static campaignSettings: Map<number, CampaignSetting> = new Map();
	private static misconfiguredTags: Map<TFile, RpgErrorInterface> = new Map();
	private static app: App;

	private static factories: FactoriesInterface;
	private static tagHelper: TagHelper;

	public static async initialise(
		app: App,
	): Promise<DatabaseV2Interface> {
		this.app = app;
		this.misconfiguredTags = await new Map();

		this.factories = this.app.plugins.getPlugin('rpg-manager').factories;
		this.tagHelper = this.app.plugins.getPlugin('rpg-manager').tagHelper;

		const response: DatabaseV2Interface = await this.factories.databaseV2.create();

		await this._loadCampaignSettings();

		const components: Array<ComponentV2Interface> = [];
		const markdownFiles: TFile[] = app.vault.getMarkdownFiles();
		for (let index=0; index<markdownFiles.length; index++){
			this.createComponent(markdownFiles[index])
				.then((component: ComponentV2Interface|undefined) => {
					if (component === undefined) return undefined;

					/*
					if (component.stage == ComponentStage.Plot || component.stage === ComponentStage.Run){
						const duplicate = temporaryDatabase.readSingle(component.id.type, component.id);
						throw new ComponentDuplicatedError(this.app, component.id, [duplicate], component);
					}
					*/

					response.create(component);
					components.push(component);
				});
		}

		await Promise.all(components);

		if (this.misconfiguredTags.size > 0){
			new DatabaseErrorModal(this.app, this.misconfiguredTags).open();
		}

		response.ready();

		return response;
	}

	/**
	 * Creates a Record from an Obsidian TFile
	 *
	 * @param file
	 * @private
	 */
	public static async createComponent(
		file: TFile,
	): Promise<ComponentV2Interface|undefined> {
		const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
		if (metadata == null)  return undefined;

		const tags = this.tagHelper.sanitiseTags(metadata?.frontmatter?.tags);
		if (tags.length === 0) return undefined;

		if (!this.tagHelper.hasRpgManagerTags(tags)) return undefined;

		const id: IdInterface | undefined = this.factories.id.createFromTags(tags);
		if (!id.isValid) throw new TagMisconfiguredError(this.app, id);

		let rpgManagerTagCounter = 0;
		for (let tagIndex = 0; tagIndex < tags.length; tagIndex++) {
			if (this.tagHelper.isRpgManagerTag(tags[tagIndex])) rpgManagerTagCounter++;
			if (rpgManagerTagCounter > 1) throw new MultipleTagsError(this.app, id);
		}

		const settings = this.campaignSettings.get(id.campaignId) ?? CampaignSetting.Agnostic;

		const response = await this.factories.componentV2.create(
			settings,
			file,
			id,
		);

		response.readMetadata();

		return response;
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
}
