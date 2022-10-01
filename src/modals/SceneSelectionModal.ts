import {AbstractRpgManagerModal} from "../abstracts/AbstractRpgManagerModal";
import {App, TAbstractFile, TFile} from "obsidian";
import {ComponentType} from "../enums/ComponentType";
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {SceneV2Interface} from "../_dbV2/components/interfaces/SceneV2Interface";
import {SessionV2Interface} from "../_dbV2/components/interfaces/SessionV2Interface";
import {DatabaseV2Initialiser} from "../_dbV2/DatabaseV2Initialiser";

export class SceneSelectionModal extends AbstractRpgManagerModal {
	private availableScenes:Array<SceneV2Interface>;
	private scenesEls: Array<HTMLInputElement>;

	constructor(
		app: App,
		private session: SessionV2Interface,
	) {
		super(app);

		this.scenesEls = [];

		this.availableScenes = this.database.read<SceneV2Interface>(
			(scene: SceneV2Interface) =>
				scene.id.type === ComponentType.Scene &&
				scene.id.campaignId === session.id.campaignId &&
				(scene.id.sessionId === undefined || scene.id.sessionId === session.id.sessionId),
		).sort(this.factories.sorter.create<SceneV2Interface>([
			new SorterComparisonElement((scene: SceneV2Interface) => scene.id.adventureId),
			new SorterComparisonElement((scene: SceneV2Interface) => scene.id.actId),
			new SorterComparisonElement((scene: SceneV2Interface) => scene.id.sceneId),
		]));
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpgm-modal');

		contentEl.createEl('h2', {text: 'Scene Selector'});
		contentEl.createEl('p', {text: 'Select the scenes to add to the session "' + this.session.file.basename + '"'});
		const sessionContainerEl = contentEl.createDiv();

		this.availableScenes.forEach((scene: SceneV2Interface) => {
			const checkboxDiv = sessionContainerEl.createDiv();
			const checkbox = checkboxDiv.createEl('input');
			checkbox.type = 'checkbox';
			checkbox.value = scene.file.path;
			checkbox.id = scene.file.basename;

			if (scene.id.sessionId === this.session.id.sessionId) checkbox.checked = true;

			this.scenesEls.push(checkbox);

			const checkboxLabel = checkboxDiv.createEl('label', {text: scene.file.basename});
			checkboxLabel.htmlFor = scene.file.basename;
		});

		const scenesSelectionButtonEl = contentEl.createEl('button', {text: 'Add selected scenes to session "' + this.session.file.basename + '"'});
		scenesSelectionButtonEl.addEventListener("click", () => {
			return this.addScenes()
				.then(() => {
					this.session.readMetadata()
						.then(() => {
							DatabaseV2Initialiser.reinitialiseRelationships(this.database);
						});
					return;
				})
				.then(() => {
					this.app.workspace.trigger("rpgmanager:refresh-views");
					this.close();
					return;
				});
		});
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();

		super.onClose();
	}

	private async addScenes(
	): Promise<void> {
		for (let index=0; index<this.scenesEls.length; index++){
			const file: TAbstractFile|null = this.app.vault.getAbstractFileByPath(this.scenesEls[index].value);

			if (file != null && file instanceof TFile){
				const map: Map<string, string> = new Map<string, string>();
				map.set('session', this.scenesEls[index].checked === true ? (this.session.id.sessionId?.toString() ?? '') : '');

				await this.factories.frontmatter.update(file, map);
			}
		}

		return;
	}
}
