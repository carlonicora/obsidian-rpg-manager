import {ModalComponentInterface} from "../interfaces/ModalComponentInterface";
import {App} from "obsidian";
import {CampaignSetting} from "../enums/CampaignSetting";
import {RecordType} from "../enums/RecordType";
import {ModalInterface} from "../interfaces/ModalInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {IdInterface} from "../interfaces/data/IdInterface";

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
		type: RecordType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: IdInterface,
		adventureId: IdInterface|undefined=undefined,
		sessionId: IdInterface|undefined=undefined,
		sceneId: IdInterface|undefined=undefined,
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
