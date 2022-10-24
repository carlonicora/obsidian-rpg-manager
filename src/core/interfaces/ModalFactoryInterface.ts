import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {ComponentType} from "../enums/ComponentType";
import {ModalInterface} from "./ModalInterface";
import {ModalPartInterface} from "./ModalPartInterface";

export interface ModalFactoryInterface {
	create(
		settings: CampaignSetting,
		type: ComponentType,
		modal: ModalInterface,
	): ModalPartInterface;
}
