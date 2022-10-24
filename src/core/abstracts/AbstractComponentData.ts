import {AbstractRpgManager} from "./AbstractRpgManager";
import {ComponentDataInterface} from "../interfaces/ComponentDataInterface";
import {CampaignInterface} from "../../components/campaign/interfaces/CampaignInterface";
import {ComponentType} from "../enums/ComponentType";
import {App, CachedMetadata, TAbstractFile, TFile, TFolder} from "obsidian";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {IdInterface} from "../../services/id/interfaces/IdInterface";
import {ComponentMetadataInterface} from "../interfaces/ComponentMetadataInterface";
import {ComponentStage} from "../enums/ComponentStage";
import {ImageInterface} from "../../services/galleries/interfaces/ImageInterface";
import {ImageMetadataInterface} from "../interfaces/ImageMetadataInterface";

export abstract class AbstractComponentData extends AbstractRpgManager implements ComponentDataInterface {
	public static
	root: string|undefined;
	public static imageExtensions: string[] = ["jpeg", "jpg", "png", "webp"];

	public static initialiseRoots(
		app: App,
	) {
		const file = app.vault.getAbstractFileByPath('/');
		this.root = app.vault.getResourcePath(file as TFile);
		if (this.root.includes("?")) this.root = this.root.substring(0, this.root.lastIndexOf("?"));
		if (!this.root.endsWith("/")) this.root += "/";
	}

	private _campaignSettings: CampaignSetting;
	protected metadata: ComponentMetadataInterface|any = {};
	protected frontmatter: any = {};
	public id: IdInterface;
	public file: TFile;
	public stage: ComponentStage = ComponentStage.Element;
	public version: number|undefined=undefined;

	public initialise(
		campaignSettings: CampaignSetting,
		id: IdInterface,
		file: TFile,
	): void {
		this._campaignSettings = campaignSettings;
		this.id = id;
		this.file = file;

		const metadataCache: CachedMetadata|null = this.app.metadataCache.getFileCache(this.file);
		if (metadataCache !== null)
			this.frontmatter = metadataCache.frontmatter;

		AbstractComponentData.initialiseRoots(this.app);
	}

	public get campaign(): CampaignInterface {
		if (this.id.type === ComponentType.Campaign) return <unknown>this as CampaignInterface;
		return this.database.readSingle<CampaignInterface>(ComponentType.Campaign, this.id);
	}

	public get campaignSettings(): CampaignSetting {
		return this._campaignSettings;
	}

	public get alias(): Array<string> {
		const response: Array<string> = [];

		const metadata:CachedMetadata|null = this.app.metadataCache.getFileCache(this.file);
		if (metadata == null)
			return response;

		if (metadata.frontmatter?.alias != undefined) {
			metadata.frontmatter.alias.forEach((alias: string) => {
				response.push(alias);
			})
		}

		return response;
	}

	public get synopsis(): string|undefined {
		return this.metadata?.data?.synopsis;
	}

	public get images(): ImageInterface[] {
		const response: ImageInterface[] = [];

		if (this.metadata?.data?.images != undefined && Array.isArray(this.metadata?.data?.images)){
			this.metadata.data.images.forEach((imageMetadata: ImageMetadataInterface) => {
				const image: ImageInterface|undefined = this.factories.image.create(imageMetadata.path, imageMetadata.caption);

				if (image !== undefined)
					response.push(image);
			});
		}

		return response;
	}

	public get isComplete(): boolean {
		return this.metadata?.data?.complete !== false;
	}

	abstract touch(
	): boolean;

	private _getImage(
		basename: string
	): string|undefined {
		const folder = (this.settings.imagesFolder !== undefined && this.settings.imagesFolder !== '') ? this.settings.imagesFolder : this.app.vault.config.attachmentFolderPath;
		const initialFolder = this.app.vault.getAbstractFileByPath(folder);

		if (initialFolder == undefined || !(initialFolder instanceof TFolder))
			return undefined;

		const response = this._getImageFromFolder(basename, initialFolder);
		if (response === undefined)
			return undefined;

		if (AbstractComponentData.root === undefined)
			AbstractComponentData.initialiseRoots(this.app);

		return  AbstractComponentData.root + response;
	}

	private _getImageFromFolder(
		basename: string,
		folder: TFolder,
	): string|undefined {
		const filesInFolder = this.app.vault.getFiles().filter((file: TFile) => file.parent === folder && file.basename.toLowerCase() === basename.toLowerCase() && AbstractComponentData.imageExtensions.includes(file.extension));
		if (filesInFolder.length !== 0)
			return filesInFolder[0].path;

		const subFolders = folder.children.filter((file: TAbstractFile) => file instanceof TFolder);
		for (let index=0; index<subFolders.length; index++){
			const subFolder = subFolders[index]
			if (subFolder instanceof TFolder) {
				const image: string|undefined = this._getImageFromFolder(basename, subFolder);
				if (image !== undefined) return image;
			}
		}

		return undefined;
	}
}
