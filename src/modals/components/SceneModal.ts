import {AbstractModalComponent} from "../../abstracts/AbstractModalComponent";
import {App} from "obsidian";
import {ModalInterface} from "../../interfaces/ModalInterface";
import {SceneInterface} from "../../interfaces/data/SceneInterface";
import {RecordType} from "../../enums/RecordType";

export class SceneModal extends AbstractModalComponent {
	private scenes: SceneInterface[];

	constructor(
		app: App,
		modal: ModalInterface,
	) {
		super(app, modal);

		if (this.modal.adventureId != null && this.modal.sessionId != null) {
			this.scenes = this.database.readList<SceneInterface>(RecordType.Scene, this.modal.sessionId);
		} else {
			this.scenes = [];
		}
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		contentEl.createDiv({cls: 'sceneContainer'});

		if (this.modal.sceneId !== undefined) {
			this.modal.sceneId.id = 1;
			this.scenes.forEach((data: SceneInterface) => {
				if (this.modal.sceneId !== undefined && data.sceneId >= (this.modal.sceneId.id ?? 0)) this.modal.sceneId.id = (data.sceneId + 1);
			});
		}

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
