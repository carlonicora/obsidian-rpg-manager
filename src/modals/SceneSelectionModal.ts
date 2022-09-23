import {AbstractRpgManagerModal} from "../abstracts/AbstractRpgManagerModal";
import {App, TAbstractFile, TFile} from "obsidian";
import {RecordType} from "../enums/RecordType";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {SorterComparisonElement} from "../database/SorterComparisonElement";

export class SceneSelectionModal extends AbstractRpgManagerModal {
	private availableScenes:Array<SceneInterface>;
	private scenesEls: Array<HTMLInputElement>;

	constructor(
		app: App,
		private session: SessionInterface,
	) {
		super(app);

		this.scenesEls = [];

		this.availableScenes = this.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === RecordType.Scene &&
				scene.id.campaignId === session.id.campaignId &&
				(scene.sessionId === undefined || scene.sessionId === session.sessionId),
		).sort(this.factories.sorter.create<SceneInterface>([
			new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
		]));
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpgm-modal');

		contentEl.createEl('h2', {text: 'Scene Selector'});
		contentEl.createEl('p', {text: 'Select the scenes to add to the session "' + this.session.name + '"'});
		const sessionContainerEl = contentEl.createDiv();

		this.availableScenes.forEach((scene: SceneInterface) => {
			const checkboxDiv = sessionContainerEl.createDiv();
			const checkbox = checkboxDiv.createEl('input');
			checkbox.type = 'checkbox';
			checkbox.value = scene.path;
			checkbox.id = scene.name;

			if (scene.sessionId === this.session.sessionId) checkbox.checked = true;

			this.scenesEls.push(checkbox);

			const checkboxLabel = checkboxDiv.createEl('label', {text: scene.name});
			checkboxLabel.htmlFor = scene.name;
		});

		const scenesSelectionButtonEl = contentEl.createEl('button', {text: 'Add selected scenes to session "' + this.session.name + '"'});
		scenesSelectionButtonEl.addEventListener("click", () => {
			this.addScenes();
			this.close();
		});
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
		super.onClose();
	}

	private async addScenes(
	): Promise<void> {
		await this.scenesEls.forEach((checkboxEl: HTMLInputElement) => {
			const file: TAbstractFile|null = this.app.vault.getAbstractFileByPath(checkboxEl.value);

			if (file != null && file instanceof TFile){
				const map: Map<string, string> = new Map<string, string>();
				map.set('session', checkboxEl.checked === true ? this.session.sessionId.toString() : '');
				this.factories.frontmatter.update(file, map);
			}
		});
	}
}
