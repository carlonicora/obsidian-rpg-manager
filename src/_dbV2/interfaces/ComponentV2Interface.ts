import {IdInterface} from "../../interfaces/components/IdInterface";
import {TFile} from "obsidian";
import {CampaignSetting} from "../../enums/CampaignSetting";
import {ComponentStage} from "../components/enums/ComponentStage";
import {DatabaseV2Interface} from "./DatabaseV2Interface";
import {BaseCampaignV2Interface} from "../components/interfaces/BaseCampaignV2Interface";
import {RelationshipV2Interface} from "../relationships/interfaces/RelationshipV2Interface";
import {CampaignV2Interface} from "../components/interfaces/CampaignV2Interface";

export interface ComponentV2Interface {
	campaignSettings: CampaignSetting;
	id: IdInterface;
	file: TFile;
	stage: ComponentStage;
	baseCampaign: BaseCampaignV2Interface;

	readMetadata(): Promise<void>;

	loadHierarchy(
		database: DatabaseV2Interface,
	): Promise<void>;

	get campaign(): CampaignV2Interface;
	get synopsis(): string | undefined;
	get image(): string | undefined;
	get relationships(): Array<RelationshipV2Interface>;
}
