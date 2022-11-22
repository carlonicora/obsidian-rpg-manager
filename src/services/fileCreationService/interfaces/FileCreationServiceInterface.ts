import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../../core/enums/ComponentType";
import {TFile} from "obsidian";

export interface FileCreationServiceInterface {
	create(
		settings: CampaignSetting,
		type: ComponentType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: string,
		parentId: string,
		positionInParent?: number,
		additionalInformation?: any,
	): Promise<void>;

	silentCreate(
		type: ComponentType,
		name: string,
		campaignId: string,
		parentId: string,
		positionInParent?: number,
		additionalInformation?: any,
		openView?: boolean,
	): Promise<TFile>;
}
