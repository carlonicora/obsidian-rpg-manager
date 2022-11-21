import {ComponentType} from "../enums/ComponentType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";

export interface ModalPartInterface {
	addElement(
		contentEl: HTMLElement,
	): Promise<void>;

	save(
		settings: CampaignSetting,
		type: ComponentType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: string,
		adventureId?: string,
		actId?: string,
		sceneId?: string,
		sessionId?: string,
		additionalInformation?: any,
	): void;

	prepareAdditionalInformation(
	): any|null;

	validate(
	): boolean;
}
