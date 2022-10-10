import {AbstractRpgManagerModal} from "../abstracts/AbstractRpgManagerModal";
import {App, TAbstractFile, TFile} from "obsidian";
import {ComponentType} from "../databases/enums/ComponentType";
import {SorterComparisonElement} from "../databases/SorterComparisonElement";
import {SceneInterface} from "../databases/components/interfaces/SceneInterface";
import {SessionInterface} from "../databases/components/interfaces/SessionInterface";
import {DatabaseInitialiser} from "../databases/DatabaseInitialiser";
import {ActInterface} from "../databases/components/interfaces/ActInterface";
import {SorterType} from "../databases/enums/SorterType";

export class SceneSelectionModal extends AbstractRpgManagerModal {
	private availableScenes:Array<SceneInterface>;
	private scenesEls: Map<string, HTMLInputElement>;
	private initialScenesEls: Map<string, boolean>;
	private actSelectorEl: HTMLSelectElement;
	private sessionContainerEl: HTMLDivElement;
	private selectedAct: ActInterface|undefined;

	constructor(
		app: App,
		private session: SessionInterface,
	) {
		super(app);

		this.scenesEls = new Map<string, HTMLInputElement>();
		this._loadAvailableScenes();
	}


	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpgm-modal');

		contentEl.createEl('h2', {text: 'Scene Selector'});
		contentEl.createEl('p', {text: 'Select the scenes to add to the session "' + this.session.file.basename + '"'});

		const actSelectorContainerEl = contentEl.createDiv('selector');
		actSelectorContainerEl.createDiv({text: 'Limit scenes to a specific act'})
		this.actSelectorEl = actSelectorContainerEl.createEl('select');
		this.actSelectorEl.createEl('option', {
			text: '',
			value: '',
		});
		const acts = this.database.read<ActInterface>((act: ActInterface) =>
			act.id.type === ComponentType.Act &&
			act.id.campaignId === this.session.id.campaignId
		).sort(this.factories.sorter.create<ActInterface>([
			new SorterComparisonElement((act: ActInterface) => act.file.stat.mtime, SorterType.Descending)
		]));

		acts.forEach((act: ActInterface) => {
			this.actSelectorEl.createEl('option', {text: act.file.basename, value: act.file.path})
		});

		this.actSelectorEl.addEventListener('change', () => {
			if (this.actSelectorEl.value !== '') {
				this.selectedAct = this.database.readByPath<ActInterface>(this.actSelectorEl.value);
			} else {
				this.selectedAct = undefined;
			}
			this._loadAvailableScenes();
			this._populateAvailableScenes();
		});

		this.sessionContainerEl = contentEl.createDiv();

		this._populateAvailableScenes();

		const scenesSelectionButtonEl = contentEl.createEl('button', {text: 'Add selected scenes to session "' + this.session.file.basename + '"'});
		scenesSelectionButtonEl.addEventListener("click", () => {
			return this._addScenes()
				.then(() => {
					this.session.readMetadata()
						.then(() => {
							DatabaseInitialiser.reinitialiseRelationships(this.session, this.database);
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

	private _loadAvailableScenes(
	): void {
		this.availableScenes = this.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === ComponentType.Scene &&
				scene.id.campaignId === this.session.id.campaignId &&
				(this.selectedAct !== undefined ? scene.id.actId === this.selectedAct.id.actId : true) &&
				(scene.session === undefined || scene.session?.id.sessionId === this.session.id.sessionId),
		).sort(this.factories.sorter.create<SceneInterface>([
			new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
		]));
	}

	private _populateAvailableScenes(
	): void {
		let populateInitialScenes = false;

		if (this.initialScenesEls === undefined) {
			this.initialScenesEls = new Map<string, boolean>();
			populateInitialScenes = true;
		}

		if(this.sessionContainerEl.childNodes.length > 0){
			const keysToRemove: Array<number> = [];
			this.sessionContainerEl.childNodes.forEach((value: ChildNode, key: number, parent: NodeListOf<ChildNode>) => {
				const option = value.childNodes[0];
				if (!(<HTMLInputElement>option).checked) {
					keysToRemove.push(key)
				}
			});

			keysToRemove.sort((n1,n2) => n2 - n1).forEach((key: number) => {
				this.sessionContainerEl.childNodes[key].remove()
			})
		}

		this.availableScenes.forEach((scene: SceneInterface) => {
			if (!this.scenesEls.has(scene.file.path)) {
				const checkboxDiv = this.sessionContainerEl.createDiv();
				const checkbox = checkboxDiv.createEl('input');
				checkbox.type = 'checkbox';
				checkbox.value = scene.file.path;
				checkbox.id = scene.file.basename;

				if (scene.session?.id.sessionId === this.session.id.sessionId) {
					checkbox.checked = true;
					this.scenesEls.set(scene.file.path, checkbox);
					if (populateInitialScenes) this.initialScenesEls.set(scene.file.path, checkbox.checked);

				}

				checkbox.addEventListener('change', () => {
					if (checkbox.checked){
						this.scenesEls.set(scene.file.path, checkbox);
					}
				});

				const checkboxLabel = checkboxDiv.createEl('label', {text: scene.file.basename});
				checkboxLabel.htmlFor = scene.file.basename;
			}
		});
	}

	private async _addScenes(
	): Promise<void> {
		this.scenesEls.forEach((sceneEl: HTMLInputElement, path: string) => {
			const initialSceneCheked = this.initialScenesEls.get(path);
			if (initialSceneCheked === undefined || sceneEl.checked !== initialSceneCheked) {
				const file: TAbstractFile | null = this.app.vault.getAbstractFileByPath(path);
				if (file != null && file instanceof TFile) {
					this.manipulators.codeblock.updateInFile(
						file,
						'data.sessionId',
						(sceneEl.checked === true ? (this.session.id.sessionId ?? '') : ''),
					)
				}
			}
		});

		return;
	}
}
