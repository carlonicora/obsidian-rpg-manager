import {CampaignSetting} from "../enums/CampaignSetting";
import {ModalComponentInterface} from "./ModalComponentInterface";
import {DataType} from "../enums/DataType";
import {IdInterface} from "./data/IdInterface";

export interface ModalInterface {
	saver: ModalComponentInterface

	type: DataType;

	campaignId: IdInterface;
	adventureId: IdInterface|undefined;
	sessionId: IdInterface|undefined;
	sceneId: IdInterface|undefined;
	campaignSetting: CampaignSetting;

	additionalInformationEl: HTMLDivElement;

	campaignModal: ModalComponentInterface;
	adventureModal: ModalComponentInterface;
	sessionModal: ModalComponentInterface;
	sceneModal: ModalComponentInterface;
	elementModal: ModalComponentInterface;

	enableButton(): void;
	getContentEl(): HTMLElement;
}
