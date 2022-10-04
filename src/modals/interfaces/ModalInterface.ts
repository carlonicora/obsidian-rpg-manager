import {CampaignSetting} from "../../databases/enums/CampaignSetting";
import {ModalPartInterface} from "./ModalPartInterface";
import {ComponentType} from "../../databases/enums/ComponentType";
import {IdInterface} from "../../databases/interfaces/IdInterface";

export interface ModalInterface {
	saver: ModalPartInterface

	type: ComponentType;

	campaignId: IdInterface;
	adventureId: IdInterface|undefined;
	actId: IdInterface|undefined;
	sceneId: IdInterface|undefined;
	sessionId: IdInterface|undefined;
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
