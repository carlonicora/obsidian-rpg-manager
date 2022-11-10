import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../../core/enums/ComponentType";
import {IdInterface} from "../../idService/interfaces/IdInterface";
import {TFile} from "obsidian";

export interface FileCreationServiceInterface {
	create(
		settings: CampaignSetting,
		type: ComponentType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: IdInterface,
		adventureId?: IdInterface|undefined,
		actId?: IdInterface|undefined,
		sceneId?: IdInterface|undefined,
		sessionId?: IdInterface|undefined,
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
