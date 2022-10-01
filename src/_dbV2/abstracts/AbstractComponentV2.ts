import {ComponentV2Interface} from "../interfaces/ComponentV2Interface";
import {CampaignSetting} from "../../enums/CampaignSetting";
import {IdInterface} from "../../interfaces/components/IdInterface";
import {App, TFile} from "obsidian";
import {ComponentStage} from "../components/enums/ComponentStage";
import {DatabaseV2Interface} from "../interfaces/DatabaseV2Interface";
import {BaseCampaignV2Interface} from "../components/interfaces/BaseCampaignV2Interface";
import {ComponentType} from "../../enums/ComponentType";
import {CampaignV2Interface} from "../components/interfaces/CampaignV2Interface";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {RelationshipV2Interface} from "../relationships/interfaces/RelationshipV2Interface";

export abstract class AbstractComponentV2 extends AbstractRpgManager implements ComponentV2Interface {
	public stage: ComponentStage = ComponentStage.Element;
	public baseCampaign: BaseCampaignV2Interface;
	protected metadata: any;

	constructor(
		app: App,
		public campaignSettings: CampaignSetting,
		public id: IdInterface,
		public file: TFile,
	) {
		super(app);
	}

	public async readMetadata(
	): Promise<void> {
		this.dataManipulators.metadata.read(this.file)
			.then((metadata: any) => {
				this.metadata = metadata;
			});
	}

	public async loadHierarchy(
		database: DatabaseV2Interface,
	): Promise<void> {
		if (this.id.type !== ComponentType.Campaign) this.baseCampaign = <unknown>database.readSingle<CampaignV2Interface>(ComponentType.Campaign, this.id) as BaseCampaignV2Interface;
	}

	public get campaign(): CampaignV2Interface {
		if (this.baseCampaign !== undefined) return <unknown>this.baseCampaign as CampaignV2Interface;
		if (this.id.type === ComponentType.Campaign) return <unknown>this as CampaignV2Interface;

		throw new Error('');
	}

	public get synopsis(): string|undefined {
		return this.metadata.synopsis;
	}

	public get image(): string | undefined {
		//@TODO change this
		return undefined;
	}

	public get relationships(): Array<RelationshipV2Interface> {
		return this.metadata.relationships;
	}
}
