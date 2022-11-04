import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ModalPartInterface} from "../../../core/interfaces/ModalPartInterface";
import {ModalInterface} from "../../../core/interfaces/ModalInterface";
import {ModalPartClassInterface} from "./ModalPartClassInterface";

export interface ModalsManagerInterface {
	getPartial(
		campaignSettings: CampaignSetting,
		type: ComponentType,
		modal: ModalInterface,
	): ModalPartInterface;

	registerPartial<T extends ModalPartInterface>(
		modalPart: ModalPartClassInterface<T>,
		campaignSettings: CampaignSetting,
		type: ComponentType,
	): void;
}
