import {AbstractRpgManagerModal} from "../abstracts/AbstractRpgManagerModal";
import {App} from "obsidian";
import {RecordType} from "../enums/RecordType";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";

export class SceneSelectionModal extends AbstractRpgManagerModal {
	private availableScenes:Array<SceneInterface>;

	constructor(
		app: App,
		private session: SessionInterface,
	) {
		super(app);

		this.availableScenes = this.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === RecordType.Scene &&
				scene.id.campaignId === session.id.campaignId
		);
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpgm-modal');

		contentEl.createEl('h2', {text: 'Scene Selector'});
		contentEl.createEl('p', {text: 'Select the scenes to add to the session "' + this.session.name + '"'});

		this.availableScenes.forEach((scene: SceneInterface) => {
			contentEl.createEl('span', {text: scene.name});
			contentEl.createEl('br');
		});
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
		super.onClose();
	}
}
