import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {ModalPartInterface} from "./ModalPartInterface";
import {ComponentType} from "../enums/ComponentType";

export interface ModalInterface {
	saver: ModalPartInterface

	type: ComponentType;

	campaignId: string;
	adventureId?: string;
	actId?: string;
	sceneId?: string;
	sessionId?: string;
	campaignSetting: CampaignSetting;

	additionalInformationEl: HTMLDivElement;

	campaignModal: ModalPartInterface;
	adventureModal: ModalPartInterface;
	actModal: ModalPartInterface;
	sceneModal: ModalPartInterface;
	sessionModal: ModalPartInterface;
	elementModal: ModalPartInterface;

	enableButton(): void;
	getContentEl(): HTMLElement;
}
