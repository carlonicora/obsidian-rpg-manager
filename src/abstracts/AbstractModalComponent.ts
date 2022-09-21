import {ModalComponentInterface} from "../interfaces/ModalComponentInterface";
import {App} from "obsidian";
import {CampaignSetting} from "../enums/CampaignSetting";
import {DataType} from "../enums/DataType";
import {ModalInterface} from "../interfaces/ModalInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";

export abstract class AbstractModalComponent extends AbstractRpgManager implements ModalComponentInterface {
	constructor(
		app: App,
		protected modal: ModalInterface,
	) {
		super(app);
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
		adventureId: number|undefined=undefined,
		sessionId: number|undefined=undefined,
		sceneId: number|undefined=undefined,
		additionalInformation: any|null=null,
	): Promise<void> {
		this.factories.files.create(
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
