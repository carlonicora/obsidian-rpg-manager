import {CampaignSetting} from "../enums/CampaignSetting";
import {ModalComponentInterface} from "./ModalComponentInterface";
import {RecordType} from "../enums/RecordType";
import {IdInterface} from "./data/IdInterface";

export interface ModalInterface {
	saver: ModalComponentInterface

	type: RecordType;

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
