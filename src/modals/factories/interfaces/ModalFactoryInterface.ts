import {CampaignSetting} from "../../../components/components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../../components/enums/ComponentType";
import {ModalInterface} from "../../interfaces/ModalInterface";
import {ModalPartInterface} from "../../interfaces/ModalPartInterface";

export interface ModalFactoryInterface {
	create(
		settings: CampaignSetting,
		type: ComponentType,
		modal: ModalInterface,
	): ModalPartInterface;
}
