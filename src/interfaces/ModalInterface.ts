import {CampaignSetting} from "../enums/CampaignSetting";
import {ModalComponentInterface} from "./ModalComponentInterface";
import {DataType} from "../enums/DataType";

export interface ModalInterface {
	saver: ModalComponentInterface

	type: DataType;

	campaignId: number;
	adventureId: number|undefined;
	sessionId: number|undefined;
	sceneId: number|undefined;
	settings: CampaignSetting;

	additionalInformationEl: HTMLDivElement;

	campaignModal: ModalComponentInterface;
	adventureModal: ModalComponentInterface;
	sessionModal: ModalComponentInterface;
	sceneModal: ModalComponentInterface;
	elementModal: ModalComponentInterface;

	enableButton(): void;
	getContentEl(): HTMLElement;
}
