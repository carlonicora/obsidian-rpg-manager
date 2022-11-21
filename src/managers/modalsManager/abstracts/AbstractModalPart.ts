import {ModalPartInterface} from "../../../core/interfaces/ModalPartInterface";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ModalInterface} from "../../../core/interfaces/ModalInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {FileCreationService} from "../../../services/fileCreationService/FileCreationService";

export abstract class AbstractModalPart implements ModalPartInterface {
	constructor(
		protected api: RpgManagerApiInterface,
		protected modal: ModalInterface,
	) {
	}

	abstract addElement(
		contentEl: HTMLElement,
	): Promise<void>;

	protected abstract addAdditionalElements(
	): Promise<void>;

	public prepareAdditionalInformation(
	): any|null {
		return null;
	}

	abstract loadChild(
		containerEl: HTMLElement
	): Promise<void>;

	abstract validate(
	): boolean;

	public async save(
		settings: CampaignSetting,
		type: ComponentType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: string,
		adventureId?: string,
		actId?: string,
		sceneId?: string,
		sessionId?: string,
		additionalInformation?: any,
	): Promise<void> {
		this.api.service(FileCreationService).create(
			settings,
			type,
			create,
			templateName,
			name,
			campaignId,
			adventureId,
			actId,
			sceneId,
			sessionId,
			additionalInformation,
		);

		return Promise.resolve(undefined);
	}
}
