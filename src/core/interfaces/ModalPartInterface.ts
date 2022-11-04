import {ComponentType} from "../enums/ComponentType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {IdInterface} from "../../services/idService/interfaces/IdInterface";

export interface ModalPartInterface {
	addElement(
		contentEl: HTMLElement,
	): Promise<void>;

	save(
		settings: CampaignSetting,
		type: ComponentType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: IdInterface,
		adventureId: IdInterface|undefined,
		actId: IdInterface|undefined,
		sceneId: IdInterface|undefined,
		sessionId: IdInterface|undefined,
		additionalInformation: any|null,
	): void;

	prepareAdditionalInformation(
	): any|null;

	validate(
	): boolean;
}
