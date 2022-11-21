import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {ModalPartInterface} from "./ModalPartInterface";
import {ComponentType} from "../enums/ComponentType";
import {IndexInterface} from "../../services/indexService/interfaces/IndexInterface";

export interface ModalInterface {
	saver: ModalPartInterface

	type: ComponentType;

	campaignId: IndexInterface;
	adventureId: IndexInterface|undefined;
	actId: IndexInterface|undefined;
	sceneId: IndexInterface|undefined;
	sessionId: IndexInterface|undefined;
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
