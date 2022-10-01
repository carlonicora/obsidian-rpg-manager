import {ComponentV2Interface} from "../interfaces/ComponentV2Interface";
import {CampaignSetting} from "../../enums/CampaignSetting";
import {IdInterface} from "../../interfaces/IdInterface";
import {App, TAbstractFile, TFile} from "obsidian";
import {ComponentStage} from "../components/enums/ComponentStage";
import {ComponentType} from "../../enums/ComponentType";
import {CampaignV2Interface} from "../components/interfaces/CampaignV2Interface";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {RelationshipV2Interface} from "../relationships/interfaces/RelationshipV2Interface";

export abstract class AbstractComponentV2 extends AbstractRpgManager implements ComponentV2Interface {
	private static root: string|undefined;

	private static initialiseRoots(
		app: App,
	) {
		const file = app.vault.getAbstractFileByPath('/');
		this.root = app.vault.getResourcePath(file as TFile);
		if (this.root.includes("?")) this.root = this.root.substring(0, this.root.lastIndexOf("?"));
		if (!this.root.endsWith("/")) this.root += "/";
	}

	public stage: ComponentStage = ComponentStage.Element;
	protected metadata: any;

	public version: number|undefined=undefined;

	constructor(
		app: App,
		public campaignSettings: CampaignSetting,
		public id: IdInterface,
		public file: TFile,
	) {
		super(app);

		AbstractComponentV2.initialiseRoots(this.app);
	}

	public async readMetadata(
	): Promise<void> {
		this.dataManipulators.metadata.read(this.file)
			.then((metadata: any) => {
				this.metadata = metadata;
				this.touch();
			});
	}

	public touch(
	): void {
		if (this.version === undefined) this.version = 0;
		this.version++;
	}

	public get campaign(): CampaignV2Interface {
		if (this.id.type === ComponentType.Campaign) return <unknown>this as CampaignV2Interface;
		return this.database.readSingle<CampaignV2Interface>(ComponentType.Campaign, this.id);
	}

	public get synopsis(): string|undefined {
		return this.metadata.synopsis;
	}

	public get image(): string | undefined {
		if (this.metadata.image !== undefined && this.metadata.image !== '') return this.metadata.image;

		let localImage: string|undefined = undefined;
		const imageExtensions = ["jpeg", "jpg", "png", "webp"];

		for (let extensionCount = 0; extensionCount < imageExtensions.length; extensionCount++) {
			const fileName = this.app.vault.config.attachmentFolderPath + '/' + this.file.basename + '.' + imageExtensions[extensionCount];

			if (this._fileExists(fileName)) {
				if (AbstractComponentV2.root === undefined) AbstractComponentV2.initialiseRoots(this.app);
				localImage = AbstractComponentV2.root + fileName;
				break;
			}
		}

		if (localImage !== undefined) return localImage;

		return undefined;
	}

	public get relationships(): Array<RelationshipV2Interface> {
		if (this.metadata.relationships === undefined) return [];

		this.metadata.relationships.forEach((relationship: RelationshipV2Interface) => {
			if (relationship.component === undefined) relationship.component = this.database.readByPath(relationship.path);
		});

		return this.metadata.relationships;
	}

	public get isComplete(): boolean {
		return this.metadata.complete !== false;
	}

	public addRelationship(
		relationship: RelationshipV2Interface,
	): void {
		this.relationships.push(relationship);
	}

	public existsInRelationships(
		relationships: Array<RelationshipV2Interface>,
	): boolean {
		for (let relationshipCounter=0; relationshipCounter<relationships.length; relationshipCounter++){
			if (relationships[relationshipCounter].path === this.file.path) return true;
		}

		return false;
	}

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
