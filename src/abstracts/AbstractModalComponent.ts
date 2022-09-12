import {ModalComponentInterface} from "../interfaces/ModalComponentInterface";
import {App} from "obsidian";
import {CampaignSetting} from "../enums/CampaignSetting";
import {DataType} from "../enums/DataType";
import {ModalInterface} from "../interfaces/ModalInterface";

export abstract class AbstractModalComponent implements ModalComponentInterface {
	constructor(
		protected app: App,
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
		type: DataType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: number,
		adventureId: number | null,
		sessionId: number | null,
		sceneId: number | null,
		additionalInformation: any|null,
	): Promise<void> {
		this.app.plugins.getPlugin('rpg-manager').factories.files.create(
			settings,
			type,
			create,
			templateName,
			name,
			campaignId,
			adventureId,
			sessionId,
			sceneId,
			additionalInformation,
		);
	}
}
