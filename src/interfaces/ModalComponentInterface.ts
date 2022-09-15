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
		adventureId: number|undefined,
		sessionId: number|undefined,
		sceneId: number|undefined,
		additionalInformation: any|null,
	): void;

	prepareAdditionalInformation(
	): any|null;

	validate(
	): boolean;
}
