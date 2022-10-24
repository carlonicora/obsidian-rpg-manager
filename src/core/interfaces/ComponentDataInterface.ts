import {CampaignInterface} from "../../components/campaign/interfaces/CampaignInterface";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {IdInterface} from "../../services/id/interfaces/IdInterface";
import {TFile} from "obsidian";
import {ComponentStage} from "../enums/ComponentStage";
import {ImageInterface} from "../../services/galleries/interfaces/ImageInterface";

export interface ComponentDataInterface {
	id: IdInterface;
	file: TFile;
	stage: ComponentStage;
	version: number|undefined;

	initialise(
		campaignSettings: CampaignSetting,
		id: IdInterface,
		file: TFile,
	): void;

	touch(
	): boolean;

	get alias(): Array<string>;
	get campaign(): CampaignInterface;
	get campaignSettings(): CampaignSetting;
	get images(): ImageInterface[];
	get isComplete(): boolean;
	get synopsis(): string | undefined;
}
