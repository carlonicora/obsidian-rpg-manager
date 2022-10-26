import {ModalPartInterface} from "../../src/core/interfaces/ModalPartInterface";
import {App} from "obsidian";
import {CampaignSetting} from "../../src/components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../src/core/enums/ComponentType";
import {ModalInterface} from "../../src/core/interfaces/ModalInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {IdInterface} from "../../src/services/idService/interfaces/IdInterface";

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
