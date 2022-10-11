import {CampaignInterface} from "../components/campaign/interfaces/CampaignInterface";
import {CampaignSetting} from "../components/campaign/enums/CampaignSetting";
import {IdInterface} from "../../id/interfaces/IdInterface";
import {TFile} from "obsidian";
import {ComponentStage} from "../enums/ComponentStage";

export interface ComponentDataInterface {
	campaignSettings: CampaignSetting;
	id: IdInterface;
	file: TFile;
	stage: ComponentStage;
	version: number|undefined;

	touch(
	): boolean;

	get campaign(): CampaignInterface;
	get synopsis(): string | undefined;
	get image(): string | undefined;
	get isComplete(): boolean;
}
