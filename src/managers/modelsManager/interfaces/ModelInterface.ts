import {DatabaseInterface} from "../../databaseManager/interfaces/DatabaseInterface";
import {AbtInterface} from "../../../services/plotsService/interfaces/AbtInterface";
import {StoryCircleInterface} from "../../../services/plotsService/interfaces/StoryCircleInterface";
import {RelationshipListInterface} from "../../../services/relationshipsService/interfaces/RelationshipListInterface";
import {IdInterface} from "../../../services/idService/interfaces/IdInterface";
import {TFile} from "obsidian";
import {ComponentStage} from "../../../core/enums/ComponentStage";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {CampaignInterface} from "../../../components/campaign/interfaces/CampaignInterface";
import {ImageInterface} from "../../../services/galleryService/interfaces/ImageInterface";

export interface ModelInterface {
	id: IdInterface;
	file: TFile;
	stage: ComponentStage;
	version: number|undefined;

	get abt(): AbtInterface;
	get alias(): Array<string>;
	get campaign(): CampaignInterface;
	get campaignSettings(): CampaignSetting;
	get hasAbtPlot(): boolean;
	get hasStoryCirclePlot(): boolean;
	get images(): ImageInterface[];
	get isComplete(): boolean;
	get link(): string;
	get storyCircle(): StoryCircleInterface;
	get synopsis(): string | undefined;

	getRelationships(
		database?: DatabaseInterface|undefined,
	): RelationshipListInterface;

	initialise(
		campaignSettings: CampaignSetting,
		id: IdInterface,
		file: TFile,
	): void;

	initialiseData(
	): Promise<void>;

	initialiseRelationships(
	): Promise<void>;

	readMetadata(
		initialiseRelationships?: boolean,
	): Promise<void>;

	reinitialiseRelationships(
	): Promise<void>

	touch(
		force?: boolean,
	): boolean;

	validateHierarchy(
	): void;
}
