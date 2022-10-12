import {ComponentType} from "../../components/enums/ComponentType";
import {CampaignSetting} from "../../components/components/campaign/enums/CampaignSetting";
import {IdInterface} from "../../id/interfaces/IdInterface";

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
