import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {ComponentDataInterface} from "../components/interfaces/ComponentDataInterface";
import {CampaignInterface} from "../components/interfaces/CampaignInterface";
import {ComponentType} from "../enums/ComponentType";
import {App, TAbstractFile, TFile} from "obsidian";
import {CampaignSetting} from "../enums/CampaignSetting";
import {IdInterface} from "../interfaces/IdInterface";
import {ComponentMetadataInterface} from "../../metadatas/components/ComponentMetadataInterface";
import {ComponentStage} from "../components/enums/ComponentStage";

export abstract class AbstractComponentData extends AbstractRpgManager implements ComponentDataInterface {
	private static root: string|undefined;

	public static initialiseRoots(
		app: App,
	) {
		const file = app.vault.getAbstractFileByPath('/');
		this.root = app.vault.getResourcePath(file as TFile);
		if (this.root.includes("?")) this.root = this.root.substring(0, this.root.lastIndexOf("?"));
		if (!this.root.endsWith("/")) this.root += "/";
	}

	protected metadata: ComponentMetadataInterface|any = {};
	public stage: ComponentStage = ComponentStage.Element;
	public version: number|undefined=undefined;

	constructor(
		app: App,
		public campaignSettings: CampaignSetting,
		public id: IdInterface,
		public file: TFile,
	) {
		super(app);

		AbstractComponentData.initialiseRoots(this.app);
	}

	public get campaign(): CampaignInterface {
		if (this.id.type === ComponentType.Campaign) return <unknown>this as CampaignInterface;
		return this.database.readSingle<CampaignInterface>(ComponentType.Campaign, this.id);
	}

	public get synopsis(): string|undefined {
		return this.metadata?.data?.synopsis;
	}

	public get image(): string | undefined {
		if (this.metadata?.data?.image !== undefined && this.metadata?.data?.image !== '') return this.metadata.data.image;

		let localImage: string|undefined = undefined;
		const imageExtensions = ["jpeg", "jpg", "png", "webp"];

		for (let extensionCount = 0; extensionCount < imageExtensions.length; extensionCount++) {
			const fileName = this.app.vault.config.attachmentFolderPath + '/' + this.file.basename + '.' + imageExtensions[extensionCount];

			if (this._fileExists(fileName)) {
				if (AbstractComponentData.root === undefined) AbstractComponentData.initialiseRoots(this.app);
				localImage = AbstractComponentData.root + fileName;
				break;
			}
		}

		if (localImage !== undefined) return localImage;

		return undefined;
	}

	public get isComplete(): boolean {
		return this.metadata?.data?.complete !== false;
	}

	abstract touch(
	): boolean;

	private _fileExists(
		path: string
	): boolean {
		const abstractFile = this.app.vault.getAbstractFileByPath(path);
		let response = false;

		if (abstractFile instanceof TAbstractFile) {
			response = true;
		}

		return response;
	}
}
