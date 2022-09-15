import {AbstractModalComponent} from "../../abstracts/AbstractModalComponent";
import {App} from "obsidian";
import {ModalInterface} from "../../interfaces/ModalInterface";
import {SceneInterface} from "../../interfaces/data/SceneInterface";
import {DataType} from "../../enums/DataType";

export class SceneModal extends AbstractModalComponent {
	private scenes: SceneInterface[];

	constructor(
		app: App,
		modal: ModalInterface,
	) {
		super(app, modal);

		if (this.modal.adventureId != null && this.modal.sessionId != null) {
			this.scenes = this.app.plugins.getPlugin('rpg-manager').io.readListParametrised<SceneInterface>(
				undefined,
				DataType.Scene,
				this.modal.campaignId,
				this.modal.adventureId,
				this.modal.sessionId,
			);
		} else {
			this.scenes = [];
		}
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		contentEl.createDiv({cls: 'sceneContainer'});

		this.modal.sceneId = 1;
		this.scenes.forEach((data: SceneInterface) => {
			if (data.sceneId >= (this.modal.sceneId ?? 0)) this.modal.sceneId = (data.sceneId + 1);
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
