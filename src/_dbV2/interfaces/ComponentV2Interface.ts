import {IdInterface} from "../../interfaces/IdInterface";
import {TFile} from "obsidian";
import {CampaignSetting} from "../../enums/CampaignSetting";
import {ComponentStage} from "../components/enums/ComponentStage";
import {RelationshipV2Interface} from "../relationships/interfaces/RelationshipV2Interface";
import {CampaignV2Interface} from "../components/interfaces/CampaignV2Interface";

export interface ComponentV2Interface {
	campaignSettings: CampaignSetting;
	id: IdInterface;
	file: TFile;
	stage: ComponentStage;

	version: number|undefined;

	get campaign(): CampaignV2Interface;

	get synopsis(): string | undefined;

	get image(): string | undefined;

	get relationships(): Array<RelationshipV2Interface>;

	get isComplete(): boolean;

	readMetadata(
	): Promise<void>;

	touch(
	): void;

	addRelationship(
		relationship: RelationshipV2Interface,
	): void;

	existsInRelationships(
		relationships: Array<RelationshipV2Interface>,
	): boolean;
}
