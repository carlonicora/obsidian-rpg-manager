import {App} from "obsidian";
import {AbstractModal} from "../../../abstracts/AbstractModal";
import {activeSceneTypes, SceneType, sceneTypeDescription} from "../../../../src/components/scene/enums/SceneType";
import {LinkSuggesterHandler} from "../../linkSuggester/handlers/LinkSuggesterHandler";
import {BuilderAnalyser} from "../../analyser/BuilderAnalyser";
import {AnalyserDataImportInterface} from "../../analyser/interfaces/AnalyserDataImportInterface";
import {ActInterface} from "../../../../src/components/act/interfaces/ActInterface";
import {AnalyserReportType} from "../../analyser/enums/AnalyserReportType";
import {ComponentType} from "../../../../src/core/enums/ComponentType";
import {SceneInterface} from "../../../../src/components/scene/interfaces/SceneInterface";

export class SceneBuilderModal extends AbstractModal {
	private _scenesContainerEl: HTMLTableSectionElement;
	private _hasEmptyLine = false;
	private _emptyLines: Map<number, boolean>;
	private _idCounter: number;
	private _analyserContainerEl: HTMLDivElement;
	private _createScenesButtonEl: HTMLButtonElement;

	constructor(
		app: App,
		private _act: ActInterface,
	) {
		super(app);
		this.maxWidth = true;
		this.title = 'SceneModel Builder';

		this._emptyLines = new Map<number, boolean>();
		this._idCounter = 0;
	}

	onClose() {
		super.onClose();
		this.app.workspace.trigger("rpgmanager:force-refresh-views");
	}

	onOpen() {
		super.onOpen();
		this.modalEl.style.width = 'var(--modal-max-width)';
		this.modalEl.style.minHeight = 'var(--modal-max-height)';

		const editorDeletedContainerEl = this.rpgmContainerEl.createDiv({cls: 'rpgm-scene-builder-confirmation'});
		editorDeletedContainerEl.createDiv({text: 'The scenes for ' + this._act.file.basename + ' have been created'});
		editorDeletedContainerEl.createDiv({text: 'Click to return to the act'});
		editorDeletedContainerEl.addEventListener('click', () => {
			this.close();
		});

		const sceneBuilderContainerEl: HTMLDivElement = this.rpgmContainerEl.createDiv({cls: 'rpgm-scene-builder'});
		this._analyserContainerEl = sceneBuilderContainerEl.createDiv({cls: 'rpgm-scene-builder-analyser'});

		const scenesContainerEl = sceneBuilderContainerEl.createDiv({cls: 'scenes-container'});

		const buttonContainerEl: HTMLDivElement = sceneBuilderContainerEl.createDiv({cls: 'rpgm-scene-builder-confirmation-button'});
		this._createScenesButtonEl = buttonContainerEl.createEl('button', {text: 'Create Scenes for act ' + this._act.file.basename});
		this._createScenesButtonEl.disabled = true;
		this._createScenesButtonEl.addEventListener('click', () => {
			this._createScenes()
				.then(() => {
					editorDeletedContainerEl.style.display = 'block';
				})
		});

		this._addScenesTable(scenesContainerEl);
	}

	private async _createScenes(
	): Promise<void> {
		let sceneId = 1;
		const scenes = this.database.readList<SceneInterface>(ComponentType.Scene, this._act.id);
		await scenes.forEach((scene: SceneInterface) => {
			if (scene.id.sceneId !== undefined && scene.id.sceneId >= sceneId)
				sceneId = scene.id.sceneId + 1;
		});


		for (let index=0; index<this._scenesContainerEl.rows.length; index++){
			const line = this._scenesContainerEl.rows[index];
			if (line.dataset.id === undefined)
				continue;

			if (this._emptyLines.has(+line.dataset.id) && this._emptyLines.get(+line.dataset.id) === true)
				continue;

			let sceneType: SceneType|undefined;

			const type = (<HTMLSelectElement>line.cells[2].childNodes[0]).value;
			if (type !== '')
				sceneType = this.factories.sceneType.createSceneType(type);

			const title = 'a' + this._act.id.id + 's' + sceneId.toString() + ' - ' + (<HTMLInputElement>line.cells[0].childNodes[0]).value

			this.factories.files.silentCreate(
				ComponentType.Scene,
				title,
				this._act.id.campaignId,
				this._act.id.adventureId,
				this._act.id.actId,
				sceneId,
				undefined,
				{
					synopsis: (<HTMLInputElement>line.cells[1].childNodes[0]).value,
					sceneType: sceneType !== undefined ? this.factories.sceneType.createReadableSceneType(sceneType) : '',
					isActedUpon: (<HTMLInputElement>line.cells[3].childNodes[0]).checked,
				}
			)

			sceneId++;
		}
	}

	private async _refreshAnalyser(
	): Promise<void> {
		this._analyserContainerEl.empty();

		const data: Array<AnalyserDataImportInterface> = [];

		for (let index=0; index<this._scenesContainerEl.rows.length;index++) {
			const cells: HTMLCollectionOf<HTMLTableCellElement> = this._scenesContainerEl.rows[index].cells;
			const type = (<HTMLSelectElement>cells[2].childNodes[0]).value;
			if (type !== '') {
				const sceneType: SceneType = this.factories.sceneType.createSceneType(type);

				data.push({
					isExciting: (<HTMLInputElement>cells[3].childNodes[0]).checked,
					isActive: sceneType !== undefined ? (activeSceneTypes.get(sceneType) ?? false) : false,
					expectedDuration: sceneType !== undefined ? this.factories.runningTimeManager.getTypeExpectedDuration(this._act.id.campaignId, sceneType) : 0,
					type: sceneType,
				});
			}
		}

		if (data.length > 0) {
			const analyser = new BuilderAnalyser(this.app, data, this._act.abtStage);
			analyser.render(AnalyserReportType.SceneBuilder, this._analyserContainerEl);
		}
	}

	private _addSceneLine(
	): void {
		const id = this._idCounter++;
		const rowEl = this._scenesContainerEl.insertRow();
		rowEl.dataset.id = id.toString();
		this._updateEmptyLines(id, true);

		const titleCellEl:HTMLTableCellElement = rowEl.insertCell();
		titleCellEl.addClass('scenes-container-table-title');
		const goalCellEl:HTMLTableCellElement = rowEl.insertCell();
		goalCellEl.addClass('scenes-container-table-goal');
		const typeCellEl:HTMLTableCellElement = rowEl.insertCell();
		typeCellEl.addClass('scenes-container-table-type');
		const excitingCellEl:HTMLTableCellElement = rowEl.insertCell();
		excitingCellEl.addClass('scenes-container-table-exciting');

		const titleInputEl: HTMLInputElement = titleCellEl.createEl('input');
		titleInputEl.type = 'text';
		const goalInputEl: HTMLInputElement = goalCellEl.createEl('input');
		goalInputEl.type = 'text';
		const typeSelectionEl: HTMLSelectElement = typeCellEl.createEl('select');
		const excitementCheckboxEl: HTMLInputElement = excitingCellEl.createEl('input');

		new LinkSuggesterHandler(this.app, goalInputEl, this._act);

		/** TYPE */
		typeSelectionEl.createEl('option', {text: '', value: ''}).selected = true;

		Object.keys(SceneType).filter((v) => isNaN(Number(v))).forEach((type, index) => {
			typeSelectionEl.createEl("option", {
				text: sceneTypeDescription.get(SceneType[type as keyof typeof SceneType]) ?? type,
				value: type,
			});
		});

		/** EXCITEMENT */
		excitementCheckboxEl.type = 'checkbox';

		titleInputEl.addEventListener('keyup', () => {
			this._updateEmptyLines(id,
				(
					titleInputEl.value === '' &&
					goalInputEl.value === '' &&
					typeSelectionEl.value === '' &&
					excitementCheckboxEl.checked === false
				),
			);
		});

		titleInputEl.addEventListener('focusout', () =>{
			this._updateEmptyLines(
				id,
				(
					titleInputEl.value === '' &&
					goalInputEl.value === '' &&
					typeSelectionEl.value === '' &&
					excitementCheckboxEl.checked === false
				),
				true,
			);
		});

		goalInputEl.addEventListener('keyup', () => {
			this._updateEmptyLines(
				id,
				(
					titleInputEl.value === '' &&
					goalInputEl.value === '' &&
					typeSelectionEl.value === '' &&
					excitementCheckboxEl.checked === false
				),
			);
		});

		goalInputEl.addEventListener('focusout', () =>{
			this._updateEmptyLines(
				id,
				(
					titleInputEl.value === '' &&
					goalInputEl.value === '' &&
					typeSelectionEl.value === '' &&
					excitementCheckboxEl.checked === false
				),
				true,
			);
		});

		typeSelectionEl.addEventListener('change', () => {
			this._updateEmptyLines(
				id,
				(
					titleInputEl.value === '' &&
					goalInputEl.value === '' &&
					typeSelectionEl.value === '' &&
					excitementCheckboxEl.checked === false
				),
				true
			);
			this._refreshAnalyser();
		});

		excitementCheckboxEl.addEventListener('change', () => {
			this._updateEmptyLines(
				id,
				(
					titleInputEl.value === '' &&
					goalInputEl.value === '' &&
					typeSelectionEl.value === '' &&
					excitementCheckboxEl.checked === false
				),
				true
			);
			this._refreshAnalyser();
		});
	}

	private _updateEmptyLines(
		lineId: number,
		isEmpty: boolean,
		deleteLine = false,
	): void {
		this._emptyLines.set(lineId, isEmpty);

		let emptyLines = 0;
		this._emptyLines.forEach((empty: boolean, id: number) => {
			if (empty === true) emptyLines++;
		});

		if (emptyLines > 1 && deleteLine){
			this._emptyLines.delete(lineId);
			for (let index=0; index<this._scenesContainerEl.rows.length; index++){
				if (this._scenesContainerEl.rows[index].dataset.id === lineId.toString()){
					this._scenesContainerEl.deleteRow(index);
					emptyLines--;
					break;
				}
			}
		}

		this._hasEmptyLine = emptyLines > 0;

		if (!this._hasEmptyLine) {
			this._hasEmptyLine = true;
			this._addSceneLine();
		}

		this._createScenesButtonEl.disabled = (this._scenesContainerEl.rows.length < 2);
	}

	private _addScenesTable(
		containerEl: HTMLDivElement,
	): void {
		const scenesTableEl: HTMLTableElement = containerEl.createEl('table');
		const titleTHeadEl: HTMLTableSectionElement = scenesTableEl.createTHead();
		const titleRowEl: HTMLTableRowElement = titleTHeadEl.insertRow();
		const titleCellEl: HTMLTableCellElement = titleRowEl.insertCell()
		titleCellEl.textContent = 'Title';
		titleCellEl.addClass('scenes-container-table-title');

		const goalCellEl: HTMLTableCellElement = titleRowEl.insertCell();
		goalCellEl.textContent = 'Goal'
		goalCellEl.addClass('scenes-container-table-goal');

		const typeCellEl: HTMLTableCellElement = titleRowEl.insertCell();
		typeCellEl.textContent = 'Type'
		typeCellEl.addClass('scenes-container-table-type');

		const excitingCellEl: HTMLTableCellElement = titleRowEl.insertCell();
		excitingCellEl.textContent = 'Exciting?'
		excitingCellEl.addClass('scenes-container-table-exciting');

		this._scenesContainerEl = scenesTableEl.createTBody();
		this._addSceneLine();
	}
}
