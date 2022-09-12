import {DataType} from "../enums/DataType";
import {CampaignSetting} from "../enums/CampaignSetting";

export interface ModalComponentInterface {
	addElement(
		contentEl: HTMLElement,
	): Promise<void>;

	save(
		settings: CampaignSetting,
		type: DataType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: number,
		adventureId: number|null,
		sessionId: number|null,
		sceneId: number|null,
		additionalInformation: any|null,
	): void;

	prepareAdditionalInformation(
	): any|null;

	validate(
	): boolean;
}
