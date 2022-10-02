import {IdInterface} from "../../interfaces/IdInterface";
import {TFile} from "obsidian";
import {CampaignSetting} from "../../enums/CampaignSetting";
import {ComponentStage} from "../components/enums/ComponentStage";
import {RelationshipV2Interface} from "../relationships/interfaces/RelationshipV2Interface";
import {CampaignV2Interface} from "../components/interfaces/CampaignV2Interface";
import {DatabaseV2Interface} from "./DatabaseV2Interface";

export interface ComponentV2Interface {
	campaignSettings: CampaignSetting;
	id: IdInterface;
	file: TFile;
	stage: ComponentStage;

	version: number|undefined;

	get campaign(): CampaignV2Interface;

	get synopsis(): string | undefined;

	get image(): string | undefined;

	get link(): string;

	get isComplete(): boolean;

	readMetadata(
	): Promise<void>;

	touch(
	): void;

	getRelationships(
		database?: DatabaseV2Interface|undefined,
	): Array<RelationshipV2Interface>;

	addRelationship(
		relationship: RelationshipV2Interface,
		database?: DatabaseV2Interface|undefined,
	): void;

	existsInRelationships(
		relationships: Array<RelationshipV2Interface>,
	): boolean;
}
