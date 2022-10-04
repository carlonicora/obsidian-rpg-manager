import {ComponentType} from "../../databases/enums/ComponentType";
import {CampaignSetting} from "../../databases/enums/CampaignSetting";
import {IdInterface} from "../../databases/interfaces/IdInterface";

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
