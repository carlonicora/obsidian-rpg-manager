import {AbstractRpgManagerModal} from "../../../core/abstracts/AbstractRpgManagerModal";
import {App, TAbstractFile, TFile} from "obsidian";
import {ComponentType} from "../../../core/enums/ComponentType";
import {SorterComparisonElement} from "../../../database/SorterComparisonElement";
import {SceneInterface} from "../../scene/interfaces/SceneInterface";
import {SessionInterface} from "../interfaces/SessionInterface";
import {DatabaseInitialiser} from "../../../database/DatabaseInitialiser";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {SorterType} from "../../../database/enums/SorterType";

export class SceneSelectionModal extends AbstractRpgManagerModal {
	private _availableScenes:SceneInterface[];
	private _scenesEls: Map<string, HTMLInputElement>;
	private _initialScenesEls: Map<string, boolean>;
	private _actSelectorEl: HTMLSelectElement;
	private _sessionContainerEl: HTMLDivElement;
	private _selectedAct: ActInterface|undefined;

	constructor(
		app: App,
		private _session: SessionInterface,
	) {
		super(app);

		this._scenesEls = new Map<string, HTMLInputElement>();
		this._loadAvailableScenes();
	}


	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpgm-modal');

		contentEl.createEl('h2', {text: 'SceneModel Selector'});
		contentEl.createEl('p', {text: 'Select the scenes to add to the session "' + this._session.file.basename + '"'});

		const actSelectorContainerEl = contentEl.createDiv('selector');
		actSelectorContainerEl.createDiv({text: 'Limit scenes to a specific act'})
		this._actSelectorEl = actSelectorContainerEl.createEl('select');
		this._actSelectorEl.createEl('option', {
			text: '',
			value: '',
		});
		const acts = this.database.read<ActInterface>((act: ActInterface) =>
			act.id.type === ComponentType.Act &&
			act.id.campaignId === this._session.id.campaignId
		).sort(this.factories.sorter.create<ActInterface>([
			new SorterComparisonElement((act: ActInterface) => act.file.stat.mtime, SorterType.Descending)
		]));

		acts.forEach((act: ActInterface) => {
			this._actSelectorEl.createEl('option', {text: act.file.basename, value: act.file.path})
		});

		this._actSelectorEl.addEventListener('change', () => {
			if (this._actSelectorEl.value !== '') {
				this._selectedAct = this.database.readByPath<ActInterface>(this._actSelectorEl.value);
			} else {
				this._selectedAct = undefined;
			}
			this._loadAvailableScenes();
			this._populateAvailableScenes();
		});

		this._sessionContainerEl = contentEl.createDiv();

		this._populateAvailableScenes();

		const scenesSelectionButtonEl = contentEl.createEl('button', {text: 'Add selected scenes to session "' + this._session.file.basename + '"'});
		scenesSelectionButtonEl.addEventListener("click", () => {
			return this._addScenes()
				.then(() => {
					this._session.readMetadata()
						.then(() => {
							DatabaseInitialiser.reinitialiseRelationships(this._session, this.database);
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
		this._availableScenes = this.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === ComponentType.Scene &&
				scene.id.campaignId === this._session.id.campaignId &&
				(this._selectedAct !== undefined ? scene.id.actId === this._selectedAct.id.actId : true) &&
				(scene.session === undefined || scene.session?.id.sessionId === this._session.id.sessionId),
		).sort(this.factories.sorter.create<SceneInterface>([
			new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
		]));
	}

	private _populateAvailableScenes(
	): void {
		let populateInitialScenes = false;

		if (this._initialScenesEls === undefined) {
			this._initialScenesEls = new Map<string, boolean>();
			populateInitialScenes = true;
		}

		if(this._sessionContainerEl.childNodes.length > 0){
			const keysToRemove: number[] = [];
			this._sessionContainerEl.childNodes.forEach((value: ChildNode, key: number, parent: NodeListOf<ChildNode>) => {
				const option = value.childNodes[0];
				if (!(<HTMLInputElement>option).checked) {
					keysToRemove.push(key)
				}
			});

			keysToRemove.sort((n1,n2) => n2 - n1).forEach((key: number) => {
				this._sessionContainerEl.childNodes[key].remove()
			})
		}

		this._availableScenes.forEach((scene: SceneInterface) => {
			if (!this._scenesEls.has(scene.file.path)) {
				const checkboxDiv = this._sessionContainerEl.createDiv();
				const checkbox = checkboxDiv.createEl('input');
				checkbox.type = 'checkbox';
				checkbox.value = scene.file.path;
				checkbox.id = scene.file.basename;

				if (scene.session?.id.sessionId === this._session.id.sessionId) {
					checkbox.checked = true;
					this._scenesEls.set(scene.file.path, checkbox);
					if (populateInitialScenes) this._initialScenesEls.set(scene.file.path, checkbox.checked);

				}

				checkbox.addEventListener('change', () => {
					if (checkbox.checked){
						this._scenesEls.set(scene.file.path, checkbox);
					}
				});

				const checkboxLabel = checkboxDiv.createEl('label', {text: scene.file.basename});
				checkboxLabel.htmlFor = scene.file.basename;
			}
		});
	}

	private async _addScenes(
	): Promise<void> {
		this._scenesEls.forEach((sceneEl: HTMLInputElement, path: string) => {
			const initialSceneCheked = this._initialScenesEls.get(path);
			if (initialSceneCheked === undefined || sceneEl.checked !== initialSceneCheked) {
				const file: TAbstractFile | null = this.app.vault.getAbstractFileByPath(path);
				if (file != null && file instanceof TFile) {
					this.manipulators.codeblock.updateInFile(
						file,
						'data.sessionId',
						(sceneEl.checked === true ? (this._session.id.sessionId ?? '') : ''),
					)
				}
			}
		});

		return;
	}
}
