import {CampaignSetting} from "../../enums/CampaignSetting";
import {RecordType} from "../../enums/RecordType";
import {ModalInterface} from "../ModalInterface";
import {ModalComponentInterface} from "../ModalComponentInterface";

export interface ModalFactoryInterface {
	create(
		settings: CampaignSetting,
		type: RecordType,
		modal: ModalInterface,
	): ModalComponentInterface;
}
