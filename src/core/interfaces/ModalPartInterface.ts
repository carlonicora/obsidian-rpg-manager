import {ComponentType} from "../enums/ComponentType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {IndexInterface} from "../../services/indexService/interfaces/IndexInterface";

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
		campaignId: IndexInterface,
		adventureId: IndexInterface|undefined,
		actId: IndexInterface|undefined,
		sceneId: IndexInterface|undefined,
		sessionId: IndexInterface|undefined,
		additionalInformation: any|null,
	): void;

	prepareAdditionalInformation(
	): any|null;

	validate(
	): boolean;
}
