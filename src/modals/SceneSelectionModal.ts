import {AbstractRpgManagerModal} from "../abstracts/AbstractRpgManagerModal";
import {App, TAbstractFile, TFile} from "obsidian";
import {ComponentType} from "../enums/ComponentType";
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {SceneInterface} from "../database/components/interfaces/SceneInterface";
import {SessionInterface} from "../database/components/interfaces/SessionInterface";
import {DatabaseInitialiser} from "../database/DatabaseInitialiser";

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
				scene.id.type === ComponentType.Scene &&
				scene.id.campaignId === session.id.campaignId &&
				(scene.session === undefined || scene.session?.id.sessionId === session.id.sessionId),
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
		contentEl.createEl('p', {text: 'Select the scenes to add to the session "' + this.session.file.basename + '"'});
		const sessionContainerEl = contentEl.createDiv();

		this.availableScenes.forEach((scene: SceneInterface) => {
			const checkboxDiv = sessionContainerEl.createDiv();
			const checkbox = checkboxDiv.createEl('input');
			checkbox.type = 'checkbox';
			checkbox.value = scene.file.path;
			checkbox.id = scene.file.basename;

			if (scene.session?.id.sessionId === this.session.id.sessionId) checkbox.checked = true;

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
							DatabaseInitialiser.reinitialiseRelationships(this.database);
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
				this.dataManipulators.codeblock.updateInFile(
					file,
					'data.sessionId',
					(this.scenesEls[index].checked === true ? (this.session.id.sessionId ?? '') : ''),
				)
			}
		}

		return;
	}
}
