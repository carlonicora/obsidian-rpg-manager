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
		createFrontMatterOnly: boolean,
		name: string,
		campaignId: number,
		adventureId: number|null,
		sessionId: number|null,
		sceneId: number|null,
	): void;

	validate(
	): boolean;
}
