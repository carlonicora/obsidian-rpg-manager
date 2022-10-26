import {CampaignSetting} from "../../src/components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../src/core/enums/ComponentType";
import {ModalInterface} from "./ModalInterface";
import {ModalPartInterface} from "./ModalPartInterface";

export interface ModalFactoryInterface {
	create(
		settings: CampaignSetting,
		type: ComponentType,
		modal: ModalInterface,
	): ModalPartInterface;
}
