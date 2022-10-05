import {ModalPartInterface} from "../interfaces/ModalPartInterface";
import {App} from "obsidian";
import {CampaignSetting} from "../../databases/enums/CampaignSetting";
import {ComponentType} from "../../databases/enums/ComponentType";
import {ModalInterface} from "../interfaces/ModalInterface";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {IdInterface} from "../../databases/interfaces/IdInterface";

export abstract class AbstractModalPart extends AbstractRpgManager implements ModalPartInterface {
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
		type: ComponentType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: IdInterface,
		adventureId: IdInterface|undefined=undefined,
		actId: IdInterface|undefined=undefined,
		sceneId: IdInterface|undefined=undefined,
		sessionId: IdInterface|undefined=undefined,
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
			actId,
			sceneId,
			sessionId,
			additionalInformation,
		);

		return Promise.resolve(undefined);
	}
}
