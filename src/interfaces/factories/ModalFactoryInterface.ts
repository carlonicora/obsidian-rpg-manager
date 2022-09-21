import {CampaignSetting} from "../../enums/CampaignSetting";
import {DataType} from "../../enums/DataType";
import {ModalInterface} from "../ModalInterface";
import {ModalComponentInterface} from "../ModalComponentInterface";

export interface ModalFactoryInterface {
	create(
		settings: CampaignSetting,
		type: DataType,
		modal: ModalInterface,
	): ModalComponentInterface;
}
