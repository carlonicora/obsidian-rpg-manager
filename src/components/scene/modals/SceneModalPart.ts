import {ComponentType} from "../../../core/enums/ComponentType";
import {SceneInterface} from "../interfaces/SceneInterface";
import {AbstractModalPart} from "../../../managers/modalsManager/abstracts/AbstractModalPart";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {IndexService} from "../../../services/indexService/IndexService";
import {ModalInterface} from "../../../core/interfaces/ModalInterface";

export class SceneModalPart extends AbstractModalPart {
	private _scenes: SceneInterface[];

	constructor(
		api: RpgManagerApiInterface,
		modal: ModalInterface,
	) {
		super(api, modal);
		this.modal.sceneId = this.api.service(IndexService).create(ComponentType.Scene, this.modal.campaignId.id, this.modal.adventureId?.id, this.modal.actId?.id);
		this.modal.sceneId.id = this.api.service(IndexService).createUUID();

		if (this.modal.adventureId != null && this.modal.actId != null)
			this._scenes = this.api.database.readList<SceneInterface>(ComponentType.Scene, this.modal.actId);
		else
			this._scenes = [];

	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		contentEl.createDiv({cls: 'sceneContainer'});
		this._scenes.forEach((scene: SceneInterface) => {
			if (this.modal.sceneId !== undefined && (scene.index.sceneId ?? 0) >= (this.modal.sceneId.id ?? 0)) {
				this.modal.sceneId.id = this.api.service(IndexService).createUUID();
				this.modal.sceneId.positionInParent = 1;
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
		if (this.modal.sceneId?.id === '')
			this.modal.sceneId.id = this.api.service(IndexService).createUUID();

		return true;
	}

	protected async addAdditionalElements(
	): Promise<void> {
		//this.modal.additionalInformationEl
	}
}
