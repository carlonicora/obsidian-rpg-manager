import {RecordType} from "../enums/RecordType";
import {CampaignSetting} from "../enums/CampaignSetting";
import {IdInterface} from "./data/IdInterface";

export interface ModalComponentInterface {
	addElement(
		contentEl: HTMLElement,
	): Promise<void>;

	save(
		settings: CampaignSetting,
		type: RecordType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: IdInterface,
		adventureId: IdInterface|undefined,
		actId: IdInterface|undefined,
		sceneId: IdInterface|undefined,
		additionalInformation: any|null,
	): void;

	prepareAdditionalInformation(
	): any|null;

	validate(
	): boolean;
}
