import {CampaignSetting} from "../../../databases/enums/CampaignSetting";
import {ComponentType} from "../../../databases/enums/ComponentType";
import {ModalInterface} from "../../interfaces/ModalInterface";
import {ModalPartInterface} from "../../interfaces/ModalPartInterface";

export interface ModalFactoryInterface {
	create(
		settings: CampaignSetting,
		type: ComponentType,
		modal: ModalInterface,
	): ModalPartInterface;
}
