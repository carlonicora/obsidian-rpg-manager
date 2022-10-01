import {AbstractModalPart} from "../../abstracts/AbstractModalPart";
import {App} from "obsidian";
import {ModalInterface} from "../../interfaces/ModalInterface";
import {ComponentType} from "../../enums/ComponentType";
import {SceneV2Interface} from "../../_dbV2/components/interfaces/SceneV2Interface";

export class SceneModalPart extends AbstractModalPart {
	private scenes: SceneV2Interface[];

	constructor(
		app: App,
		modal: ModalInterface,
	) {
		super(app, modal);
		this.modal.sceneId = this.factories.id.create(ComponentType.Scene, this.modal.campaignId.id, this.modal.adventureId?.id, this.modal.actId?.id);
		this.modal.sceneId.id = 1;

		if (this.modal.adventureId != null && this.modal.actId != null) {
			this.scenes = this.database.readList<SceneV2Interface>(ComponentType.Scene, this.modal.actId);
		} else {
			this.scenes = [];
		}
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		contentEl.createDiv({cls: 'sceneContainer'});

		this.scenes.forEach((scene: SceneV2Interface) => {
			if (this.modal.sceneId !== undefined && (scene.id.sceneId ?? 0) >= (this.modal.sceneId.id ?? 0)) {
				this.modal.sceneId.id = ((scene.id.sceneId ?? 0) + 1);
			}
		});

		this.modal.saver = this;
		this.modal.enableButton();
	}

	public async loadChild(
		containerEl: HTMLElement,
	): Promise<void> {
	}

	public validate(
	): boolean {
		return true;
	}

	protected async addAdditionalElements(
	): Promise<void> {
		//this.modal.additionalInformationEl
	}
}
