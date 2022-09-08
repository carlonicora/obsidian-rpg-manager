import {CampaignSetting} from "../enums/CampaignSetting";
import {ModalComponentInterface} from "./ModalComponentInterface";
import {DataType} from "../enums/DataType";

export interface ModalInterface {
	saver: ModalComponentInterface

	type: DataType;

	campaignId: number;
	adventureId: number|null;
	sessionId: number|null;
	sceneId: number|null;
	settings: CampaignSetting;

	campaignModal: ModalComponentInterface;
	adventureModal: ModalComponentInterface;
	sessionModal: ModalComponentInterface;
	sceneModal: ModalComponentInterface;
	elementModal: ModalComponentInterface;

	enableButton(): void;
	getContentEl(): HTMLElement;
}
