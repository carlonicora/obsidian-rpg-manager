import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../../core/enums/ComponentType";
import {IndexInterface} from "../../indexService/interfaces/IndexInterface";
import {TFile} from "obsidian";

export interface FileCreationServiceInterface {
	create(
		settings: CampaignSetting,
		type: ComponentType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: IndexInterface,
		adventureId?: IndexInterface|undefined,
		actId?: IndexInterface|undefined,
		sceneId?: IndexInterface|undefined,
		sessionId?: IndexInterface|undefined,
		additionalInformation?: any|null,
	): Promise<void>;

	silentCreate(
		type: ComponentType,
		name: string,
		campaignId: number,
		adventureId?: number|undefined,
		actId?: number|undefined,
		sceneId?: number|undefined,
		sessionId?: number|undefined,
		additionalInformation?: any|undefined,
		openView?: boolean,
	): Promise<TFile>;
}
